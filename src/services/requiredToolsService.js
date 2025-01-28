const requiredToolsModel = require("../models/requiredToolsModel");

class requiredToolsService {
  static async createTool(data) {
    return await requiredToolsModel.createTool(data);
  }
}

module.exports = requiredToolsService;
