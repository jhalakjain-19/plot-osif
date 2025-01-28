const LocationService = require('../services/locationService');

class LocationController {
    static handleResponse(res, status, message, data = null) {
        res.status(status).json({
            status,
            message,
            data,
        });
    }

    static async createLocation(req, res, next) {
        try {
            const newLocation = await LocationService.createLocation(req);
            LocationController.handleResponse(res, 201, 'Location created successfully', newLocation);
        } catch (error) {
            next(error);
        }
    }

    static async getAllLocations(req, res, next) {
        try {
            const locations = await LocationService.getAllLocations();
            LocationController.handleResponse(res, 200, 'Locations fetched successfully', locations);
        } catch (error) {
            next(error);
        }
    }

    static async fetchLocationById(req, res, next) {
        try {
            const location = await LocationService.fetchLocationById(req.params.location_id);
            if (!location) return LocationController.handleResponse(res, 404, 'Location not found');
            LocationController.handleResponse(res, 200, 'Location fetched successfully', location);
        } catch (error) {
            next(error);
        }
    }

    static async updateLocation(req, res, next) {
        try {
            const updatedLocation = await LocationService.updateLocation(req.params.location_id, req);
            if (!updatedLocation) return LocationController.handleResponse(res, 404, 'Location not found');
            LocationController.handleResponse(res, 200, 'Location updated successfully', updatedLocation);
        } catch (error) {
            next(error);
        }
    }

    static async deleteLocation(req, res, next) {
        try {
            const deletedLocation = await LocationService.deleteLocation(req.params.location_id, req);
            if (!deletedLocation) return LocationController.handleResponse(res, 404, 'Location not found');
            LocationController.handleResponse(res, 200, 'Location deleted successfully', deletedLocation);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = LocationController;