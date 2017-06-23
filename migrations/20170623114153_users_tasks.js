'use strict';

exports.up = knex =>
    knex.schema.createTable('users_tasks', (table) => {
        table.integer('user_id').references('id').inTable('users');
        table.integer('task_id').references('id').inTable('tasks');
        table.timestamps(true, true);
    });

exports.down = knex =>
    knex.schema.dropTable('users_tasks');
