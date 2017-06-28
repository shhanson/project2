const express = require('express');

const router = express.Router();
const knex = require('../util/knex');
const bodyParser = require('body-parser');
const utils = require('../util/utils');


// Validation setup
const ev = require('express-validation');
const validations = require('../validations/rewards');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: false,
}));


router.get('/rewards/:id', (req, res, next) => {
  const rewardID = req.params.id;
  if (!utils.isValidID(rewardID) || req.session.id === undefined) {
    next();
  } else {
    knex('users_rewards').where('reward_id', rewardID).first().then((result) => {
      const userID = result.user_id;
      if (userID === req.session.id) {
        knex('rewards').where('id', rewardID).then((reward) => {
          res.json(reward);
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

router.get('/rewards/add', (req, res, next) => {
  if (req.session.id) {
    res.render('pages/addReward', {
      title: 'Add a Reward',
      leftNavbar: req.session.id,
      script: '/js/addReward.js',
    });
  } else {
    const err = new Error('Not authorized!');
    err.status = 401;
    next(err);
  }
});

router.post('/rewards', ev(validations.post), (req, res, next) => {
  if (req.session.id) {
    knex('rewards').returning('id').insert({
      description: req.body.description,
      value: req.body.value,
    }).then((rewardID) => {
      knex('users_rewards').insert({
        user_id: req.session.id,
        reward_id: rewardID[0],
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

router.put('/rewards/redeem/:id', (req, res, next) => {
  const rewardID = Number.parseInt(req.params.id);
  if (!utils.isValidID(rewardID) || req.session.id === undefined) {
    next();
  } else {
    knex('users_rewards').first().where('reward_id', rewardID).then((result) => {
      const userID = result.user_id;
      if (req.session.id === userID) {
        knex('rewards').where('id', rewardID).update({
          description: undefined,
          value: undefined,
          redeemed: true,
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
      next(err);
    });
  }
});

router.put('/rewards/edit/:id', ev(validations.put), (req, res, next) => {
  const rewardID = Number.parseInt(req.params.id);
  if (!utils.isValidID(rewardID) || req.session.id === undefined) {
    next();
  } else {
    knex('users_rewards').first().where('reward_id', rewardID).then((result) => {
      const userID = result.user_id;
      if (req.session.id === userID) {
        knex('rewards').where('id', rewardID).update({
          description: req.body.description,
          value: req.body.value,
        })
        .then(() => {
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
      next(err);
    });
  }
});

router.delete('/rewards/:id', (req, res, next) => {
  const rewardID = Number.parseInt(req.params.id);
  if (!utils.isValidID(rewardID) || req.session.id === undefined) {
    next();
  } else {
    knex('users_rewards').where('reward_id', rewardID).first().then((result) => {
      const userID = result.user_id;
      if (userID === req.session.id) {
        knex('users_rewards').where('reward_id', rewardID).del().then(() => {
          knex('rewards').where('id', rewardID).del().then(() => {
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
