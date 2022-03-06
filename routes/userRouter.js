const express = require("express");

const userController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.use(express.json());

userRouter
	.route("/")
	.get(userController.getAllUsers)
	.post(userController.createUser);

userRouter
	.route("/:id")
	.get(userController.getUser)
	.put(userController.updateUser)
	.delete(userController.deleteUser);

module.exports = userRouter;
