// models/Payment.js

const pool = require('../db/db');

class Payment {
  static async create(paymentData) {
    const { user_id, money, paymentAt } = paymentData;
    // Insert new payment
    const insertQuery = 'INSERT INTO payments (user_id, money, payment_at) VALUES ($1, $2, $3) RETURNING *';
    const insertValues = [user_id, money, paymentAt];
    const result = await pool.query(insertQuery, insertValues);
    return result.rows[0];
  }

  static async getAll() {
    const query = 'SELECT * FROM payments ORDER BY id DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async getById(id) {
    const query = 'SELECT * FROM payments WHERE user_id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async update(id, paymentData) {
    const { money, paymentAt } = paymentData;
    const query = 'UPDATE payments SET money = $1, payment_at = $2 WHERE id = $3 RETURNING *';
    const values = [money, paymentAt, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM payments WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

module.exports = Payment;
