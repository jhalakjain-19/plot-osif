const { pool, pool2 } = require('../config/db');

class CompanyModel {
    // Function to create a new company
    static async createCompany(req) {
        try {
            const result = await pool.query('INSERT INTO companies (company_name) VALUES($1) RETURNING *', [req.body.company_name]);

            const createdCompany = result.rows[0];

            // Log the operation into the log database (pool2)
            await pool2.query(
                'INSERT INTO logs (module_id, action_type, record_id, user_id, previous_data, current_data, ip_address) VALUES ($1, $2, $3, $4, $5, $6, $7)', [
                4, // module_id for companies module
                1, // action_type
                createdCompany.company_id, // record_id
                1, // user_id (ID of the user performing the action)
                null, // previous_data (no previous data for an INSERT operation)
                JSON.stringify(createdCompany), // current_data
                req.headers['x-forwarded-for'] || req.socket.remoteAddress // IP Address
                ]
            );
            
            return createdCompany; // Return the created company
        } catch (error) {
            console.error(error.message);
            throw error;  // rethrow error after logging
        }
    }

    // Function to get all companies
    static async getAllCompanies() {
        try {
            const result = await pool.query('SELECT * FROM companies');
            return result.rows; // Return all companies
        } catch (error) {
            console.error(error.message);
            throw error;  // rethrow error after logging
        }
    }

    // Function to get a company by ID
    static async fetchCompanyById(company_id) {
        try {
            const result = await pool.query('SELECT * FROM companies WHERE company_id = $1 ', [company_id]);
            return result.rows[0]; // Return the company with the given ID
        } catch (error) {
            console.error(company_id);
            throw error;  // rethrow error after logging
        }
    }

    // Function to update a company by ID
    static async updateCompany(company_id, req) {
        try {
            // Fetch previous data for logging purposes
            const previousResult = await pool.query('SELECT * FROM companies WHERE company_id = $1', [company_id]);
            const previousData = previousResult.rows[0];

            const result = await pool.query('UPDATE companies SET company_name = $1, updated_at = now() WHERE company_id = $2 RETURNING *', [req.body.company_name, company_id]);
            const updatedCompany = result.rows[0];

            // Log the operation into the log database (pool2)
            await pool2.query(
                'INSERT INTO logs (module_id, action_type, record_id, user_id, previous_data, current_data, ip_address) VALUES ($1, $2, $3, $4, $5, $6, $7)', [
                4, // module_id for companies module
                2, // action_type
                updatedCompany.company_id, // record_id (company ID of the updated company)
                1, // user_id (ID of the user performing the action)
                JSON.stringify(previousData), // previous_data (company data before update)
                JSON.stringify(updatedCompany), // current_data (company data after update)
                req.headers['x-forwarded-for'] || req.socket.remoteAddress // IP Address
            ]
            );
            return updatedCompany; // Return the updated company
        } catch (error) {
            console.error(error.message);
            throw error;  // rethrow error after logging
        }
    }

    // Function to delete a company by ID
    static async deleteCompany(company_id, req) {
        try {
            const result = await pool.query('DELETE FROM companies WHERE company_id = $1 RETURNING *', [company_id]);
            const deletedCompany = result.rows[0];

            // Log the operation into the log database (pool2)
            await pool2.query(
                'INSERT INTO logs (module_id, action_type, record_id, user_id, previous_data, current_data, ip_address) VALUES ($1, $2, $3, $4, $5, $6, $7)', [
                4, // module_id for companies module
                3, // action_type
                deletedCompany.company_id, // record_id (company ID of the updated company)
                1, // user_id (ID of the user performing the action)
                JSON.stringify(deletedCompany), // previous_data (company data before delete)
                null, // current_data
                req.headers['x-forwarded-for'] || req.socket.remoteAddress // IP Address
            ]
            );
            return deletedCompany; // Return the deleted department
        } catch (error) {
            console.error(error.message);
            throw error;  // rethrow error after logging
        }
    }
}

module.exports = CompanyModel;
