const { pool, pool2 } = require('../config/db');

class ShiftModel {
    // Function to create a new shift
    static async createShift(req) {
        try {
            const result = await pool.query('INSERT INTO shifts (shift_name, shift_start_time, shift_end_time, time_mode) VALUES($1, $2, $3, $4) RETURNING *', [req.body.shift_name,
            req.body.shift_start_time,
            req.body.shift_end_time,
            req.body.time_mode]);

            const createdShift = result.rows[0];

            // Log the operation into the log database (pool2)
            await pool2.query(
                'INSERT INTO logs (module_id, action_type, record_id, user_id, previous_data, current_data, ip_address) VALUES ($1, $2, $3, $4, $5, $6, $7)', [
                6, // module_id for shifts module
                1, // action_type
                createdShift.shift_id, // record_id
                1, // user_id (ID of the user performing the action)
                null, // previous_data (no previous data for an INSERT operation)
                JSON.stringify(createdShift), // current_data
                req.headers['x-forwarded-for'] || req.socket.remoteAddress // IP Address
                ]
            );
            
            return createdShift; // Return the created shift
        } catch (error) {
            console.error(error.message);
            throw error;  // rethrow error after logging
        }
    }

    // Function to get all shifts
    static async getAllShifts() {
        try {
            const result = await pool.query('SELECT * FROM shifts');
            return result.rows; // Return all shifts
        } catch (error) {
            console.error(error.message);
            throw error;  // rethrow error after logging
        }
    }

    // Function to get a shift by ID
    static async fetchShiftById(shift_id) {
        try {
            const result = await pool.query('SELECT * FROM shifts WHERE shift_id = $1 ', [shift_id]);
            return result.rows[0]; // Return the shift with the given ID
        } catch (error) {
            console.error(shift_id);
            throw error;  // rethrow error after logging
        }
    }

    // Function to update a shift by ID
    static async updateShift(shift_id, req) {
        try {
            // Fetch previous data for logging purposes
            const previousResult = await pool.query('SELECT * FROM shifts WHERE shift_id = $1', [shift_id]);
            const previousData = previousResult.rows[0];

            const result = await pool.query('UPDATE shifts SET shift_name = $1, shift_start_time = $2, shift_end_time = $3, time_mode = $4, updated_at = now() WHERE shift_id = $5 RETURNING *', [req.body.shift_name, req.body.shift_start_time, req.body.shift_end_time, req.body.time_mode, shift_id]);
            
            const updatedShift = result.rows[0];

            // Log the operation into the log database (pool2)
            await pool2.query(
                'INSERT INTO logs (module_id, action_type, record_id, user_id, previous_data, current_data, ip_address) VALUES ($1, $2, $3, $4, $5, $6, $7)', [
                6, // module_id for shifts module
                2, // action_type
                updatedShift.shift_id, // record_id (shift ID of the updated shift)
                1, // user_id (ID of the user performing the action)
                JSON.stringify(previousData), // previous_data (shift data before update)
                JSON.stringify(updatedShift), // current_data (shift data after update)
                req.headers['x-forwarded-for'] || req.socket.remoteAddress // IP Address
            ]
            );
            return updatedShift; // Return the updated shift
        } catch (error) {
            console.error(error.message);
            throw error;  // rethrow error after logging
        }
    }

    // Function to delete a shift by ID
    static async deleteShift(shift_id, req) {
        try {
            const result = await pool.query('DELETE FROM shifts WHERE shift_id = $1 RETURNING *', [shift_id]);
            const deletedShift = result.rows[0];

            // Log the operation into the log database (pool2)
            await pool2.query(
                'INSERT INTO logs (module_id, action_type, record_id, user_id, previous_data, current_data, ip_address) VALUES ($1, $2, $3, $4, $5, $6, $7)', [
                6, // module_id for shifts module
                3, // action_type
                deletedShift.shift_id, // record_id (shift ID of the updated shift)
                1, // user_id (ID of the user performing the action)
                JSON.stringify(deletedShift), // previous_data (shift data before delete)
                null, // current_data
                req.headers['x-forwarded-for'] || req.socket.remoteAddress // IP Address
            ]
            );
            return deletedShift; // Return the deleted department
        } catch (error) {
            console.error(error.message);
            throw error;  // rethrow error after logging
        }
    }
}

module.exports = ShiftModel;