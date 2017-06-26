'use strict';
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('rewards').del()
        .then(function() {
            // Inserts seed entries
            return knex('rewards').insert([{
                    id: 8,
                    description: 'Starbucks Grande Frappuccino!',
                    value: 10
                },
                {
                    id: 9,
                    description: 'Item under $25 from Amazon Wishlist',
                    value: 30
                },
                {
                    id: 10,
                    description: 'Full mani/pedi!',
                    value: 50
                }
            ]);
        });
};
