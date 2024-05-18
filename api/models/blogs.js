const pool = require('../db/db');

class Blog {
  static async create(blogData) {
    const { title, blogimage, match_news, date, time, venue, squad_team1, squad_team2, imp_player, captain, fantasy_team, vice_captain, upload_by, tags, metadata, description, images, delete_by, playing_11_team1, playing_11_team2 } = blogData;
    const query = 'INSERT INTO blogs (title, blogimage, match_news, date, time, venue, squad_team1, squad_team2, imp_player, captain, fantasy_team, vice_captain, upload_by, tags, metadata, description, images, delete_by, playing_11_team1, playing_11_team2) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20) RETURNING *';
    const values = [title, blogimage, match_news, date, time, venue, squad_team1, squad_team2, imp_player, captain, fantasy_team, vice_captain, upload_by, tags, metadata, description, images, delete_by, playing_11_team1, playing_11_team2];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getAll() {
    const query = 'SELECT * FROM blogs ORDER BY id DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async getById(id) {
    const query = 'SELECT * FROM blogs WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async update(id, blogData) {
    const { title, blogimage, match_news, date, time, venue, squad_team1, squad_team2, imp_player, captain, fantasy_team, vice_captain, upload_by, tags, metadata, description, images, delete_by, playing_11_team1, playing_11_team2 } = blogData;
    const query = 'UPDATE blogs SET title = $1, blogimage = $2, match_news = $3, date = $4, time = $5, venue = $6, squad_team1 = $7, squad_team2 = $8, imp_player = $9, captain = $10, fantasy_team = $11, vice_captain = $12, upload_by = $13, tags = $14, metadata = $15, description = $16, images = $17, delete_by = $18, playing_11_team1 = $19, playing_11_team2 = $20 WHERE id = $21 RETURNING *';
    const values = [title, blogimage, match_news, date, time, venue, squad_team1, squad_team2, imp_player, captain, fantasy_team, vice_captain, upload_by, tags, metadata, description, images, delete_by, playing_11_team1, playing_11_team2, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM blogs WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

module.exports = Blog;
