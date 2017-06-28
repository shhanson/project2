

exports.up = knex =>
    knex.schema.createTable('tasks', (table) => {
      table.increments('id');
      table.string('description', 50).notNullable().defaultTo('').unique();
      table.string('priority').notNullable().defaultTo('med');
      table.integer('completed_count').notNullable().defaultTo(0);
      table.timestamps(true, true);
    });

exports.down = knex =>
    knex.schema.dropTable('tasks');
