/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('contact_us', function(table) {
      table.increments('id').primary(); // Auto-incrementing ID column
      table.string('full_name').notNullable(); // Varchar column for full name, not nullable
      table.string('email').notNullable(); // Varchar column for email, not nullable
      table.string('phone_number'); // Varchar column for phone number
      table.string('message', 1000); // Varchar column for message with a maximum length of 100 characters
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('contact_us'); // Drop the table if it exists
  };
  