const SubSectionService = require('../services/subSectionService');

class SubSectionController {
    static handleResponse(res, status, message, data = null) {
        res.status(status).json({
            status,
            message,
            data,
        });
    }

    static async createSubSection(req, res, next) {
        try {
            const newSubSection = await SubSectionService.createSubSection(req);
            SubSectionController.handleResponse(res, 201, 'Sub section created successfully', newSubSection);
        } catch (error) {
            next(error);
        }
    }

    static async getAllSubSections(req, res, next) {
        try {
            const subSections = await SubSectionService.getAllSubSections();
            SubSectionController.handleResponse(res, 200, 'Sub sections fetched successfully', subSections);
        } catch (error) {
            next(error);
        }
    }

    static async fetchSubSectionById(req, res, next) {
        try {
            const subSection = await SubSectionService.fetchSubSectionById(req.params.sub_section_id);
            if (!section) return SubSectionController.handleResponse(res, 404, 'Sub section not found');
            SubSectionController.handleResponse(res, 200, 'Sub section fetched successfully', subSection);
        } catch (error) {
            next(error);
        }
    }

    static async updateSubSection(req, res, next) {
        try {
            const updatedSubSection = await SubSectionService.updateSubSection(req.params.sub_section_id, req);
            if (!updatedSubSection) return SubSectionController.handleResponse(res, 404, 'Sub section not found');
            SubSectionController.handleResponse(res, 200, 'Sub section updated successfully', updatedSubSection);
        } catch (error) {
            next(error);
        }
    }

    static async deleteSubSection(req, res, next) {
        try {
            const deletedSubSection = await SubSectionService.deleteSubSection(req.params.sub_section_id, req);
            if (!deletedSubSection) return SubSectionController.handleResponse(res, 404, 'Sub section not found');
            SubSectionController.handleResponse(res, 200, 'Sub section deleted successfully', deletedSubSection);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = SubSectionController;