const ShiftModel = require('../models/shiftModel');

class ShiftService {
    static async createShift(data) {
        return await ShiftModel.createShift(data);
    }

    static async getAllShifts() {
        return await ShiftModel.getAllShifts();
    }

    static async fetchShiftById(shift_id) {
        return await ShiftModel.fetchShiftById(shift_id);
    }

    static async updateShift(shift_id, data) {
        return await ShiftModel.updateShift(shift_id, data);
    }

    static async deleteShift(shift_id, data) {
        return await ShiftModel.deleteShift(shift_id, data);
    }
}

module.exports = ShiftService;