

const Joi = require('joi');

module.exports.post = {

  body: {
    description: Joi.string().label('description').required(),
    value: Joi.number().integer().label('value').required(),
  },

};

module.exports.put = {

  body: {
    description: Joi.string().label('description').required(),
    value: Joi.number().integer().label('value').required(),
  },

};
