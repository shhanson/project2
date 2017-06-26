'use strict';

exports.seed = knex =>
    knex('rewards').del()
    .then(() =>
        knex('rewards').insert([{
                id: 1,
                description: 'Starbucks Grande Frappuccino!',
                value: 10
            },
            {
                id: 2,
                description: 'Item under $25 from Amazon Wishlist',
                value: 30
            },
            {
                id: 3,
                description: 'Full mani/pedi!',
                value: 50
            }
        ]))
    .then(() =>
        knex.raw("SELECT setval('rewards_id_seq', (SELECT MAX(id) FROM rewards))"));
