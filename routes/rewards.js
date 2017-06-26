'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../util/knex');
const bodyParser = require('body-parser');
const utils = require('../util/utils');


//Validation setup
const ev = require('express-validation');
const validations = require('../validations/rewards');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));


router.get('/rewards/:id', (req, res, next) => {
    const rewardID = req.params.id;
    if (!utils.isValidID(rewardID)) {
        next();
    } else {
        knex('rewards').where('id', rewardID).then((reward) => {
            res.json(reward);
        }).catch((err) => {
            err.status = 500;
            console.error(err);
            knex.destroy();
            next(err);
        })
    }

});

router.post('/rewards', ev(validations.post), (req, res, next) => {
    console.log(req.body.description);
    knex('rewards').insert({
        description: req.body.description,
        value: req.body.value
    }).then(() => {
        //Render user page-- how to get user ID???
        res.sendStatus(200);
    }).catch((err) => {
        err.status = 500;
        console.error(err);
        knex.destroy();
        next(err);
    });


});

router.put('/rewards/:id', ev(validations.put), (req, res, next) => {
    const rewardID = Number.parseInt(req.params.id);
    if (!utils.isValidID(rewardID)) {
        next();
    } else {
        knex('rewards').where('id', rewardID).returning('*').update({
            description: req.body.description,
            value: req.body.value
        }).then((updatedReward) => {

        //Render user page-- how to get user ID???
            res.json(updatedReward);
        }).catch((err) => {
            err.status = 500;
            console.error(err);
            knex.destroy();
            next(err);
        });
    }
});

router.delete('/rewards/:id', (req, res, next) => {
    const rewardID = Number.parseInt(req.params.id);
    if (!utils.isValidID(rewardID)) {
        next();
    } else {
        knex('rewards').where('id', rewardID).del().then(() => {
            res.sendStatus(200);
        }).catch((err) => {
            err.status = 500;
            console.error(err);
            knex.destroy();
            next(err);
        });
    }

});

module.exports = router;
