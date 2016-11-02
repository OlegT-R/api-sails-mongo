/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passwordHash = require('password-hash');

module.exports = {
  create: function (req, res) {
    var params = {
      mail: req.param('mail'),
      password: req.param('password'),
      name: req.param('name')
    }
    var date = new Date().getTime().toString();
    params.token = passwordHash.generate(date + params.password);// generate token
    Users.create(params).exec(function (err, user) {
      if (err) {
        return res.send(500, "Server error. Cant create user " + err)
      } else {
        return res.send(user);
      }
    });
  },
  auth: function (req, res) {
    var params = {
      mail: req.param('mail'),
      password: req.param('password')
    }
    Users.findOneByMail(params.mail).exec(function (err, user) {
      if (!user || err) return res.send(500);
      if (passwordHash.verify(params.password, user.password)) {
        var date = new Date().getTime().toString();
        var token = passwordHash.generate(date + params.password);// generate token
        Users.update(user.id, {token: token}).exec(function (err, updated) { // update user token in db
          if (err) {
            return res.send(500, "Server error. User error " + err);
          } else {
            return res.send({name: updated[0].name, id: updated[0].id, token: updated[0].token});
          }
        });
      }
      else {
        return res.send(500, "Server error. Cant`t find user " + err);
      }
    });
  },
  logout: function (req, res) {
    Users.update({token: req.headers["x-token"]}, {token: ""}).exec(function (err, update) {
      if (!update || err) return res.send(400, "Server error. Logout error " + err);
      console.info("logout", update);
      res.send(200);
    });
  }
}

