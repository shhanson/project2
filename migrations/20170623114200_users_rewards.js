exports.up = knex =>
    knex.schema.createTable('users_rewards', (table) => {
      table.integer('user_id').references('id').inTable('users').notNullable();
      table.integer('reward_id').references('id').inTable('rewards').notNullable();
      table.timestamps(true, true);
    });

exports.down = knex =>
    knex.schema.dropTable('users_rewards');
