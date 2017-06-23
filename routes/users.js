'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../util/knex');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

//Validation setup
const ev = require('express-validation');
const validations = require('../validations/users');

const saltRounds = 11;

router.get('/users', (req, res, next) =>{

});

router.get('/users/:id', (req, res, next) =>{

});

router.post('/users', (req, res, next) => {

});

router.post('/session', (req, res, next) => {

});


router.delete('/users/:id', (req, res, next) => {

});

router.delete('/session', (req, res) => {

});

module.exports = router;
