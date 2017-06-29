exports.up = knex =>
  knex.schema.table('tasks', (table) => {
    table.boolean('is_habit').notNullable().defaultTo(false);
  });


exports.down = knex =>
  knex.schema.table('tasks', (table) => {
    table.dropColumn('is_habit');
  });
