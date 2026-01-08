const User = require("../models/User");
const { ObjectId } = require("mongodb");    
// add a new user
const addUser = async (request, h) => {
    try {
        const newUser = new User(request.payload);
        const saved = await newUser.save();
        return h.response(saved).code(201);
    } catch (err) {
        return h.response({ error: err.message }).code(500);
    }
};

const loginUser = async (request, h) => {
    try {
        const { username, password } = request.payload;
        const user = await User.find
            .findOne({ username: username });
        if (!user) {
            return h.response({ error: 'User not found' }).code(404);
        }   
        // compare hashed passwords later
        if (user.password !== password) {
            return h.response({ error: 'Invalid password' }).code(401);
        }
        return h.response({ message: 'Login successful', user }).code(200);
    } catch (err) {
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