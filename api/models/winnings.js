const pool = require('../db/db');

class Winning {
  static async create(winningData) {
    const { images } = winningData;
    // Insert new winning
    const insertQuery = 'INSERT INTO winnings (images) VALUES ($1) RETURNING *';
    const insertValues = [images];
    const result = await pool.query(insertQuery, insertValues);
    return result.rows[0];
  }

  static async getAll() {
    const query = 'SELECT * FROM winnings ORDER BY id DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async getById(id) {
    const query = 'SELECT * FROM winnings WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async update(id, winningData) {
    const { images } = winningData;
    const query = 'UPDATE winnings SET images = $1 WHERE id = $2 RETURNING *';
    const values = [images, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM winnings WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

module.exports = Winning;
