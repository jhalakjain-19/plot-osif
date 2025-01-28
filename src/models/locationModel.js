const { pool, pool2 } = require('../config/db');

class LocationModel {
    // Function to create a new location
    static async createLocation(req) {
        try {
            const result = await pool.query('INSERT INTO locations (location_name) VALUES($1) RETURNING *', [req.body.location_name]);

            const createdLocation = result.rows[0];

            // Log the operation into the log database (pool2)
            await pool2.query(
                'INSERT INTO logs (module_id, action_type, record_id, user_id, previous_data, current_data, ip_address) VALUES ($1, $2, $3, $4, $5, $6, $7)', [
                5, // module_id for locations module
                1, // action_type
                createdLocation.location_id, // record_id
                1, // user_id (ID of the user performing the action)
                null, // previous_data (no previous data for an INSERT operation)
                JSON.stringify(createdLocation), // current_data
                req.headers['x-forwarded-for'] || req.socket.remoteAddress // IP Address
                ]
            );
            
            return createdLocation; // Return the created location
        } catch (error) {
            console.error(error.message);
            throw error;  // rethrow error after logging
        }
    }

    // Function to get all locations
    static async getAllLocations() {
        try {
            const result = await pool.query('SELECT * FROM locations');
            return result.rows; // Return all locations
        } catch (error) {
            console.error(error.message);
            throw error;  // rethrow error after logging
        }
    }

    // Function to get a location by ID
    static async fetchLocationById(location_id) {
        try {
            const result = await pool.query('SELECT * FROM locations WHERE location_id = $1 ', [location_id]);
            return result.rows[0]; // Return the location with the given ID
        } catch (error) {
            console.error(location_id);
            throw error;  // rethrow error after logging
        }
    }

    // Function to update a location by ID
    static async updateLocation(location_id, req) {
        try {
            // Fetch previous data for logging purposes
            const previousResult = await pool.query('SELECT * FROM locations WHERE location_id = $1', [location_id]);
            const previousData = previousResult.rows[0];

            const result = await pool.query('UPDATE locations SET location_name = $1, updated_at = now() WHERE location_id = $2 RETURNING *', [req.body.location_name, location_id]);
            const updatedLocation = result.rows[0];

            // Log the operation into the log database (pool2)
            await pool2.query(
                'INSERT INTO logs (module_id, action_type, record_id, user_id, previous_data, current_data, ip_address) VALUES ($1, $2, $3, $4, $5, $6, $7)', [
                5, // module_id for locations module
                2, // action_type
                updatedLocation.location_id, // record_id (location ID of the updated location)
                1, // user_id (ID of the user performing the action)
                JSON.stringify(previousData), // previous_data (location data before update)
                JSON.stringify(updatedLocation), // current_data (location data after update)
                req.headers['x-forwarded-for'] || req.socket.remoteAddress // IP Address
            ]
            );
            return updatedLocation; // Return the updated location
        } catch (error) {
            console.error(error.message);
            throw error;  // rethrow error after logging
        }
    }

    // Function to delete a location by ID
    static async deleteLocation(location_id, req) {
        try {
            const result = await pool.query('DELETE FROM locations WHERE location_id = $1 RETURNING *', [location_id]);
            const deletedLocation = result.rows[0];

            // Log the operation into the log database (pool2)
            await pool2.query(
                'INSERT INTO logs (module_id, action_type, record_id, user_id, previous_data, current_data, ip_address) VALUES ($1, $2, $3, $4, $5, $6, $7)', [
                5, // module_id for locations module
                3, // action_type
                deletedLocation.location_id, // record_id (location ID of the updated location)
                1, // user_id (ID of the user performing the action)
                JSON.stringify(deletedLocation), // previous_data (location data before delete)
                null, // current_data
                req.headers['x-forwarded-for'] || req.socket.remoteAddress // IP Address
            ]
            );
            return deletedLocation; // Return the deleted department
        } catch (error) {
            console.error(error.message);
            throw error;  // rethrow error after logging
        }
    }
}

module.exports = LocationModel;
