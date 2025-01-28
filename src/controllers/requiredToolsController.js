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
  static async getAllTools(req, res, next) {
    try {
      const tools = await requiredToolsService.getAllTools();
      requiredToolsController.handleResponse(
        res,
        200,
        "Tools fetched successfully",
        tools
      );
    } catch (error) {
      next(error);
    }
  }
  static async getToolById(req, res, next) {
    try {
      const tool = await requiredToolsService.getToolById(req.params.tool_id);
      if (!tool)
        return requiredToolsController.handleResponse(
          res,
          404,
          "tool not found"
        );
      requiredToolsController.handleResponse(
        res,
        200,
        "Tool fetched successfully",
        tool
      );
    } catch (error) {
      next(error);
    }
  }
  static async deleteTool(req, res, next) {
    try {
      const deletedTool = await requiredToolsService.deleteTool(
        req.params.tool_id,
        req
      );
      if (!deletedTool)
        return requiredToolsController.handleResponse(
          res,
          404,
          "Tool not found"
        );
      requiredToolsController.handleResponse(
        res,
        200,
        "Tool deleted successfully",
        deletedTool
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = requiredToolsController;
