/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function (req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  //console.info("header", req.headers["x-token"]);//get security token
  if (req.headers["x-token"] === undefined) {
    return res.forbidden('You are not permitted to perform this action.');
  }

  Users.findOneByToken(req.headers["x-token"]).exec(function (err, user) { // find user by token
    if (err) {
      res.forbidden('You are not permitted to perform this action.');
    } else {
      console.info("user", user);
      if (user.token !== req.headers["x-token"]) { //check token
        res.forbidden('You are not permitted to perform this action.');
      } else return next();
    }
  });
  //if (req.session.authenticated) {
  // return next();
  // }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  //return res.forbidden('You are not permitted to perform this action.');
};
