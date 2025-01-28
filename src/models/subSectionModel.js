const { pool, pool2 } = require('../config/db');

class SubSectionModel {
    // Function to create a new sub_section
    static async createSubSection(req) {
        try {
            const result = await pool.query('INSERT INTO sub_sections (sub_section_name) VALUES($1) RETURNING *', [req.body.sub_section_name]);

            const createdSubSection = result.rows[0];

            // Log the operation into the log database (pool2)
            await pool2.query(
                'INSERT INTO logs (module_id, action_type, record_id, user_id, previous_data, current_data, ip_address) VALUES ($1, $2, $3, $4, $5, $6, $7)', [
                16, // module_id for sub sections module
                1, // action_type
                createdSubSection.sub_section_id, // record_id
                1, // user_id (ID of the user performing the action)
                null, // previous_data (no previous data for an INSERT operation)
                JSON.stringify(createdSubSection), // current_data
                req.headers['x-forwarded-for'] || req.socket.remoteAddress // IP Address
                ]
            );
            
            return createdSubSection; // Return the created sub_section
        } catch (error) {
            console.error(error.message);
            throw error;  // rethrow error after logging
        }
    }

    // Function to get all sub_sections
    static async getAllSubSections() {
        try {
            const result = await pool.query('SELECT * FROM sub_sections');
            return result.rows; // Return all sub_sections
        } catch (error) {
            console.error(error.message);
            throw error;  // rethrow error after logging
        }
    }

    // Function to get a sub_section by ID
    static async fetchSubSectionById(sub_section_id) {
        try {
            const result = await pool.query('SELECT * FROM sub_sections WHERE sub_section_id = $1 ', [sub_section_id]);
            return result.rows[0]; // Return the sub_section with the given ID
        } catch (error) {
            console.error(sub_section_id);
            throw error;  // rethrow error after logging
        }
    }

    // Function to update a sub_section by ID
    static async updateSubSection(sub_section_id, req) {
        try {
            // Fetch previous data for logging purposes
            const previousResult = await pool.query('SELECT * FROM sub_sections WHERE sub_section_id = $1', [sub_section_id]);
            const previousData = previousResult.rows[0];

            const result = await pool.query('UPDATE sub_sections SET sub_section_name = $1, updated_at = now() WHERE sub_section_id = $2 RETURNING *', [req.body.sub_section_name, sub_section_id]);
            const updatedSubSection = result.rows[0];

            // Log the operation into the log database (pool2)
            await pool2.query(
                'INSERT INTO logs (module_id, action_type, record_id, user_id, previous_data, current_data, ip_address) VALUES ($1, $2, $3, $4, $5, $6, $7)', [
                16, // module_id for sub sections module
                2, // action_type
                updatedSubSection.sub_section_id, // record_id (sub_section ID of the updated sub_section)
                1, // user_id (ID of the user performing the action)
                JSON.stringify(previousData), // previous_data (sub_section data before update)
                JSON.stringify(updatedSubSection), // current_data (sub_section data after update)
                req.headers['x-forwarded-for'] || req.socket.remoteAddress // IP Address
            ]
            );
            return updatedSubSection; // Return the updated sub_section
        } catch (error) {
            console.error(error.message);
            throw error;  // rethrow error after logging
        }
    }

    // Function to delete a sub_section by ID
    static async deleteSubSection(sub_section_id, req) {
        try {
            const result = await pool.query('DELETE FROM sub_sections WHERE sub_section_id = $1 RETURNING *', [sub_section_id]);
            const deletedSubSection = result.rows[0];

            // Log the operation into the log database (pool2)
            await pool2.query(
                'INSERT INTO logs (module_id, action_type, record_id, user_id, previous_data, current_data, ip_address) VALUES ($1, $2, $3, $4, $5, $6, $7)', [
                16, // module_id for sub sections module
                3, // action_type
                deletedSubSection.sub_section_id, // record_id (sub section ID of the updated sub_section)
                1, // user_id (ID of the user performing the action)
                JSON.stringify(deletedSubSection), // previous_data (sub section data before delete)
                null, // current_data
                req.headers['x-forwarded-for'] || req.socket.remoteAddress // IP Address
            ]
            );
            return deletedSubSection; // Return the deleted department
        } catch (error) {
            console.error(error.message);
            throw error;  // rethrow error after logging
        }
    }
}

module.exports = SubSectionModel;