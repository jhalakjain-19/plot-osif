const requiredToolsService = require("../services/requiredToolsService");

class requiredToolsController {
  static handleResponse(res, status, message, data = null) {
    res.status(status).json({
      status,
      message,
      data,
    });
  }

  static async createTool(req, res, next) {
    try {
      console.log(req.body);
      const newTool = await requiredToolsService.createTool(req.body);
      requiredToolsController.handleResponse(
        res,
        201,
        "Tool created successfully",
        newTool
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = requiredToolsController;
