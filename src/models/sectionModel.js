const { pool, pool2 } = require('../config/db');

class SectionModel {
    // Function to create a new section
    static async createSection(req) {
        try {

            const result = await pool.query('INSERT INTO sections (section_name) VALUES($1) RETURNING *', [req.body.section_name]);

            const createdSection = result.rows[0];

            // Log the operation into the log database (pool2)
            await pool2.query(
                'INSERT INTO logs (module_id, action_type, record_id, user_id, previous_data, current_data, ip_address) VALUES ($1, $2, $3, $4, $5, $6, $7)', [
                3, // module_id for sections module
                1, // action_type
                createdSection.section_id, // record_id
                1, // user_id (ID of the user performing the action)
                null, // previous_data (no previous data for an INSERT operation)
                JSON.stringify(createdSection), // current_data
                req.headers['x-forwarded-for'] || req.socket.remoteAddress // IP Address
                ]
            );
            
            return createdSection; // Return the created section
        } catch (error) {
            console.error(error.message);
            throw error;  // rethrow error after logging
        }
    }

    // Function to get all sections
    static async getAllSections() {
        try {
            const result = await pool.query('SELECT * FROM sections');
            return result.rows; // Return all sections
        } catch (error) {
            console.error(error.message);
            throw error;  // rethrow error after logging
        }
    }

    // Function to get a section by ID
    static async fetchSectionById(section_id) {
        try {
            const result = await pool.query('SELECT * FROM sections WHERE section_id = $1 ', [section_id]);
            return result.rows[0]; // Return the section with the given ID
        } catch (error) {
            console.error(section_id);
            throw error;  // rethrow error after logging
        }
    }

    // Function to update a section by ID
    static async updateSection(section_id, req) {
        try {
            // Fetch previous data for logging purposes
            const previousResult = await pool.query('SELECT * FROM sections WHERE section_id = $1', [section_id]);
            const previousData = previousResult.rows[0];

            const result = await pool.query('UPDATE sections SET section_name = $1, updated_at = now() WHERE section_id = $2 RETURNING *', [req.body.section_name, section_id]);
            const updatedSection = result.rows[0];

            // Log the operation into the log database (pool2)
            await pool2.query(
                'INSERT INTO logs (module_id, action_type, record_id, user_id, previous_data, current_data, ip_address) VALUES ($1, $2, $3, $4, $5, $6, $7)', [
                3, // module_id for sections module
                2, // action_type
                updatedSection.section_id, // record_id (section ID of the updated section)
                1, // user_id (ID of the user performing the action)
                JSON.stringify(previousData), // previous_data (section data before update)
                JSON.stringify(updatedSection), // current_data (section data after update)
                req.headers['x-forwarded-for'] || req.socket.remoteAddress // IP Address
            ]
            );
            return updatedSection; // Return the updated section
        } catch (error) {
            console.error(error.message);
            throw error;  // rethrow error after logging
        }
    }

    // Function to delete a section by ID
    static async deleteSection(section_id, req) {
        try {
            const result = await pool.query('DELETE FROM sections WHERE section_id = $1 RETURNING *', [section_id]);
            const deletedSection = result.rows[0];

            // Log the operation into the log database (pool2)
            await pool2.query(
                'INSERT INTO logs (module_id, action_type, record_id, user_id, previous_data, current_data, ip_address) VALUES ($1, $2, $3, $4, $5, $6, $7)', [
                3, // module_id for sections module
                3, // action_type
                deletedSection.section_id, // record_id (section ID of the updated section)
                1, // user_id (ID of the user performing the action)
                JSON.stringify(deletedSection), // previous_data (section data before delete)
                null, // current_data
                req.headers['x-forwarded-for'] || req.socket.remoteAddress // IP Address
            ]
            );
            return deletedSection; // Return the deleted department
        } catch (error) {
            console.error(error.message);
            throw error;  // rethrow error after logging
        }
    }
}

module.exports = SectionModel;
