/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  return knex.schema.createTable("users", function(table) {
    table.increments('id');
    table.string('email');
    table.string('password');
    table.boolean('complete').defaultTo(false);
    table.integer('step').defaultTo(2);
    table.text('about_me');
    table.string('street');
    table.string('city');
    table.string('state'),
    table.integer('zip')
    table.date('birthday')
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
