/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('notification', function(table) {
      table.increments('id').primary(); // Auto-incrementing ID column
      table.string('email').notNullable(); // Email column
      table.string('whatsapp_number'); // WhatsApp number column
      table.string('name'); // Name column
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('notification'); // Drop the table if it exists
  };
  