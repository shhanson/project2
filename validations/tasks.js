const Joi = require('joi');

module.exports.post = {
  body: {
    description: Joi.string().label('description').required(),
    priority: Joi.string().label('priority'),
    completed_count: Joi.number().integer().label('completed count'),
  },

};

module.exports.put = {
  body: {
    description: Joi.string().label('description').required(),
    priority: Joi.string().label('priority'),
  },

};
