const pool = require('../db/db');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

async function getOtpByEmail(req, res) {
    const { email } = req.body;
  try {
    const client = await pool.connect();

    // Query the otp table to find the OTP entry by email
    const query = `
      SELECT * FROM otp WHERE email = $1
    `;
    const result = await client.query(query, [email]);
    const otpEntry = result.rows[0];

    client.release(); // Release the client back to the pool

    res.json({ otpEntry });
  } catch (error) {
    console.error('Error fetching OTP by email:', error);
    throw error;
  }
}

module.exports = { getOtpByEmail };
