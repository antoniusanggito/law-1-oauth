module.exports = (app) => {
  const users = require("../controllers/user.controller.js");
  var router = require("express").Router();

  router.post("/token", users.create);
  router.post("/resource", users.findAll);

  app.use("/oauth", router);
};
