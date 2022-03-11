module.exports = (app) => {
  const oauth = require("../controllers/oauth.controller.js");
  var router = require("express").Router();

  router.post("/token", oauth.createToken);
  router.post("/resource", oauth.accessResource);

  app.use("/oauth", router);
};
