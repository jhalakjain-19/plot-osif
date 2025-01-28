const SectionModel = require('../models/sectionModel');


class SectionService {
    static async createSection(data) {
        return await SectionModel.createSection(data);
    }

    static async getAllSections() {
        return await SectionModel.getAllSections();
    }

    static async fetchSectionById(section_id) {
        return await SectionModel.fetchSectionById(section_id);
    }

    static async updateSection(section_id, data) {
        return await SectionModel.updateSection(section_id, data);
    }

    static async deleteSection(section_id, data) {
        return await SectionModel.deleteSection(section_id, data);
    }
}

module.exports = SectionService;
