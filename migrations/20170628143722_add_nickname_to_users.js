exports.up = knex =>
  knex.schema.table('users', (table) => {
    table.string('nickname', 16).notNullable().defaultTo('User');
  });


exports.down = knex =>
  knex.schema.table('users', (table) => {
    table.dropColumn('nickname');
  });
