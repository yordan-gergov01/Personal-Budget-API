const pool = require("../config/db");

class EnvelopeManager {
  async getAllEnvelopes() {
    const result = await pool.query("SELECT * FROM envelopes ORDER BY id ASC");

    return result.rows;
  }

  async getEnvelopeById(id) {
    const result = await pool.query("SELECT * FROM envelopes WHERE id = $1", [
      id,
    ]);

    return result.rows[0] || null;
  }

  async createNewEnvelope(title, budget, userId) {
    const result = await pool.query(
      "INSERT INTO envelopes (title, budget, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, budget, userId]
    );

    return result.rows[0];
  }

  async updateEnvelope(id, title, budget) {
    const result = await pool.query(
      "UPDATE envelopes SET title = $1, budget = $2 WHERE id = $3 RETURNING *",
      [id, title, budget]
    );

    return result.rows[0] || null;
  }

  async deleteEnvelope(id) {
    const result = await pool.query(
      "DELETE FROM envelopes WHERE id = $1 RETURNING *",
      [id]
    );

    return result.rowCount > 0;
  }

  async transferBudget(fromId, toId, amount, userId) {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const fromRes = await client.query(
        "SELECT budget FROM envelopes WHERE id = $1 AND user_id = $2 FOR UPDATE",
        [fromId, userId]
      );

      const toRes = await client.query(
        "SELECT budget FROM envelopes WHERE id = $1 AND user_id = $2 FOR UPDATE",
        [toId, userId]
      );

      if (fromRes.rows.length === 0 || toRes.rows.length === 0) {
        throw new Error("Invalid envelope IDs.");
      }

      const fromBudget = fromRes.rows[0].budget;

      if (fromBudget < amount) {
        throw new Error("Insufficient funds.");
      }

      await client.query(
        "UPDATE envelopes SET budget = budget - $1 WHERE id = $2",
        [amount, fromId]
      );

      await client.query(
        "UPDATE envelopes SET budget = budget + $1 WHERE id = $2",
        [amount, toId]
      );

      await client.query("COMMIT");

      return { transferFrom: fromId, transferTo: toId, amount };
    } catch (error) {
      await client.query("ROLLBACK");
      throw new Error(error);
    } finally {
      client.release();
    }
  }
}

module.exports = EnvelopeManager;
