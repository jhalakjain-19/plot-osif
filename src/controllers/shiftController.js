const ShiftService = require('../services/shiftService');

class ShiftController {
    static handleResponse(res, status, message, data = null) {
        res.status(status).json({
            status,
            message,
            data,
        });
    }

    static async createShift(req, res, next) {
        try {
            const newShift = await ShiftService.createShift(req);
            ShiftController.handleResponse(res, 201, 'Shift created successfully', newShift);
        } catch (error) {
            next(error);
        }
    }

    static async getAllShifts(req, res, next) {
        try {
            const shifts = await ShiftService.getAllShifts();
            ShiftController.handleResponse(res, 200, 'Shifts fetched successfully', shifts);
        } catch (error) {
            next(error);
        }
    }

    static async fetchShiftById(req, res, next) {
        try {
            const shift = await ShiftService.fetchShiftById(req.params.shift_id);
            if (!shift) return ShiftController.handleResponse(res, 404, 'Shift not found');
            ShiftController.handleResponse(res, 200, 'Shift fetched successfully', shift);
        } catch (error) {
            next(error);
        }
    }

    static async updateShift(req, res, next) {
        try {
            const updatedShift = await ShiftService.updateShift(req.params.shift_id, req);
            if (!updatedShift) return ShiftController.handleResponse(res, 404, 'Shift not found');
            ShiftController.handleResponse(res, 200, 'Shift updated successfully', updatedShift);
        } catch (error) {
            next(error);
        }
    }

    static async deleteShift(req, res, next) {
        try {
            const deletedShift = await ShiftService.deleteShift(req.params.shift_id, req);
            if (!deletedShift) return ShiftController.handleResponse(res, 404, 'Shift not found');
            ShiftController.handleResponse(res, 200, 'Shift deleted successfully', deletedShift);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ShiftController;