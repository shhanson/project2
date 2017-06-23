'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../util/knex');
const bodyParser = require('body-parser');


//Validation setup
const ev = require('express-validation');
const validations = require('../validations/users');

router.get('/tasks', (req, res, next) =>{

});

router.get('/tasks/:id', (req, res, next) => {

});

router.post('/tasks', (req, res, next) => {

});

router.put('/tasks/:id', (req, res, next) => {

});

router.delete('/tasks/:id', (req, res, next) => {

});

module.exports = router;
