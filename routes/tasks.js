'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../util/knex');
const bodyParser = require('body-parser');
const utils = require('../util/utils');


//Validation setup
const ev = require('express-validation');
const validations = require('../validations/tasks');

router.use(bodyParser.json());

// router.get('/tasks', (req, res, next) =>{
//
// });

router.get('/tasks/:id', (req, res, next) => {
    const taskID = Number.parseInt(req.params.id);
    if(!utils.isValidID(taskID)){
        next();
    } else {
        knex('tasks').where('id', taskID).then((task) => {

            res.json(task);

        }).catch((err) => {
            err.status = 500;
            console.error(err);
            knex.destroy();
            next(err);
        });
    }

});

router.post('/tasks', ev(validations.post), (req, res, next) => {
    console.log(req.body.description);

    knex('tasks').insert({
        description: req.body.description,
        priority: req.body.priority || 'med',
        completed_count: 0
    }).then(()=>{
        //how to get user/session ID????
        res.sendStatus(200);

    }).catch((err)=>{
        err.status = 500;
        console.error(err);
        knex.destroy();
        next(err);
    });


});

router.put('/tasks/:id', ev(validations.put), (req, res, next) => {

    const taskID = Number.parseInt(req.params.id);
    if(!utils.isValidID(taskID)){
        next();
    } else {
        knex('tasks').where('id', taskID).returning('*').update({
            description: req.body.description,
            priority: req.body.priority,
            completed_count: req.body.completed_count
        }).then((updatedTask)=>{
            res.json(updatedTask);
        }).catch((err)=> {
            err.status = 500;
            console.error(err);
            knex.destroy();
            next(err);
        });
    }
});

router.delete('/tasks/:id', (req, res, next) => {

    const taskID = Number.parseInt(req.params.id);
    if(!utils.isValidID(taskID)){
        next();
    } else {
        knex('tasks').where('id', taskID).del().then(()=>{
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
