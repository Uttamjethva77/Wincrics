const pool = require('../db/db');

async function getAllBlogsData() {
  try {
    const client = await pool.connect();

    // Query to select all data except images and deleted_by
    const query = `
      SELECT id, title, blogimage, match_news, date, time, venue, squad_team1, squad_team2, 
      imp_player, captain, fantasy_team, vice_captain, upload_by, tags, metadata, description, 
      playing_11_team1, playing_11_team2
      FROM blogs ORDER BY id DESC
    `;
    
    const result = await client.query(query);
    client.release(); // Release the client back to the pool

    return result.rows;
  } catch (error) {
    console.error('Error fetching blogs data:', error);
    throw error;
  }
}

module.exports = { getAllBlogsData };
