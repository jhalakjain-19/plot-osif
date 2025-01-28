const SubSectionModel = require('../models/subSectionModel');


class SubSectionService {
    static async createSubSection(data) {
        return await SubSectionModel.createSubSection(data);
    }

    static async getAllSubSections() {
        return await SubSectionModel.getAllSubSections();
    }

    static async fetchSubSectionById(sub_section_id) {
        return await SubSectionModel.fetchSubSectionById(sub_section_id);
    }

    static async updateSubSection(sub_section_id, data) {
        return await SubSectionModel.updateSubSection(sub_section_id, data);
    }

    static async deleteSubSection(sub_section_id, data) {
        return await SubSectionModel.deleteSubSection(sub_section_id, data);
    }
}

module.exports = SubSectionService;