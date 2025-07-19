const pool = require("../config/db");

class UserManager {
  async registerUser(email, username, password) {
    const result = await pool.query(
      "INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING id, username, email",
      [email, username, password]
    );

    return result.rows[0];
  }

  async findUserByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    return result.rows[0];
  }
}

module.exports = UserManager;
