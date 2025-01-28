const requiredToolsModel = require("../models/requiredToolsModel");

class requiredToolsService {
  static async createTool(data) {
    return await requiredToolsModel.createTool(data);
  }
  static async getAllTools() {
    return await requiredToolsModel.getAllTools();
  }
}

module.exports = requiredToolsService;
