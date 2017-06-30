

const testUsers = require('../util/testusers');
const bcrypt = require('bcrypt');

const saltRounds = 11;

exports.seed = knex =>
    knex('users').del()
    .then(() =>
        bcrypt.hash(testUsers[0].password, saltRounds).then(digest =>
            knex('users').insert({
              email: testUsers[0].email,
              hashed_password: digest,
              is_admin: true,
            }).then(() =>
                knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))"))));
