'use strict';

const testUsers = require('../util/testusers');
const bcrypt = require('bcrypt');
const saltRounds = 11;

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(()=> {
            return bcrypt.hash(testUsers[0].password, saltRounds).then((digest) => {
                return knex('users').insert({
                    email: testUsers[0].email,
                    hashed_password: digest
                });
            })

        });
};
