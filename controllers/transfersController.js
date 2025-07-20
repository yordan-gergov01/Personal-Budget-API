const TransferManager = require("../models/TransferManager");
const EnvelopeManager = require("../models/EnvelopeManager");
const AppError = require("../utils/appError");

const transferManager = new TransferManager();
const envelopeManager = new EnvelopeManager();

const createTransfer = async (req, res, next) => {
  const { fromId, toId, amount } = req.body;
  const userId = req.user.id;

  if (!fromId || !toId || !amount) {
    return next(new AppError("Missing transfer data.", 400));
  }

  try {
    const result = await envelopeManager.transferBudget(
      fromId,
      toId,
      amount,
      userId
    );

    if (!result) {
      return next(new AppError("Transfer failed.", 400));
    }

    const transfer = await transferManager.createTransfer(
      fromId,
      toId,
      amount,
      userId
    );

    res.status(201).json({
      status: "success",
      message: "Transfer completed",
      data: {
        transfer,
        updated: result,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getTransfers = async (req, res, next) => {
  try {
    const transfers = await transferManager.getTransfersByUserId(req.user.id);

    res.status(200).json({
      status: "success",
      data: transfers,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createTransfer, getTransfers };
