exports.up = knex =>
  knex.schema.table('rewards', (table) => {
    table.boolean('redeemed').notNullable().defaultTo(false);
  });


exports.down = knex =>
  knex.schema.table('rewards', (table) => {
    table.dropColumn('redeemed');
  });
