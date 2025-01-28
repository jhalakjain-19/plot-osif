const MachineModel = require('../models/machineModel');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

class MachineService {
    static async createMachine(data) {
        return await MachineModel.createMachine(data);
    }

    static async getAllMachines() {
        return await MachineModel.getAllMachines();
    }

    static async fetchMachineById(machineId) {
        return await MachineModel.fetchMachineById(machineId);
    }

    static async updateMachine(machineId, data) {
        return await MachineModel.updateMachine(machineId, data);
    }

    static async deleteMachine(machineId, data) {
        return await MachineModel.deleteMachine(machineId, data);
    }
}

module.exports = MachineService;