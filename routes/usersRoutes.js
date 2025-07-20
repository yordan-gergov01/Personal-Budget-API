const express = require("express");

const { register, login, logout } = require("../controllers/authController");
const getProfile = require("../controllers/usersController");
const protect = require("../middlewares/authMiddleware");

const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.post("/logout", logout);

usersRouter.use(protect);

usersRouter.get("/profile", getProfile);

module.exports = usersRouter;
