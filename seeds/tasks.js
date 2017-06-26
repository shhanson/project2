'use strict';

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('tasks').del()
        .then(function() {
            // Inserts seed entries
            return knex('tasks').insert([{
                    id: 8,
                    description: 'React Native tutorial on codeacademy.',
                    priority: 'low',
                    completed_count: 0
                },
                {
                    id: 9,
                    description: 'Practice Vietnamese (duolingo).',
                    priority: 'med',
                    completed_count: 0
                },
                {
                    id: 10,
                    description: 'Floss!',
                    priority: 'high',
                    completed_count: 0
                }
            ]);
        });
};
