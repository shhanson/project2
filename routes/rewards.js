'use strict';


const express = require('express');
const router = express.Router();
const knex = require('../util/knex');
const bodyParser = require('body-parser');


//Validation setup
const ev = require('express-validation');
const validations = require('../validations/users');

router.get('/rewards', (req, res, next) =>{

});

router.get('/rewards/:id', (req, res, next) => {

});

router.post('/rewards', (req, res, next) => {

});

router.put('/rewards/:id', (req, res, next) => {

});

router.delete('/rewards/:id', (req, res, next) => {

});

module.exports = router;
