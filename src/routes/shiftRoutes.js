const express = require('express');
const ShiftController = require('../controllers/shiftController');
const { validateShift, validateAtUpdate } = require('../middlewares/shiftValidator');
const authenticateToken = require('../middlewares/authToken');

const router = express.Router();

// Apply authenticateToken middleware to all routes below this line
router.use(authenticateToken);

// Using class-based controller methods

router.get('/', ShiftController.getAllShifts);
router.get('/:shift_id', ShiftController.fetchShiftById);
router.post('/', validateShift, ShiftController.createShift);
router.put('/:shift_id', validateAtUpdate, ShiftController.updateShift);
router.delete('/:shift_id', ShiftController.deleteShift);

module.exports = router;