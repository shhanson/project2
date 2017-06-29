const express = require('express');

const router = express.Router();
const knex = require('../util/knex');
const bodyParser = require('body-parser');
const utils = require('../util/utils');

const HABIT_COUNT = 100;


// Validation setup
const ev = require('express-validation');
const validations = require('../validations/tasks');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: false,
}));

router.get('/tasks/:id', (req, res, next) => {
  const taskID = Number.parseInt(req.params.id);
  if (!utils.isValidID(taskID) || req.session.id === undefined) {
    next();
  } else {
    knex('users_tasks').first().where('task_id', taskID).then((result) => {
      const userID = result.user_id;
      if (userID === req.session.id) {
        knex('tasks').where('id', taskID).then((task) => {
          res.json(task);
        }).catch((err) => {
          console.error(err);
          next(err);
        });
      } else {
        const err = new Error('Not authorized!');
        err.status = 401;
        next(err);
      }
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
  }
});

router.get('/tasks/add', (req, res, next) => {
  if (req.session.id) {
    res.render('pages/addTask', {
      title: 'Add a Task',
      leftNavbar: req.session.id,
      script: '/js/addTask.js',
    });
  } else {
    const err = new Error('Not authorized!');
    err.status = 401;
    next(err);
  }
});

router.post('/tasks', ev(validations.post), (req, res, next) => {
  if (req.session.id) {
    knex('tasks').returning('id').insert({
      description: req.body.description,
      priority: req.body.priority || 'med',
      completed_count: 0,
    }).then((taskID) => {
      knex('users_tasks').insert({
        user_id: req.session.id,
        task_id: taskID[0],
      }).then(() => {
        res.json(req.session.id);
      }).catch((err) => {
        console.error(err);
        next(err);
      });
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
  } else {
    const err = new Error('Not authorized!');
    err.status = 401;
    next(err);
  }
});

router.put('/tasks/increment/:id', (req, res, next) => {
  const taskID = Number.parseInt(req.params.id);
  if (!utils.isValidID(taskID) || req.session.id === undefined) {
    next();
  } else {
    knex('users_tasks').first().where('task_id', taskID).then((result) => {
      const userID = result.user_id;
      if (userID === req.session.id) {
        knex('tasks').increment('completed_count', 1).where('id', taskID).returning('completed_count')
        .then((count) => {
          if (count[0] === HABIT_COUNT) {
            knex('tasks').where('id', taskID).update('is_habit', true)
            .catch((err) => {
              console.error(err);
              next(err);
            });
          }
          res.json(count[0]);
        })
        .catch((err) => {
          console.error(err);
          next(err);
        });
      } else {
        const err = new Error('Not authorized!');
        err.status = 401;
        next(err);
      }
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
  }
});

router.put('/tasks/edit/:id', ev(validations.put), (req, res, next) => {
  const taskID = Number.parseInt(req.params.id);
  if (!utils.isValidID(taskID) || req.session.id === undefined) {
    next();
  } else {
    knex('users_tasks').where('task_id', taskID).first().then((result) => {
      const userID = result.user_id;
      if (userID === req.session.id) {
        knex('tasks').where('id', taskID).update({
          description: req.body.description,
          priority: req.body.priority,
          completed_count: undefined,
        }).then(() => {
          res.sendStatus(200);
        })
        .catch((err) => {
          console.error(err);
          next(err);
        });
      } else {
        const err = new Error('Not authorized!');
        err.status = 401;
        next(err);
      }
    })
    .catch((err) => {
      console.error(err);
      next();
    });
  }
});


router.put('/tasks/reset/:id', (req, res, next) => {
  const taskID = Number.parseInt(req.params.id);
  if (!utils.isValidID(taskID) || req.session.id === undefined) {
    next();
  } else {
    knex('users_tasks').where('task_id', taskID).first().then((result) => {
      const userID = result.user_id;
      if (userID === req.session.id) {
        knex('tasks').where('id', taskID).update({
          completed_count: 0,
          is_habit: false,
        }).then(() => {
          res.sendStatus(200);
        })
        .catch((err) => {
          console.error(err);
          next(err);
        });
      } else {
        const err = new Error('Not authorized!');
        err.status = 401;
        next(err);
      }
    })
    .catch((err) => {
      console.error(err);
      next();
    });
  }
});

router.delete('/tasks/:id', (req, res, next) => {
  const taskID = Number.parseInt(req.params.id);
  if (!utils.isValidID(taskID) || req.session.id === undefined) {
    next();
  } else {
    knex('users_tasks').where('task_id', taskID).first().then((result) => {
      const userID = result.user_id;
      if (req.session.id === userID) {
        knex('users_tasks').where('task_id', taskID).del().then(() => {
          knex('tasks').where('id', taskID).del().then(() => {
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
      } else {
        const err = new Error('Not authorized!');
        err.status = 401;
        next(err);
      }
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
  }
});

module.exports = router;
