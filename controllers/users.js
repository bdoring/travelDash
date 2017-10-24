const knex = require("../db/knex.js");
const encryption = require('../config/encryption.js');

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION
  index: function(req, res) {
    if (req.session.message) {
      res.send(req.session.message);
    } else {
      res.send("Hello");
    }

  },

  login: function(req, res) {
    knex('users')
      .where('email', req.body.email)
      .then((encryptedUser) => {
        encryption.check(req.body, encryptedUser)
          .then((isValid) => {
            if (isValid) {
              req.session.name = encryptedUser.name;
              res.redirect(`/trips/${encryptedUser.id}`);
            } else {
              req.sessions.message = "Invalid username or password. Please try again.";
              res.redirect('/');
            }
          })
      })
      .catch((err) => {
        console.log(err);
      })
  },

  register: function (req, res) {

    let newUser = {
      name: req.body.name,
      email: req.body.name,
      password: req.body.password
    }

    encrypted.hash(newUser)
      .then((newEncryptedUser) => {
        knex('users')
          .insert(newEncryptedUser, '*')
          .then((newUser) => {
            console.log(newUser);
            req.session.id = newUser.id;
            res.redirect(`/users/${newUser.id}/flights`)
          })
          .catch((err) => {
            console.log(err);
          })
      })
      .catch((err) => {
        console.log(err);
      });

  }
}
