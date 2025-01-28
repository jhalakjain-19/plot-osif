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
}

module.exports = requiredToolsService;
