const pool = require("../config/db");

class TransferManager {
  async createTransfer(fromId, toId, amount, userId) {
    const result = await pool.query(
      "INSERT INTO transfers (from_id, to_id, amount, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [fromId, toId, amount, userId]
    );

    return result.rows[0];
  }

  async getTransfersByUserId(userId) {
    const result = await pool.query(
      "SELECT * FROM transfers WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );

    return result.rows;
  }
}

module.exports = TransferManager;
