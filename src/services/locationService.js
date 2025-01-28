const LocationModel = require('../models/locationModel');


class LocationService {
    static async createLocation(data) {
        return await LocationModel.createLocation(data);
    }

    static async getAllLocations() {
        return await LocationModel.getAllLocations();
    }

    static async fetchLocationById(location_id) {
        return await LocationModel.fetchLocationById(location_id);
    }

    static async updateLocation(location_id, data) {
        return await LocationModel.updateLocation(location_id, data);
    }

    static async deleteLocation(location_id, data) {
        return await LocationModel.deleteLocation(location_id, data);
    }
}

module.exports = LocationService;
