const pool = require('../db/db');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

async function userLogin(req, res) {
  const { emailOrMobile, password } = req.body;

  try {
    const client = await pool.connect();

    // Query the users table to find the user by email or mobile
    const query = `
      SELECT * FROM users WHERE email = $1 OR mobile = $1
    `;
    const result = await client.query(query, [emailOrMobile]);
    const user = result.rows[0];

    client.release(); // Release the client back to the pool

    if (!user) {
      return res.status(401).json({ message: 'Invalid email/mobile or password' });
    }

    if (password !== user.password) {
        return res.status(401).json({ message: 'Invalid email/mobile or password' });
      }
    // Generate JWTUSER token

    res.status(200).json({ user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { userLogin };
