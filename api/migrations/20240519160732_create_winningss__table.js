/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('winnings', function(table) {
      table.increments('id').primary(); // Auto-incrementing ID column
      table.string('images'); // Varchar column for images
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('winnings'); // Drop the table if it exists
  };
  