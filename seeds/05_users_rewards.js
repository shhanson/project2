'use strict';

exports.seed = knex =>
    knex('users_rewards').del()
    .then(() =>
        knex('users_rewards').insert([{
                user_id: 1,
                reward_id: 1
            },
            {
                user_id: 1,
                reward_id: 2
            },
            {
                user_id: 1,
                reward_id: 3
            }
        ]));
