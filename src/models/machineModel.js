const { pool, pool2 } = require('../config/db');
const bcrypt = require('bcrypt');

class MachineModel {

    // Function to create a new machine
    static async createMachine(req) {
        try {

            const result = await pool.query('INSERT INTO machines (machine_name, type, company_id, location_id, section_id, sub_section_id, department_id, manufacturer_name, model_no, installation_date, maintenance_schedule, current_status) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *', [req.body.machine_name,
            req.body.type,
            req.body.company_id,
            req.body.location_id,
            req.body.section_id,
            req.body.sub_section_id,
            req.body.department_id,
            req.body.manufacturer_name,
            req.body.model_no,
            req.body.installation_date,
            req.body.maintenance_schedule,
            req.body.current_status]);

            const createdMachine = result.rows[0];

            // Log the operation into the log database (pool2)
            await pool2.query(
                'INSERT INTO logs (module_id, action_type, record_id, machine_id, previous_data, current_data, ip_address) VALUES ($1, $2, $3, $4, $5, $6, $7)', [
                7, // module_id for machines module
                1, // action_type
                createdMachine.machine_id, // record_id (machine ID of the newly created machine)
                req.user.user_id, // user_id (ID of the user performing the action)
                null, // previous_data (no previous data for an INSERT operation)
                JSON.stringify(createdMachine), // current_data (newly created machine's data)
                req.headers['x-forwarded-for'] || req.socket.remoteAddress // IP Address
            ]
            );

            return createdMachine; // Return the created machine
        } catch (error) {
            console.error(error.message);
            throw error;  // rethrow error after logging
        }
    }

    // Function to get all machines
    static async getAllMachines() {
        try {
            const result = await pool.query('SELECT * FROM machines');
            return result.rows; // Return all machines
        } catch (error) {
            console.error(error.message);
            throw error;  // rethrow error after logging
        }
    }

    // Function to get a machine by ID
    static async fetchMachineById(machine_id) {
        try {
            const result = await pool.query('SELECT * FROM machines WHERE machine_id = $1 ', [machine_id]);
            return result.rows[0]; // Return the machine with the given ID
        } catch (error) {
            console.error(machine_id);
            throw error;  // rethrow error after logging
        }
    }

    // Function to update a machine by ID
    static async updateMachine(machine_id, req) {
        try {
            // Fetch previous data for logging purposes
            const previousResult = await pool.query('SELECT * FROM machines WHERE machine_id = $1', [machine_id]);
            const previousData = previousResult.rows[0];


            const result = await pool.query('UPDATE machines SET machine_name = $1, type = $2, company_id = $3, location_id = $4, section_id = $5, sub_section_id = $6, department_id = $7, manufacturer_name = $8, model_no = $9, installation_date = $10, maintenance_schedule = $11, current_status = $12, updated_at = now() WHERE machine_id = $13 RETURNING *', [req.body.machine_name,
                req.body.type,
                req.body.company_id,
                req.body.location_id,
                req.body.section_id,
                req.body.sub_section_id,
                req.body.department_id,
                req.body.manufacturer_name,
                req.body.model_no,
                req.body.installation_date,
                req.body.maintenance_schedule,
                req.body.current_status, machine_id]);

            const updatedMachine = result.rows[0];

            // Log the operation into the log database (pool2)
            await pool2.query(
                'INSERT INTO logs (module_id, action_type, record_id, machine_id, previous_data, current_data, ip_address) VALUES ($1, $2, $3, $4, $5, $6, $7)', [
                7, // module_id for machines module
                2, // action_type
                updatedMachine.machine_id, // record_id (machine ID of the newly created machine)
                req.user.user_id, // user_id (ID of the user performing the action)
                JSON.stringify(previousData), // previous_data (machine data before update)
                JSON.stringify(updatedMachine), // current_data (machine data after update)
                req.headers['x-forwarded-for'] || req.socket.remoteAddress // IP Address
            ]
            );
            return updatedMachine; // Return the updated machine
        } catch (error) {
            console.error(error.message);
            throw error;  // rethrow error after logging
        }
    }

    // Function to delete a machine by ID
    static async deleteMachine(machine_id, req) {
        try {
            const result = await pool.query('DELETE FROM machines WHERE machine_id = $1 RETURNING *', [machine_id]);
            const deletedMachine = result.rows[0];

            // Log the operation into the log database (pool2)
            await pool2.query(
                'INSERT INTO logs (module_id, action_type, record_id, machine_id, previous_data, current_data, ip_address) VALUES ($1, $2, $3, $4, $5, $6, $7)', [
                7, // module_id for machines module
                3, // action_type
                deletedMachine.machine_id, // record_id (Machine ID of the updated machine)
                req.user.user_id, // user_id (ID of the user performing the action)
                JSON.stringify(deletedMachine), // previous_data (Machine data before delete)
                null, // current_data
                req.headers['x-forwarded-for'] || req.socket.remoteAddress // IP Address
            ]
            );
            return deletedMachine; // Return the deleted machine
        } catch (error) {
            console.error(error.message);
            throw error;  // rethrow error after logging
        }
    }
}

module.exports = MachineModel;