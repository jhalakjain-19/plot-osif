const MachineService = require('../services/machineService');

class MachineController {
    static handleResponse(res, status, message, data = null) {
        res.status(status).json({
            status,
            message,
            data,
        });
    }

    static async createMachine(req, res, next) {
        try {
            const newMachine = await MachineService.createMachine(req);
            MachineController.handleResponse(res, 201, 'Machine created successfully', newMachine);
        } catch (error) {
            next(error);
        }
    }

    static async getAllMachines(req, res, next) {
        try {
            const machines = await MachineService.getAllMachines();
            MachineController.handleResponse(res, 200, 'Machines fetched successfully', machines);
        } catch (error) {
            next(error);
        }
    }

    static async fetchMachineById(req, res, next) {
        try {
            const machine = await MachineService.fetchMachineById(req.params.machine_id);
            if (!machine) return MachineController.handleResponse(res, 404, 'Machine not found');
            MachineController.handleResponse(res, 200, 'Machine fetched successfully', machine);
        } catch (error) {
            next(error);
        }
    }

    static async updateMachine(req, res, next) {
        try {
            const updatedMachine = await MachineService.updateMachine(req.params.machine_id, req);
            if (!updatedMachine) return MachineController.handleResponse(res, 404, 'Machine not found');
            MachineController.handleResponse(res, 200, 'Machine updated successfully', updatedMachine);
        } catch (error) {
            next(error);
        }
    }

    static async deleteMachine(req, res, next) {
        try {
            const deletedMachine = await MachineService.deleteMachine(req.params.machine_id, req);
            if (!deletedMachine) return MachineController.handleResponse(res, 404, 'Machine not found');
            MachineController.handleResponse(res, 200, 'Machine deleted successfully', deletedMachine);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = MachineController;