const express = require('express');
const UserController = require('../controllers/userController');
const { validateUser, validateAtUpdate, validateLogin } = require('../middlewares/userValidator');
const authenticateToken = require('../middlewares/authToken');

const router = express.Router();

// Apply authenticateToken middleware to all routes except login route
router.use((req, res, next) => {
    if (req.baseUrl + req.path === '/api/users/login') return next();
    authenticateToken(req, res, next);
});


router.get('/', UserController.getAllUsers);
router.get('/:user_id', UserController.getUserById);
router.post('/', validateUser, UserController.createUser);
router.put('/:user_id', validateAtUpdate, UserController.updateUser);
router.delete('/:user_id', UserController.deleteUser);

router.post('/login', validateLogin, UserController.loginUser);

module.exports = router;
