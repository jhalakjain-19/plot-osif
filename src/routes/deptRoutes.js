const express = require("express");
const DeptController = require("../controllers/deptController");
const {
  validateDept,
  validateAtUpdate,
} = require("../middlewares/deptValidator");
const authenticateToken = require("../middlewares/authToken");

const router = express.Router();

// Apply authenticateToken middleware to all routes below this line
router.use(authenticateToken);

// Using class-based controller methods

router.get("/", DeptController.fetchDept);
router.get("/:dept_id", DeptController.getDeptById);
router.post("/", validateDept, DeptController.createDept);
router.put("/:dept_id", validateAtUpdate, DeptController.updateDept);
router.delete("/:dept_id", DeptController.deleteDept);

module.exports = router;
