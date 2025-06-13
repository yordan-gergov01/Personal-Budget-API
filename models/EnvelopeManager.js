class EnvelopeManager {
  constructor() {
    this.envelopes = [];
    this.nextId = 1;
  }

  getAllEnvelopes() {
    return this.envelopes;
  }

  getEnvelopeById(id) {
    return this.envelopes.find((envelope) => envelope.id === id);
  }

  createNewEnvelope(title, budget) {
    const newEnvelope = {
      id: this.nextId++,
      title,
      budget: Number(budget),
    };

    this.envelopes.push(newEnvelope);
  }

  updateEnvelope(id, title, budget) {
    const updatedEnvelope = this.getEnvelopeById(id);

    if (!updatedEnvelope) return null;

    updatedEnvelope.title = title;
    updatedEnvelope.budget = Number(budget);

    return updatedEnvelope;
  }

  deleteEnvelope(id) {
    const deletedEnvelopeIndex = this.envelopes.findIndex(
      (envelope) => envelope.id === id
    );

    if (deletedEnvelopeIndex === -1) return false;

    this.envelopes.splice(deletedEnvelopeIndex, 1);

    return true;
  }

  transferBudget(fromId, toId, amount) {
    const transferFrom = this.getEnvelopeById(fromId);
    const transferTo = this.getEnvelopeById(toId);

    if (!transferFrom || !transferTo) return null;

    if (typeof amount !== "number" || amount <= 0) return null;

    if (transferFrom.budget < amount) return null;

    transferFrom.budget -= amount;
    transferTo.budget += amount;

    return { transferFrom, transferTo };
  }
}

module.exports = EnvelopeManager;
