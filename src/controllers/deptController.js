const DeptService = require('../services/deptService');

class DeptController {
    static handleResponse(res, status, message, data = null) {
        res.status(status).json({
            status,
            message,
            data,
        });
    }

    static async createDept(req, res, next) {
        try {
            const newDept = await DeptService.createDept(req);
            DeptController.handleResponse(res, 201, 'Department created successfully', newDept);
        } catch (error) {
            next(error);
        }
    }

    static async fetchDept(req, res, next) {
        try {
            const depts = await DeptService.fetchDept();
            DeptController.handleResponse(res, 200, 'Departments fetched successfully', depts);
        } catch (error) {
            next(error);
        }
    }

    static async getDeptById(req, res, next) {
        try {
            const department = await DeptService.getDeptById(req.params.dept_id);
            if (!department) return DeptController.handleResponse(res, 404, 'Department not found');
            DeptController.handleResponse(res, 200, 'Department fetched successfully', department);
        } catch (error) {
            next(error);
        }
    }

    static async updateDept(req, res, next) {
        try {
            const updatedDept = await DeptService.updateDept(req.params.dept_id, req);
            if (!updatedDept) return DeptController.handleResponse(res, 404, 'Department not found');
            DeptController.handleResponse(res, 200, 'Department updated successfully', updatedDept);
        } catch (error) {
            next(error);
        }
    }

    static async deleteDept(req, res, next) {
        try {
            const deletedDept = await DeptService.deleteDept(req.params.dept_id, req);
            if (!deletedDept) return DeptController.handleResponse(res, 404, 'Department not found');
            DeptController.handleResponse(res, 200, 'Department deleted successfully', deletedDept);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = DeptController;
