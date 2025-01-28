const DeptModel = require('../models/deptModel');


class DeptService {
    static async createDept(data) {
        return await DeptModel.createDept(data);
    }

    static async fetchDept() {
        return await DeptModel.fetchDept();
    }

    static async getDeptById(dept_id) {
        return await DeptModel.getDeptById(dept_id);
    }

    static async updateDept(dept_id, data) {
        return await DeptModel.updateDept(dept_id, data);
    }

    static async deleteDept(dept_id, data) {
        return await DeptModel.deleteDept(dept_id, data);
    }
}

module.exports = DeptService;
