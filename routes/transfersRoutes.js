const express = require("express");
const {
  createTransfer,
  getTransfers,
} = require("../controllers/transfersController");

const protect = require("../middlewares/authMiddleware");

const transfersRouter = express.Router();

transfersRouter.use(protect);

transfersRouter.post("/", createTransfer);
transfersRouter.get("/", getTransfers);

module.exports = transfersRouter;
