'use strict';

exports.up = knex =>
    knex.schema.createTable('rewards', (table) => {
        table.increments('id');
        table.string('description', 50).notNullable().defaultTo('');
        table.integer('value').notNullable().defaultTo(15);
        table.timestamps(true, true);
    });

exports.down = knex =>
    knex.schema.dropTable('rewards');
