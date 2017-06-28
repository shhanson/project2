const Joi = require('joi');

module.exports.login_post = {
  body: {
    email: Joi.string().label('email').required().email()
    .trim(),
    password: Joi.string().label('password').required()
    .min(8),
  },
};

module.exports.reg_post = {
  body: {
    email: Joi.string().label('email').required().email()
    .trim(),
    password: Joi.string().label('password').required()
    .min(8),
    vpassword: Joi.ref('password'),
    nickname: Joi.string().label('nickname').max(16),
  },
};
