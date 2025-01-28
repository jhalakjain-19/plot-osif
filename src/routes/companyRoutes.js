const express = require('express');
const CompanyController = require('../controllers/companyController');
const { validateCompany, validateAtUpdate } = require('../middlewares/companyValidator');
const authenticateToken = require('../middlewares/authToken');

const router = express.Router();

// Apply authenticateToken middleware to all routes below this line
router.use(authenticateToken);

// Using class-based controller methods

router.get('/', CompanyController.getAllCompanies);
router.get('/:company_id', CompanyController.fetchCompanyById);
router.post('/', validateCompany, CompanyController.createCompany);
router.put('/:company_id', validateAtUpdate, CompanyController.updateCompany);
router.delete('/:company_id', CompanyController.deleteCompany);

module.exports = router;