const CompanyService = require('../services/companyService');

class CompanyController {
    static handleResponse(res, status, message, data = null) {
        res.status(status).json({
            status,
            message,
            data,
        });
    }

    static async createCompany(req, res, next) {
        try {
            const newCompany = await CompanyService.createCompany(req);
            CompanyController.handleResponse(res, 201, 'Company created successfully', newCompany);
        } catch (error) {
            next(error);
        }
    }

    static async getAllCompanies(req, res, next) {
        try {
            const companies = await CompanyService.getAllCompanies();
            CompanyController.handleResponse(res, 200, 'Companies fetched successfully', companies);
        } catch (error) {
            next(error);
        }
    }

    static async fetchCompanyById(req, res, next) {
        try {
            const company = await CompanyService.fetchCompanyById(req.params.company_id);
            if (!company) return CompanyController.handleResponse(res, 404, 'Company not found');
            CompanyController.handleResponse(res, 200, 'Company fetched successfully', company);
        } catch (error) {
            next(error);
        }
    }

    static async updateCompany(req, res, next) {
        try {
            const updatedCompany = await CompanyService.updateCompany(req.params.company_id, req);
            if (!updatedCompany) return CompanyController.handleResponse(res, 404, 'Company not found');
            CompanyController.handleResponse(res, 200, 'Company updated successfully', updatedCompany);
        } catch (error) {
            next(error);
        }
    }

    static async deleteCompany(req, res, next) {
        try {
            const deletedCompany = await CompanyService.deleteCompany(req.params.company_id, req);
            if (!deletedCompany) return CompanyController.handleResponse(res, 404, 'Company not found');
            CompanyController.handleResponse(res, 200, 'Company deleted successfully', deletedCompany);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = CompanyController;