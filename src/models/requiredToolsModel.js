const { pool, pool2 } = require("../config/db");

class requiredToolsModel {
  static async createTool(data) {
    try {
      console.log(data.tool_name);
      const result = await pool.query(
        "INSERT INTO required_tools (tool_name) VALUES($1) RETURNING *",
        [data.tool_name]
      );
      const createdTool = result.rows[0];

      // Log the operation into the log database (pool2)
      await pool2.query(
        "INSERT INTO logs (module_id, action_type, record_id, user_id, previous_data, current_data, ip_address) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [
          8, // module_id for tools module
          1, // action_type (create)
          createdTool.tool_id, // record_id
          1, // user_id (ID of the user performing the action)
          null, // previous_data (no previous data for an INSERT operation)
          JSON.stringify(createdTool), // current_data
          data.ip_address, // IP Address
        ]
      );

      return createdTool; // Return the created tool
    } catch (error) {
      console.error(error.message);
      throw error; // Rethrow error after logging
    }
  }
  // Function to get all tools
  static async getAllTools() {
    try {
      const result = await pool.query("SELECT * FROM required_tools");
      return result.rows; // Return all tools
    } catch (error) {
      console.error(error.message);
      throw error; // rethrow error after logging
    }
  }
  static async getToolById(tool_id) {
    try {
      const result = await pool.query(
        "SELECT * FROM required_tools WHERE tool_id = $1 ",
        [tool_id]
      );
      return result.rows[0]; // Return the tools with the given ID
    } catch (error) {
      console.error(tool_id);
      throw error; // rethrow error after logging
    }
  }
}

module.exports = requiredToolsModel;
