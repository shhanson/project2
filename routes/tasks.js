const express = require('express');

const router = express.Router();
const knex = require('../util/knex');
const bodyParser = require('body-parser');
const utils = require('../util/utils');


// Validation setup
const ev = require('express-validation');
const validations = require('../validations/tasks');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: false,
}));


router.get('/tasks/:id', (req, res, next) => {
  const taskID = Number.parseInt(req.params.id);
  if (!utils.isValidID(taskID)) {
    next();
  } else {
    knex('tasks').where('id', taskID).then((task) => {
      res.json(task);
    }).catch((err) => {
      console.error(err);
      knex.destroy();
      next(err);
    });
  }
});

router.get('/tasks/add', (req, res, next) => {
  res.render('pages/addTask', {
    title: 'Add a Task',
    leftNavbar: req.session.id,
    script: '/js/addTask.js',
  });
});

router.post('/tasks', ev(validations.post), (req, res, next) => {
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
      // res.sendStatus(200);
    }).catch((err) => {
      console.error(err);
      knex.destroy();
      next(err);
    });
    // res.sendStatus(200);
  }).catch((err) => {
    console.error(err);
    knex.destroy();
    next(err);
  });
});

router.put('/tasks/:id', ev(validations.put), (req, res, next) => {
  const taskID = Number.parseInt(req.params.id);
  if (!utils.isValidID(taskID)) {
    next();
  } else {
    knex('tasks').where('id', taskID).returning('*').update({
      description: req.body.description,
      priority: req.body.priority,
      completed_count: req.body.completed_count,
    })
    .then((updatedTask) => {
            // Render user page-- how to get user ID???
      res.json(updatedTask);
    })
    .catch((err) => {
      console.error(err);
      knex.destroy();
      next(err);
    });
  }
});

router.delete('/tasks/:id', (req, res, next) => {
  const taskID = Number.parseInt(req.params.id);
  if (!utils.isValidID(taskID)) {
    next();
  } else {
    knex('users_tasks').where('task_id', taskID).del().then(() => {
      knex('tasks').where('id', taskID).del().then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error(err);
        knex.destroy();
        next(err);
      });
    })
    .catch((err) => {
      console.error(err);
      knex.destroy();
      next(err);
    });
  }
});

module.exports = router;
