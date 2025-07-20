const pool = require("../config/db");
const bcrypt = require("bcrypt");

class UserManager {
  async registerUser(email, username, password) {
    const hashedPassword = await bcrypt.hash(password, process.env.JWT_SECRET);
    const result = await pool.query(
      "INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING id, username, email",
      [email, username, hashedPassword]
    );

    return result.rows[0];
  }

  async findUserByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    return result.rows[0];
  }

  async getUserById(id) {
    const result = await pool.query(
      "SELECT id, username, email FROM users WHERE id = $1",
      [id]
    );

    return result.rows[0];
  }
}

module.exports = UserManager;
