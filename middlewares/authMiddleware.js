const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const UserManager = require("../models/UserManager");

const manager = new UserManager();

const protect = async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  try {
    // 2) Verification token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await manager.getUserById(decoded.id);

    if (!currentUser) {
      return next(
        new AppError("The user belonging to this token no longer exists.", 401)
      );
    }

    // Grant access to protected route
    // only if everything is correct
    req.user = currentUser;
    next();
  } catch (error) {
    return next(new AppError("Invalid or expired token.", 401));
  }
};

module.exports = protect;
