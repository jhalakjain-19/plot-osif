const { pool, pool2 } = require('../config/db');

class DeptModel {
    // Function to create a new department
    static async createDept(req) {
        try {

            const result = await pool.query('INSERT INTO departments (department_name) VALUES($1) RETURNING *', [req.body.name]);

            const createdDept = result.rows[0];

            // Log the operation into the log database (pool2)
            await pool2.query(
                'INSERT INTO logs (module_id, action_type, record_id, user_id, previous_data, current_data, ip_address) VALUES ($1, $2, $3, $4, $5, $6, $7)', [
                2, // module_id for departments module
                1, // action_type
                createdDept.department_id, // record_id
                1, // user_id (ID of the user performing the action)
                null, // previous_data (no previous data for an INSERT operation)
                JSON.stringify(createdDept), // current_data
                req.headers['x-forwarded-for'] || req.socket.remoteAddress // IP Address
                ]
            );
            
            return createdDept; // Return the created department
        } catch (error) {
            console.error(error.message);
            throw error;  // rethrow error after logging
        }
    }

    // Function to get all departments
    static async fetchDept() {
        try {
            const result = await pool.query('SELECT * FROM departments');
            return result.rows; // Return all departments
        } catch (error) {
            console.error(error.message);
            throw error;  // rethrow error after logging
        }
    }

    // Function to get a department by ID
    static async getDeptById(dept_id) {
        try {
            const result = await pool.query('SELECT * FROM departments WHERE department_id = $1 ', [dept_id]);
            return result.rows[0]; // Return the department with the given ID
        } catch (error) {
            console.error(dept_id);
            throw error;  // rethrow error after logging
        }
    }

    // Function to update a department by ID
    static async updateDept(dept_id, req) {
        try {
            // Fetch previous data for logging purposes
            const previousResult = await pool.query('SELECT * FROM departments WHERE department_id = $1', [dept_id]);
            const previousData = previousResult.rows[0];

            const result = await pool.query('UPDATE departments SET department_name = $1, updated_at = now() WHERE department_id = $2 RETURNING *', [req.body.name, dept_id]);
            const updatedDept = result.rows[0];

            // Log the operation into the log database (pool2)
            await pool2.query(
                'INSERT INTO logs (module_id, action_type, record_id, user_id, previous_data, current_data, ip_address) VALUES ($1, $2, $3, $4, $5, $6, $7)', [
                2, // module_id for departments module
                2, // action_type
                updatedDept.department_id, // record_id (Department ID of the updated department)
                1, // user_id (ID of the user performing the action)
                JSON.stringify(previousData), // previous_data (Department data before update)
                JSON.stringify(updatedDept), // current_data (Department data after update)
                req.headers['x-forwarded-for'] || req.socket.remoteAddress // IP Address
            ]
            );
            return updatedDept; // Return the updated department
        } catch (error) {
            console.error(error.message);
            throw error;  // rethrow error after logging
        }
    }

    // Function to delete a department by ID
    static async deleteDept(dept_id, req) {
        try {
            const result = await pool.query('DELETE FROM departments WHERE department_id = $1 RETURNING *', [dept_id]);
            const deletedDept = result.rows[0];

            // Log the operation into the log database (pool2)
            await pool2.query(
                'INSERT INTO logs (module_id, action_type, record_id, user_id, previous_data, current_data, ip_address) VALUES ($1, $2, $3, $4, $5, $6, $7)', [
                2, // module_id for departments module
                3, // action_type
                deletedDept.department_id, // record_id (Department ID of the updated department)
                1, // user_id (ID of the user performing the action)
                JSON.stringify(deletedDept), // previous_data (Department data before delete)
                null, // current_data
                req.headers['x-forwarded-for'] || req.socket.remoteAddress // IP Address
            ]
            );
            return deletedDept; // Return the deleted department
        } catch (error) {
            console.error(error.message);
            throw error;  // rethrow error after logging
        }
    }
}

module.exports = DeptModel;
