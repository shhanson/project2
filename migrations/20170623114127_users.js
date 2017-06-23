'use strict';

exports.up = knex =>
    knex.schema.createTable('users', (table) => {
        table.increments('id');
        table.string('email').notNullable().unique();
        table.string('hashed_password').notNullable();
        table.timestamps(true, true);
    });

exports.down = knex =>
    knex.schema.dropTable('users');
