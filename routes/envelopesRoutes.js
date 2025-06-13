const express = require("express");
const EnvelopeManager = require("../models/EnvelopeManager");
const AppError = require("../utils/appError");

const envelopesRouter = express.Router();
const manager = new EnvelopeManager();

envelopesRouter.get("/", (req, res, next) => {
  const envelopes = manager.getAllEnvelopes();

  res.status(200).json({
    status: "success",
    data: {
      envelopes,
    },
  });
});

envelopesRouter.get("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const envelope = manager.getEnvelopeById(id);

  if (!envelope) {
    return next(new AppError("Envelope is not found.", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      envelope,
    },
  });
});

envelopesRouter.post("/", (req, res, next) => {
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
});

envelopesRouter.put("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const { title, budget } = req.body;

  if (!title || !budget) {
    return next(
      new AppError("Please provide title and budget to update.", 400)
    );
  }

  const updatedEnvelope = manager.updateEnvelope(id, title, budget);

  if (!updatedEnvelope) {
    return next(new AppError("Envelope is not found.", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      updatedEnvelope,
    },
  });
});

envelopesRouter.delete("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const deletedEnvelope = manager.deleteEnvelope(id);

  if (!deletedEnvelope) {
    return next(new AppError("Envelope is not found.", 404));
  }

  res.status(204).json({
    status: "success",
  });
});

envelopesRouter.put("/transfer/:fromId/:toId", (req, res, next) => {
  const fromId = Number(req.params.fromId);
  const toId = Number(req.params.toId);
  const { amount } = req.body;

  if (!amount || typeof amount !== "number" || amount <= 0) {
    return next(new AppError("Amount is required and must be a number.", 400));
  }

  const transfer = manager.transferBudget(fromId, toId, amount);

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
});

module.exports = envelopesRouter;
