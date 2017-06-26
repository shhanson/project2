'use strict';

exports.seed = knex =>
    knex('tasks').del()
    .then(() =>
        knex('tasks').insert([{
                id: 1,
                description: 'React Native tutorial on codeacademy.',
                priority: 'low',
                completed_count: 0
            },
            {
                id: 2,
                description: 'Practice Vietnamese (duolingo).',
                priority: 'med',
                completed_count: 0
            },
            {
                id: 3,
                description: 'Floss!',
                priority: 'high',
                completed_count: 0
            }
        ]))
    .then(() =>
        knex.raw("SELECT setval('tasks_id_seq', (SELECT MAX(id) FROM tasks))"));
