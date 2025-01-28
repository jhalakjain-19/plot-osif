// userModel.js

const { pool, pool2 } = require('../config/db');
const bcrypt = require('bcrypt');

class UserModel {

    // Function to create a new user
    static async createUser(req) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const result = await pool.query('INSERT INTO users (name, email, role, department_id, section_id, company_id, location_id, phone, address, shift_id, password) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *', [req.body.name,
            req.body.email,
            req.body.role,
            req.body.department_id,
            req.body.section_id,
            req.body.company_id,
            req.body.location_id,
            req.body.phone,
            req.body.address,
            req.body.shift_id, hashedPassword]);

            const createdUser = result.rows[0];

            // Log the operation into the log database (pool2)
            await pool2.query(
                'INSERT INTO logs (module_id, action_type, record_id, user_id, previous_data, current_data, ip_address) VALUES ($1, $2, $3, $4, $5, $6, $7)', [
                1, // module_id for users module
                1, // action_type
                createdUser.user_id, // record_id (user ID of the newly created user)
                1, // user_id (ID of the user performing the action)
                null, // previous_data (no previous data for an INSERT operation)
                JSON.stringify(createdUser), // current_data (newly created user's data)
                req.headers['x-forwarded-for'] || req.socket.remoteAddress // IP Address
            ]
            );

            return createdUser; // Return the created user
        } catch (error) {
            console.error(error.message);
            throw error;  // rethrow error after logging
        }
    }

    // Function to get all users
    static async getAllUsers() {
        try {
            const result = await pool.query('SELECT * FROM users');
            return result.rows; // Return all users
        } catch (error) {
            console.error(error.message);
            throw error;  // rethrow error after logging
        }
    }

    // Function to get a user by ID
    static async getUserById(user_id) {
        try {
            const result = await pool.query('SELECT * FROM users WHERE user_id = $1 ', [user_id]);
            return result.rows[0]; // Return the user with the given ID
        } catch (error) {
            console.error(user_id);
            throw error;  // rethrow error after logging
        }
    }

    // Function to update a user by ID
    static async updateUser(user_id, req) {
        try {
            // Fetch previous data for logging purposes
            const previousResult = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
            const previousData = previousResult.rows[0];

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const result = await pool.query('UPDATE users SET name = $1, email = $2, role = $3, department_id = $4, section_id = $5, company_id = $6, location_id = $7, phone = $8, address = $9, shift_id = $10, password = $11, updated_at = now() WHERE user_id = $12 RETURNING *', [req.body.name,
            req.body.email,
            req.body.role,
            req.body.department_id,
            req.body.section_id,
            req.body.company_id,
            req.body.location_id,
            req.body.phone,
            req.body.address,
            req.body.shift_id,
            hashedPassword, user_id]);

            const updatedUser = result.rows[0];

            // Log the operation into the log database (pool2)
            await pool2.query(
                'INSERT INTO logs (module_id, action_type, record_id, user_id, previous_data, current_data, ip_address) VALUES ($1, $2, $3, $4, $5, $6, $7)', [
                1, // module_id for users module
                2, // action_type
                updatedUser.user_id, // record_id (user ID of the newly created user)
                1, // user_id (ID of the user performing the action)
                JSON.stringify(previousData), // previous_data (user data before update)
                JSON.stringify(updatedUser), // current_data (user data after update)
                req.headers['x-forwarded-for'] || req.socket.remoteAddress // IP Address
            ]
            );
            return updatedUser; // Return the updated user
        } catch (error) {
            console.error(error.message);
            throw error;  // rethrow error after logging
        }
    }

    // Function to delete a user by ID
    static async deleteUser(user_id, req) {
        try {
            const result = await pool.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [user_id]);
            const deletedUser = result.rows[0];

            // Log the operation into the log database (pool2)
            await pool2.query(
                'INSERT INTO logs (module_id, action_type, record_id, user_id, previous_data, current_data, ip_address) VALUES ($1, $2, $3, $4, $5, $6, $7)', [
                1, // module_id for users module
                3, // action_type
                deletedUser.user_id, // record_id (User ID of the updated user)
                1, // user_id (ID of the user performing the action)
                JSON.stringify(deletedUser), // previous_data (User data before delete)
                null, // current_data
                req.headers['x-forwarded-for'] || req.socket.remoteAddress // IP Address
            ]
            );
            return deletedUser; // Return the deleted user
        } catch (error) {
            console.error(error.message);
            throw error;  // rethrow error after logging
        }
    }

    static async loginUser(email) {
        try {
            const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
            return result.rows;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    static async updateSessionToken(user_id, token) {
        try {
            const result = await pool.query(
                `UPDATE users SET session_token = $1, updated_at = now() WHERE user_id = $2`,
                [token, user_id]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserModel;
