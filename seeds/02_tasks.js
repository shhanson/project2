exports.seed = knex =>
    knex('tasks').del()
    .then(() =>
        knex('tasks').insert([{
          id: 1,
          description: 'React Native tutorial on codeacademy.',
          priority: 0,
          completed_count: 0,
        },
        {
          id: 2,
          description: 'Practice Vietnamese (duolingo).',
          priority: 1,
          completed_count: 0,
        },
        {
          id: 3,
          description: 'Floss!',
          priority: 2,
          completed_count: 0,
        },
        ]))
    .then(() =>
        knex.raw("SELECT setval('tasks_id_seq', (SELECT MAX(id) FROM tasks))"));
