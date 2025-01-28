const UserService = require('../services/userService');

class UserController {
    static handleResponse(res, status, message, data = null) {
        res.status(status).json({
            status,
            message,
            data,
        });
    }

    static async createUser(req, res, next) {
        try {
            const newUser = await UserService.createUser(req);
            UserController.handleResponse(res, 201, 'User created successfully', newUser);
        } catch (error) {
            next(error);
        }
    }

    static async getAllUsers(req, res, next) {
        try {
            const users = await UserService.getAllUsers();
            UserController.handleResponse(res, 200, 'Users fetched successfully', users);
        } catch (error) {
            next(error);
        }
    }

    static async getUserById(req, res, next) {
        try {
            const user = await UserService.getUserById(req.params.user_id);
            if (!user) return UserController.handleResponse(res, 404, 'User not found');
            UserController.handleResponse(res, 200, 'User fetched successfully', user);
        } catch (error) {
            next(error);
        }
    }

    static async updateUser(req, res, next) {
        try {
            const updatedUser = await UserService.updateUser(req.params.user_id, req);
            if (!updatedUser) return UserController.handleResponse(res, 404, 'User not found');
            UserController.handleResponse(res, 200, 'User updated successfully', updatedUser);
        } catch (error) {
            next(error);
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const deletedUser = await UserService.deleteUser(req.params.user_id, req);
            if (!deletedUser) return UserController.handleResponse(res, 404, 'User not found');
            UserController.handleResponse(res, 200, 'User deleted successfully', deletedUser);
        } catch (error) {
            next(error);
        }
    }

    static async loginUser(req, res, next) {
        try {
            const login = await UserService.loginUser(req, req.body);
            UserController.handleResponse(res, 200, 'User logged in successfully!!!', login);
        }
        catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;
