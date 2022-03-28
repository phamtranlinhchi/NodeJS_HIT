const User = require('../models/userModel');
const asyncHandle = require('../middlewares/asyncHandle');
const ErrorResponse = require('../common/ErrorResponse');

// [GET] /users/
const getAllUsersAndPosts = asyncHandle(async (req, res, next) => {
    const users = await User.find().populate('posts');
    res.status(200).json(users);
});

// [GET] /users/:id
const getUserAndPosts = asyncHandle(async (req, res, next) => {
    let { id } = req.params;
    const user = await User.findById(id).populate('posts');
    res.status(200).json(user);
});

// [GET] /users/18-40
const getUsersBetween18And40 = asyncHandle(async (req, res, next) => {
    const users = await User.find({
        age: {
            $gte: 18,
            $lte: 40,
        },
    });
    res.status(200).json(users);
});

// [GET] /users/name-start-with-h
const getUsersNameStartWithH = asyncHandle(async (req, res, next) => {
    const users = await User.find({ name: /^h/ });
    res.status(200).json(users);
});

// [POST] /users/
const createUser = asyncHandle(async (req, res, next) => {
    await User.create(req.body);
    res.status(201).redirect('/auth/login');
});

// [PUT] users/:id
const updateUserById = asyncHandle(async (req, res, next) => {
    let { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    res.status(200).json(user);
});

// [DELETE] users/:id
const deleteUserById = asyncHandle(async (req, res, next) => {
    let { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(204).json({ message: 'successful' });
});

module.exports = {
    getAllUsersAndPosts,
    getUserAndPosts,
    getUsersBetween18And40,
    getUsersNameStartWithH,
    createUser,
    updateUserById,
    deleteUserById,
};
