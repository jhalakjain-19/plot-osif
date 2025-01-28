const UserModel = require('../models/userModel');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

class UserService {
    static async createUser(data) {
        return await UserModel.createUser(data);
    }

    static async getAllUsers() {
        return await UserModel.getAllUsers();
    }

    static async getUserById(userId) {
        return await UserModel.getUserById(userId);
    }

    static async updateUser(userId, data) {
        return await UserModel.updateUser(userId, data);
    }

    static async deleteUser(userId, data) {
        return await UserModel.deleteUser(userId, data);
    }

    static async loginUser(req, userData) {
        // Check if the user exists by email
        const user = await this.validateUser(req, userData);
        if (!user) {
            throw new Error('Email or Password is incorrect!');
        }

        const token = jwt.sign(
            { user_id: user.user_id },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Update session token in the database
        await UserModel.updateSessionToken(user.user_id, token);
        return { msg: 'Token generated successfully', token };
    }

    // Validate user by email
    static async validateUser(req, userData) {
        const user = await UserModel.loginUser(userData.email);
        // If the user doesn't exist, return null
        if (!user || user.length === 0) {
            return null;
        }

        // Check if the password is correct
        const validPassword = await bcrypt.compare(userData.password, user[0].password);
        if (!validPassword) {
            return null; // Password is incorrect
        }

        return user[0];
    }
}

module.exports = UserService;