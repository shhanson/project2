'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../util/knex');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const utils = require('../util/utils');

//Validation setup
const ev = require('express-validation');
const validations = require('../validations/users');

const saltRounds = 11;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));


function getTasksForUser(userID) {
    return knex('users_tasks').join('tasks', 'users_tasks.task_id', 'tasks.id').where('users_tasks.user_id', userID);
}

function getRewardsForUser(userID) {
    return knex('users_rewards').join('rewards', 'users_rewards.reward_id', 'rewards.id').where('users_rewards.user_id', userID);
}

function getTasksRewardsForUser(userID) {
    return Promise.all([
        getTasksForUser(userID),
        getRewardsForUser(userID)
    ]).then((result) => {
        return result;
    });
}

function deleteUserFromJoinTables(userID) {
    return Promise.all([
        knex('users_tasks').where('user_id', userID).del(),
        knex('users_rewards').where('user_id', userID).del()
    ]);
}

//GET all users (superuser only)
router.get('/users', (req, res, next) => {
    knex('users').then((allUsers) => {
        res.render('pages/users', {
            allUserData: allUsers
        });
    }).catch((err) => {
        err.status = 500;
        console.error(err);
        knex.destroy();
        next(err);
    });
});


//GET a user with the given ID
router.get('/users/:id', (req, res, next) => {
    const userID = Number.parseInt(req.params.id);
    if (!utils.isValidID(userID)) {
        next();
    } else {
        getTasksRewardsForUser(userID).then((result) => {

            res.render('pages/user', {
                userTasks: result[0],
                userRewards: result[1]
            });

        }).catch((err) => {
            err.status = 500;
            console.error(err);
            knex.destroy();
            next(err);
        })
    }
});

//POST a new user (new user registration)
router.post('/users', ev(validations.post), (req, res, next) => {

    bcrypt.hash(req.body.password, saltRounds).then((digest) => {
        knex('users').insert({
            email: req.body.email,
            hashed_password: digest
        }).then(() => {
            res.render('pages/login');
        }).catch((err) => {
            err.status = 500;
            console.error(err);
            knex.destroy();
            next(err);
        })

    }).catch((err) => {
        console.error(err);
        next(err);
    });
});


//POST for a new session (registered user login)
router.post('/session', ev(validations.post), (req, res, next) => {

    knex('users').where('email', req.body.email).first().then((user) => {
        const storedPassword = user.hashed_password;
        const userID = user.id;

        bcrypt.compare(req.body.password, storedPassword).then((matched) => {
            if (matched) {
                req.session.id = userID;

                getTasksRewardsForUser(userID).then((result) => {

                    res.render('pages/user', {
                        userData: result[0],
                        userTasks: result[1],
                        userRewards: result[2]
                    });

                });


            } else {
                //wrong password
                console.error("Wrong email or password!");
                const err = new Error();
                err.status = 401;
                next(err);
            }
        }).catch((err) => {
            // err.status = 500;
            // console.error("Wrong email or password!");
            next(err);
        });
    }).catch((err) => {
        //email not found
        err.status = 401;
        console.error("Wrong email or password!")
        knex.destroy();
        next(err);
    });
});

//DELETE a user (superuser) only
router.delete('/users/:id', (req, res, next) => {
    const userID = Number.parseInt(req.params.id);
    if (!utils.isValidID(userID)) {
        next();
    } else {
        deleteUserFromJoinTables(userID).then(() => {
            knex('users').where('id', userID).del().then(() => {
                res.sendStatus(200);
            }).catch((err) => {
                err.status = 500;
                console.error(err);
                knex.destroy();
                next(err);
            });
        }).catch((err) => {
            err.status = 500;
            console.error(err);
            knex.destroy();
            next(err);
        });

    }
});

//LOGOUT (delete session)
router.delete('/session', (req, res) => {
    req.session = null;
    res.render('pages/login');
});

module.exports = router;
