const express = require('express');
const SubSectionController = require('../controllers/subSectionController');
const { validateSubSection, validateAtUpdate } = require('../middlewares/subSectionValidator');
const authenticateToken = require('../middlewares/authToken');

const router = express.Router();

// Apply authenticateToken middleware to all routes below this line
router.use(authenticateToken);

// Using class-based controller methods

router.get('/', SubSectionController.getAllSubSections);
router.get('/:sub_section_id', SubSectionController.fetchSubSectionById);
router.post('/', validateSubSection, SubSectionController.createSubSection);
router.put('/:sub_section_id', validateAtUpdate, SubSectionController.updateSubSection);
router.delete('/:sub_section_id', SubSectionController.deleteSubSection);

module.exports = router;