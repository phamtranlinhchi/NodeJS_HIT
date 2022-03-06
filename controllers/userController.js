const User = require("../models/userModel");

const getAllUsers = async (req, res) => {
	const users = await User.find();
	res.json(users);
};

const getUser = async (req, res) => {
	let { id } = req.params;
	const user = await User.findById(id);
	res.json(user);
};

const createUser = async (req, res) => {
	const newUser = await User.create(req.body);
	res.json(newUser);
};

const updateUser = async (req, res) => {
	let { id } = req.params;
	const user = await User.findByIdAndUpdate(id, req.body);
	res.json(user);
};

const deleteUser = async (req, res) => {
	let { id } = req.params;
	const user = await User.findByIdAndDelete(id);
	res.json(user);
};

module.exports = {
	getAllUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
};
