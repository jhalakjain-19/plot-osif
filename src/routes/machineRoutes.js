const express = require('express');
const MachineController = require('../controllers/machineController');
const { validateMachine, validateAtUpdate, validateLogin } = require('../middlewares/machineValidator');
const authenticateToken = require('../middlewares/authToken');

const router = express.Router();

// Apply authenticateToken middleware to all routes below this line
router.use(authenticateToken);

// Using class-based controller methods

router.get('/', MachineController.getAllMachines);
router.get('/:machine_id', MachineController.fetchMachineById);
router.post('/', validateMachine, MachineController.createMachine);
router.put('/:machine_id', validateAtUpdate, MachineController.updateMachine);
router.delete('/:machine_id', MachineController.deleteMachine);

module.exports = router;