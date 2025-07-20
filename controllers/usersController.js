const UserManager = require("../models/UserManager");

const manager = new UserManager();

const getProfile = async (req, res, next) => {
  try {
    const user = await manager.getUserById(req.user.id);

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getProfile;
