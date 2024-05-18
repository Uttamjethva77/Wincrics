/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('blogs', function(table) {
    table.increments('id').primary();
    table.string('title', 2000);
    table.string('blogimage', 2000);
    table.string('match_news', 2000);
    table.date('date');
    table.time('time'); 
    table.string('venue', 2000);
    table.specificType('squad_team1', 'VARCHAR(1000)[]');
    table.specificType('squad_team2', 'VARCHAR(1000)[]');
    table.specificType('imp_player', 'VARCHAR(2000)[]');
    table.specificType('captain', 'VARCHAR(2000)[]');
    table.specificType('fantasy_team', 'VARCHAR(2000)[]');
    table.specificType('vice_captain', 'VARCHAR(2000)[]');
    table.integer('upload_by').references('id').inTable('admin');
    table.specificType('tags', 'VARCHAR(2000)[]');
    table.string('metadata', 2000);
    table.text('description');
    table.specificType('images', 'VARCHAR(2000)[]');
    table.boolean('deleted_by').defaultTo(false); // Set default value to false
    table.specificType('playing_11_team1', 'VARCHAR(1000)[]');
    table.specificType('playing_11_team2', 'VARCHAR(1000)[]');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('blogs');
};
