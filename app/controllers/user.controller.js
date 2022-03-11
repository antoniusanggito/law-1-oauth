const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const user = {
    username: req.body.username,
    password: req.body.password,
    grant_type: req.body.grant_type,
    client_id: req.body.client_id,
    client_secret: req.body.client_secret,
  };

  User.create(user).then((data) => {
    res.send(data).catch((err) => {
      res.status(401).send({
        error: "invalid_request",
        error_description: "ada kesalahan masbro!",
      });
    });
  });
};
