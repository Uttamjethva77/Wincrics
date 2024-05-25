const pool = require('../db/db');

class ContactUs {
  static async create(contactData) {
    const { full_name, email, phone_number, message } = contactData;
    const insertQuery = 'INSERT INTO contact_us (full_name, email, phone_number, message) VALUES ($1, $2, $3, $4) RETURNING *';
    const insertValues = [full_name, email, phone_number, message];
    const result = await pool.query(insertQuery, insertValues);
    return result.rows[0];
  }

  static async getAll() {
    const query = 'SELECT * FROM contact_us ORDER BY id DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async getById(id) {
    const query = 'SELECT * FROM contact_us WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async update(id, contactData) {
    const { full_name, email, phone_number, message } = contactData;
    const query = 'UPDATE contact_us SET full_name = $1, email = $2, phone_number = $3, message = $4 WHERE id = $5 RETURNING *';
    const values = [full_name, email, phone_number, message, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM contact_us WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

module.exports = ContactUs;
