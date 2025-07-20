const EnvelopeManager = require("../models/EnvelopeManager");
const AppError = require("../utils/appError");

const manager = new EnvelopeManager();

const getAllEnvelopes = async (req, res, next) => {
  try {
    const envelopes = await manager.getAllEnvelopes();

    res.status(200).json({
      status: "success",
      data: {
        envelopes,
      },
    });
  } catch (error) {
    next(err);
  }
};

const getEnvelopeById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const envelope = await manager.getEnvelopeById(id);

    if (!envelope) {
      return next(new AppError("Envelope not found.", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        envelope,
      },
    });
  } catch (error) {
    next(err);
  }
};

const createNewEnvelope = async (req, res, next) => {
  try {
    const { title, budget } = req.body;

    if (!title || !budget || typeof budget !== "number") {
      return next(
        new AppError(
          "Title and Budget fields are required and budget must be a number.",
          400
        )
      );
    }

    const newEnvelope = manager.createNewEnvelope(title, budget);

    res.status(201).json({
      status: "success",
      data: {
        newEnvelope,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updatedEnvelope = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { title, budget } = req.body;

    if (!title || !budget || typeof budget !== "number") {
      return next(
        new AppError("Please provide valid title and budget to update.", 400)
      );
    }

    const updatedEnvelope = await manager.updateEnvelope(id, title, budget);

    if (!updatedEnvelope) {
      return next(
        new AppError("Error updating envelope or it is not found.", 404)
      );
    }

    res.status(200).json({
      status: "sucess",
      data: {
        updatedEnvelope,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteEnvelope = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const deletedEnvelope = await manager.deleteEnvelope(id);

    if (!deletedEnvelope) {
      return next(new AppError("Envelope not found.", 404));
    }

    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

const transferBudget = async (req, res, next) => {
  try {
    const fromId = Number(req.params.fromId);
    const toId = Number(req.params.toId);
    const { amount } = req.body;

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return next(
        new AppError("Amount is required and must be a number.", 400)
      );
    }

    const transfer = await manager.transferBudget(fromId, toId, amount);

    if (!transfer) {
      return next(
        new AppError(
          "Transfer failed. Check envelope IDs and budget availability.",
          400
        )
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        from: transfer.transferFrom,
        to: transfer.transferTo,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEnvelopes,
  getEnvelopeById,
  createNewEnvelope,
  updatedEnvelope,
  deleteEnvelope,
  transferBudget,
};
