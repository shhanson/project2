exports.up = knex =>
  knex.schema.table('users', (table) => {
    table.boolean('is_admin').notNullable().defaultTo(false);
  });


exports.down = knex =>
  knex.schema.table('users', (table) => {
    table.dropColumn('is_admin');
  });
