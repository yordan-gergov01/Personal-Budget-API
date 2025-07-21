const express = require("express");

const {
  getAllEnvelopes,
  getEnvelopeById,
  createNewEnvelope,
  updatedEnvelope,
  deleteEnvelope,
  transferBudget,
} = require("../controllers/envelopesController");

const protect = require("../middlewares/authMiddleware");

const envelopesRouter = express.Router();

envelopesRouter.use(protect);

envelopesRouter.get("/", getAllEnvelopes);
envelopesRouter.get("/:id", getEnvelopeById);
envelopesRouter.post("/", createNewEnvelope);
envelopesRouter.put("/:id", updatedEnvelope);
envelopesRouter.delete("/:id", deleteEnvelope);
envelopesRouter.put("/transfer/:fromId/:toId", transferBudget);

module.exports = envelopesRouter;
