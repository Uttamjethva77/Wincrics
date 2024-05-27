const pool = require('../db/db');

class Analytics {
  static async getAll(filters = {}) {
    let query = 'SELECT * FROM analytics WHERE 1 = 1';
    const values = [];

    // Apply filters
    if (filters.date) {
      query += ' AND date = $1';
      values.push(filters.date);
    }
    if (filters.url) {
      query += ' AND url = $2';
      values.push(filters.url);
    }

    const result = await pool.query(query, values);
    return result.rows;
  }
}

module.exports = Analytics;
