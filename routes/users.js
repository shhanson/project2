const express = require('express');

const router = express.Router();
const knex = require('../util/knex');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const utils = require('../util/utils');

// Validation setup
const ev = require('express-validation');
const validations = require('../validations/users');

const saltRounds = 11;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: false,
}));

function getTasksForUser(userID) {
  return knex('users_tasks').join('tasks', 'users_tasks.task_id', 'tasks.id').where('users_tasks.user_id', userID).orderBy('tasks.priority', 'desc');
}

function getRewardsForUser(userID) {
  return knex('users_rewards').join('rewards', 'users_rewards.reward_id', 'rewards.id').where('users_rewards.user_id', userID).orderBy('rewards.value');
}

function getTasksRewardsForUser(userID) {
  return Promise.all([
    getTasksForUser(userID),
    getRewardsForUser(userID),
  ]).then(result => result);
}

function deleteUserFromJoinTables(userID) {
  return Promise.all([
    knex('users_tasks').where('user_id', userID).del(),
    knex('users_rewards').where('user_id', userID).del(),
  ]);
}

// GET all users (superuser only)
router.get('/users', (req, res, next) => {
  if (req.session.isAdmin) {
    knex('users').then((allUsers) => {
      res.render('pages/users', {
        title: 'Hello admin!',
        allUserData: allUsers,
        leftNavbar: req.session.id,
        script: '/js/adminUsers.js',
      });
    }).catch((err) => {
      console.error(err);
      next(err);
    });
  } else {
    const err = new Error('Not authorized!');
    err.status = 401;
    next(err);
  }
});


// GET a user with the given ID
router.get('/users/:id', (req, res, next) => {
  const userID = Number.parseInt(req.params.id);

  if (utils.isValidID(userID) && userID === req.session.id) {
    Promise.all([
      getTasksRewardsForUser(userID),
      knex('users').returning('nickname').where('id', userID),
    ]).then((result) => {
      res.render('pages/user', {
        title: `Hello, ${result[1][0].nickname}!`,
        userTasks: result[0][0],
        userRewards: result[0][1],
        leftNavbar: userID,
        script: '/js/user.js',
      });
    }).catch((err) => {
      console.error(err);
      next(err);
    });
  } else {
    const err = new Error('Not authorized!');
    err.status = 401;
    next(err);
  }
});

// POST a new user (new user registration)
router.post('/users', ev(validations.reg_post), (req, res, next) => {
  bcrypt.hash(req.body.password, saltRounds).then((digest) => {
    knex('users').insert({
      email: req.body.email,
      hashed_password: digest,
      nickname: req.body.nickname || 'Goal-getter',
    }).then(() => {
      // res.redirect('/login');
      res.render('pages/login', {
        title: 'Login to tinyhabits',
        message: 'You are registered! Login to continue.',
      });
    }).catch((err) => {
      console.error(err);
      res.render('pages/register', {
        title: 'New User Registration',
        message: 'That email is already registered!',
      });
      // next(err);
    });
  }).catch((err) => {
    console.error(err);
    next(err);
  });
});


// POST for a new session (registered user login)
router.post('/session', ev(validations.login_post), (req, res, next) => {
  knex('users').where('email', req.body.email).first().then((user) => {
    const storedPassword = user.hashed_password;
    const userID = user.id;

    bcrypt.compare(req.body.password, storedPassword).then((matched) => {
      if (matched) {
        req.session.id = userID;
        req.session.isAdmin = user.is_admin;
        res.redirect(`/users/${userID}`);
      } else {
      // wrong password
        console.error('Wrong email or password!');
        res.render('pages/login', {
          title: 'Login to tinyhabits',
          message: 'Wrong email or password!',
        });
      }
    }).catch((err) => {
      next(err);
    });
  })
  .catch((err) => {
    console.error('Wrong email or password!');
    res.render('pages/login', {
      title: 'Login to tinyhabits',
      message: 'Wrong email or password!',
    });
  });
});

// DELETE a user (superuser) only
router.delete('/users/:id', (req, res, next) => {
  if (req.session.isAdmin) {
    const userID = Number.parseInt(req.params.id);

    if (!utils.isValidID(userID)) {
      next();
    } else {
      deleteUserFromJoinTables(userID).then(() => {
        knex('users').where('id', userID).del().then(() => {
          res.sendStatus(200);
        })
        .catch((err) => {
          console.error(err);
          next(err);
        });
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
    }
  } else {
    const err = new Error('Not authorized!');
    err.status = 401;
    next(err);
  }
});

router.get('/users/manage/:id', (req, res, next) => {
  const userID = Number.parseInt(req.params.id);

  if (utils.isValidID(userID) && userID === req.session.id) {
    getTasksRewardsForUser(userID).then((result) => {
      res.render('pages/manage', {
        title: 'Edit Tasks and Rewards',
        userTasks: result[0],
        userRewards: result[1],
        leftNavbar: userID,
        script: '/js/manage.js',
      });
    }).catch((err) => {
      console.error(err);
      next(err);
    });
  } else {
    const err = new Error('Not authorized!');
    err.status = 401;
    next(err);
  }
});

// LOGOUT user (delete session)
router.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

module.exports = router;
