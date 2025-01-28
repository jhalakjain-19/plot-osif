const { deleteTool } = require("../controllers/requiredToolsController");
const requiredToolsModel = require("../models/requiredToolsModel");

class requiredToolsService {
  static async createTool(data) {
    return await requiredToolsModel.createTool(data);
  }
  static async getAllTools() {
    return await requiredToolsModel.getAllTools();
  }
  static async getToolById(toolId) {
    return await requiredToolsModel.getToolById(toolId);
  }
  static async deleteTool(ToolId, data) {
    return await requiredToolsModel.deleteTool(ToolId, data);
  }
  static async updateTool(toolId, data) {
    return await requiredToolsModel.updateTool(toolId, data);
  }
}

module.exports = requiredToolsService;
