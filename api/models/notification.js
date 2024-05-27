const pool = require('../db/db');

class Notification {
  static async create(notificationData) {
    const { email, whatsapp_number, name } = notificationData;
    
    // Check if email or whatsapp_number already exists
    const checkQuery = 'SELECT * FROM notification WHERE email = $1 OR whatsapp_number = $2';
    const checkValues = [email, whatsapp_number];
    const checkResult = await pool.query(checkQuery, checkValues);

    // If email or whatsapp_number already exists, return an error
    if (checkResult.rows.length > 0) {
        throw new Error('Email or whatsapp number already exists');
    }

    // If not, proceed with insertion
    const insertQuery = 'INSERT INTO notification (email, whatsapp_number, name) VALUES ($1, $2, $3) RETURNING *';
    const insertValues = [email, whatsapp_number, name];
    const result = await pool.query(insertQuery, insertValues);
    return result.rows[0];
}

  static async getAll() {
    const query = 'SELECT * FROM notification ORDER BY id DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async getById(id) {
    const query = 'SELECT * FROM notification WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async update(id, notificationData) {
    const { email, whatsapp_number, name } = notificationData;
    const query = 'UPDATE notification SET email = $1, whatsapp_number = $2, name = $3 WHERE id = $4 RETURNING *';
    const values = [email, whatsapp_number, name, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM notification WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

module.exports = Notification;
