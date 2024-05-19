// models/User.js

const pool = require('../db/db');

class User {
  static async create(userData) {
    const { fullname, mobile, email, password } = userData;
    // Check if email or mobile already exists
    const checkQuery = 'SELECT id FROM users WHERE email = $1 OR mobile = $2';
    const checkValues = [email, mobile];
    const checkResult = await pool.query(checkQuery, checkValues);

    if (checkResult.rows.length > 0) {
        // Email or mobile already exists
        throw new Error('Email or mobile already exists');
    }

    // Insert new user
    const insertQuery = 'INSERT INTO users (fullname, mobile, email, password) VALUES ($1, $2, $3, $4) RETURNING *';
    const insertValues = [fullname, mobile, email, password];
    const result = await pool.query(insertQuery, insertValues);
    return result.rows[0];
    }

  static async getAll() {
    const query = 'SELECT * FROM users ORDER BY id DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async getById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async update(id, userData) {
    const { fullname, mobile, email, password } = userData;
    const query = 'UPDATE users SET fullname = $1, mobile = $2, email = $3, password = $4 WHERE id = $5 RETURNING *';
    const values = [fullname, mobile, email, password, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

module.exports = User;
