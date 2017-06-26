'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../util/knex');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const utils = require ('../util/utils');

//Validation setup
const ev = require('express-validation');
const validations = require('../validations/users');

const saltRounds = 11;

router.use(bodyParser.json());

function getTasksForUser(userID){

}

function getRewardsForUser(userID){

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
    if(!utils.isValidID(userID)){
        next();
    } else {
        knex('users').where('id', userID).then((user)=>{
            //call getTasks and getRewards
            res.render('pages/user', {
                userData: user
            });

        }).catch((err)=>{
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
        }).then(()=>{
            res.render('pages/login');
            // res.sendStatus(200);
        }).catch((err) => {
            //next(utils.knexError(knex, err));
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
            if(matched){
                req.session.id = userID;
                res.render('pages/user',{
                    userData: user
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
    }).catch((err)=>{
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
    if(!utils.isValidID(userID)){
        next();
    } else {
        knex('users').where('id', userID).del().then(() => {
            res.sendStatus(200);
        }).catch((err)=> {
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
