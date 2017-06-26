exports.seed = knex =>
    knex('users_tasks').del()
        .then(() =>
            knex('users_tasks').insert([{
              user_id: 1,
              task_id: 1,
            },
            {
              user_id: 1,
              task_id: 2,
            },
            {
              user_id: 1,
              task_id: 3,
            },
            ]));
