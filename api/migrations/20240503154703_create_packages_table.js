const pool = require('../db/db');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('packages', function(table) {
    table.increments('id').primary();
    table.string('title');
    table.integer('price');
    table.specificType('benefit', 'VARCHAR(255)[]');
    table.string('time');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('packages');
};
