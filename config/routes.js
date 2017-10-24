//Update the name of the controller below and rename the file.
const users = require("../controllers/users.js")
const trips = require("../controllers/trips.js")

module.exports = function(app){

  app.get('/', users.index);

  app.post('/users/login', users.login);

  app.post('/users/register', users.register);

  app.use(loggedUser);

  app.get('/users/:id/flights', trips.getAll);

  function loggedUser(req, res, next) {
    if (req.session.user) {
      console.log("move along");
      next();
    } else {
      console.log("redirected");
      res.redirect('/');
    }
  }

}
