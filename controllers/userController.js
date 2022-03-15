const User = require('../models/userModel');
const asyncHandle = require('../middlewares/asyncHandle');

const getAllUsersAndPosts = asyncHandle(async (req, res) => {
    const users = await User.find().populate('posts');
    res.json(users);
});

const getUserAndPosts = asyncHandle(async (req, res) => {
    let { id } = req.params;
    const user = await User.findById(id).populate('posts');
    res.json(user);
});

const getUsersBetween18And40 = asyncHandle(async (req, res) => {
    const users = await User.find({
        age: {
            $gte: 18,
            $lte: 40,
        },
    });
    res.json(users);
});

const getUsersNameStartWithH = asyncHandle(async (req, res) => {
    const users = await User.find({ name: /^h/ });
    res.json(users);
});

const updateUserById = asyncHandle(async (req, res) => {
    let { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    res.json(user);
});

const deleteUserById = asyncHandle(async (req, res) => {
    let { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.json(user);
});

module.exports = {
    getAllUsersAndPosts,
    getUserAndPosts,
    getUsersBetween18And40,
    getUsersNameStartWithH,
    updateUserById,
    deleteUserById,
};
