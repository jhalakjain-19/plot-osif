const express = require('express');
const SectionController = require('../controllers/sectionController');
const { validateSection, validateAtUpdate } = require('../middlewares/sectionValidator');
const authenticateToken = require('../middlewares/authToken');

const router = express.Router();

// Apply authenticateToken middleware to all routes below this line
router.use(authenticateToken);

// Using class-based controller methods

router.get('/', SectionController.getAllSections);
router.get('/:section_id', SectionController.fetchSectionById);
router.post('/', validateSection, SectionController.createSection);
router.put('/:section_id', validateAtUpdate, SectionController.updateSection);
router.delete('/:section_id', SectionController.deleteSection);

module.exports = router;