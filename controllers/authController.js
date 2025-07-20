const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserManager = require("../models/UserManager");
const AppError = require("../utils/appError");

const manager = new UserManager();

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN) +
        7 * 24 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);

  // remove password from the output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

const register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return next(
        new AppError("Email, username and password are required.", 400)
      );
    }

    const existingUser = await manager.findUserByEmail(email);

    if (existingUser) {
      return next(new AppError("User with this email already exists.", 400));
    }

    const newUser = await manager.registerUser(email, username, password);

    createSendToken(newUser, 201, res);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Email and password are required.", 400));
    }

    const loggedInUser = await manager.findUserByEmail(email);

    if (!loggedInUser) {
      return next(new AppError("Email is not correct.", 401));
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      loggedInUser.password
    );

    if (!isPasswordMatch) {
      return next(new AppError("Password is not correct.", 401));
    }

    createSendToken(loggedInUser, 200, res);
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expiresIn: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
  });
};

module.exports = {
  register,
  login,
  logout,
};
