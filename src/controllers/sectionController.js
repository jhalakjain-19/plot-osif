const SectionService = require('../services/sectionService');

class SectionController {
    static handleResponse(res, status, message, data = null) {
        res.status(status).json({
            status,
            message,
            data,
        });
    }

    static async createSection(req, res, next) {
        try {
            const newSection = await SectionService.createSection(req);
            SectionController.handleResponse(res, 201, 'Section created successfully', newSection);
        } catch (error) {
            next(error);
        }
    }

    static async getAllSections(req, res, next) {
        try {
            const sections = await SectionService.getAllSections();
            SectionController.handleResponse(res, 200, 'Sections fetched successfully', sections);
        } catch (error) {
            next(error);
        }
    }

    static async fetchSectionById(req, res, next) {
        try {
            const section = await SectionService.fetchSectionById(req.params.section_id);
            if (!section) return SectionController.handleResponse(res, 404, 'Section not found');
            SectionController.handleResponse(res, 200, 'Section fetched successfully', section);
        } catch (error) {
            next(error);
        }
    }

    static async updateSection(req, res, next) {
        try {
            const updatedSection = await SectionService.updateSection(req.params.section_id, req);
            if (!updatedSection) return SectionController.handleResponse(res, 404, 'Section not found');
            SectionController.handleResponse(res, 200, 'Section updated successfully', updatedSection);
        } catch (error) {
            next(error);
        }
    }

    static async deleteSection(req, res, next) {
        try {
            const deletedSection = await SectionService.deleteSection(req.params.section_id, req);
            if (!deletedSection) return SectionController.handleResponse(res, 404, 'Section not found');
            SectionController.handleResponse(res, 200, 'Section deleted successfully', deletedSection);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = SectionController;
