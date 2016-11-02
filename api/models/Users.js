/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var passwordHash = require('password-hash');
module.exports = {
  autoPk: true,
  attributes: {
    mail: {type: 'email', required: true, unique: true},
    password: {type: 'string', required: true, minLength: 6},
    name: {type: 'string', required: true},
    token: {type: 'string'},
  },
  beforeCreate: function (values, cb) {
    var mainPass = passwordHash.generate(values.password);
    values.password = mainPass;
    cb();
  }
};


