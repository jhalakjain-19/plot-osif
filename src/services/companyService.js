const CompanyModel = require('../models/companyModel');


class CompanyService {
    static async createCompany(data) {
        return await CompanyModel.createCompany(data);
    }

    static async getAllCompanies() {
        return await CompanyModel.getAllCompanies();
    }

    static async fetchCompanyById(company_id) {
        return await CompanyModel.fetchCompanyById(company_id);
    }

    static async updateCompany(company_id, data) {
        return await CompanyModel.updateCompany(company_id, data);
    }

    static async deleteCompany(company_id, data) {
        return await CompanyModel.deleteCompany(company_id, data);
    }
}

module.exports = CompanyService;
