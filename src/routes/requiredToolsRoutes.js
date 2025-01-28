const express = require("express");
const requiredToolsController = require("../controllers/requiredToolsController");
const { validateToolCreate } = require("../middlewares/requiredToolsValidator");

const authenticateToken = require("../middlewares/authToken");

const router = express.Router();

// Apply authenticateToken middleware to all routes below this line

//router.use(authenticateToken);
router.get("/test", (req, res) => {
  res.send("Testing required tools routes");
});
// Using class-based controller methods
console.log("Required tools routes");
router.post("/", validateToolCreate, requiredToolsController.createTool);

module.exports = router;
