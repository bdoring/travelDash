const knex = require("../db/knex.js");
const encryption = require('../config/encryption.js');

module.exports = {
  getAll: function (req, res) {
    res.send('getAll trips');
  }
}
