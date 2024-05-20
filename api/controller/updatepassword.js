const pool = require('../db/db');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

async function updatePasswordByEmail(req, res) {
  const { email, newPassword } = req.body;
  
  try {
    const client = await pool.connect();

    // Update the password for the user based on their email
    const updateQuery = `
      UPDATE users
      SET password = $1
      WHERE email = $2
    `;
    const updateValues = [newPassword, email];
    await client.query(updateQuery, updateValues);

    // Fetch the updated user details
    const selectQuery = `
      SELECT * FROM users
      WHERE email = $1
    `;
    const result = await client.query(selectQuery, [email]);
    const updatedUser = result.rows[0];

    client.release(); // Release the client back to the pool

    res.json({ message: 'Password updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { updatePasswordByEmail };
