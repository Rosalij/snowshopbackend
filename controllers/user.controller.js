const User = require("../models/User");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");    
const SALT_ROUNDS = 10;
const jwt = require('jsonwebtoken');
const { create } = require("../models/Product");

// add a new user
const addUser = async (request, h) => {
    try {
        const { password, ...rest } = request.payload;

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const newUser = new User({
            ...rest,
            password: hashedPassword
        });

        const saved = await newUser.save();
        return h.response(saved).code(201);

    } catch (err) {
        return h.response({ error: err.message }).code(500);
    }
};


const loginUser = async (request, h) => {
    try {
        const { email, password } = request.payload;

        const user = await User.findOne({ email });
        if (!user) {
            return h.response({ error: 'User not found' }).code(404);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return h.response({ error: 'Invalid password' }).code(401);
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                username: user.username,
                role: user.role,
                createdAt: user.createdAt
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
        );

        return h.response({
            message: 'Login successful',
            token
        }).code(200);

    } catch (err) {
        console.error('Login error:', err); 
        return h.response({ error: err.message }).code(500);
    }
};

const deleteUser = async (request, h) => {
    try {
        const deleted = await User.findByIdAndDelete(request.params.id);
        if (!deleted) {
            return h.response({ error: 'User not found' }).code(404);
        }
        return h.response(deleted).code(200);
    } catch (err) {
        return h.response({ error: err.message }).code(500);
    }
};

const getAllUsers = async (request, h) => {
    try {
        const users = await User.find();
        return h.response(users).code(200);
    } catch (err) {
        return h.response({ error: err.message }).code(500);
    }
};
const getUserById = async (request, h) => {
    try {
        const user = await
            User.findById(request.params.id);
        if (!user) {
            return h.response({ error: 'User not found' }).code(404);
        }   
        return h.response(user).code(200);
    } catch (err) {
        return h.response({ error: err.message }).code(500);
    }       
};

const updateUser = async (request, h) => {
    const { id } = request.params; // get user ID from URL
    const updates = request.payload; // fields to update
    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
        return h.response({ error: 'Invalid user ID' }).code(400);
    }   
    // Prevent updating _id
    if (updates._id) delete updates._id;
    try {
        const updated = await User.findByIdAndUpdate(   
            id,
            updates,
            { new: true }
        );
        if (!updated) {
            return h.response({ error: 'User not found' }).code(404);
        }   
        return h.response(updated).code(200);
    } catch (err) {
        return h.response({ error: err.message }).code(500);
    }       
};

module.exports = {
    addUser,
    loginUser,
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser
};