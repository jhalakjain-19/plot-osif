const express = require('express');
const LocationController = require('../controllers/locationController');
const { validateLocation, validateAtUpdate } = require('../middlewares/locationValidator');
const authenticateToken = require('../middlewares/authToken');

const router = express.Router();

// Apply authenticateToken middleware to all routes below this line
router.use(authenticateToken);

// Using class-based controller methods

router.get('/', LocationController.getAllLocations);
router.get('/:location_id', LocationController.fetchLocationById);
router.post('/', validateLocation, LocationController.createLocation);
router.put('/:location_id', validateAtUpdate, LocationController.updateLocation);
router.delete('/:location_id', LocationController.deleteLocation);

module.exports = router;