const db = require("../models");
const User = db.users;
const Client = db.clients;
const Token = db.tokens;
const { v4: uuidv4 } = require("uuid");

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

exports.createToken = (req, res) => {
  if (!req.body) {
    res.status(401).send({
      error: "invalid_request",
      error_description: "ada kesalahan masbro!",
    });
    return;
  }

  const client_id = req.body.client_id;
  const client_secret = req.body.client_secret;
  const username = req.body.username;
  const password = req.body.password;

  Client.findByPk(client_id)
    .then((dataClient) => {
      if (dataClient) {
        if (client_secret == dataClient.dataValues.client_secret) {
          User.findByPk(username)
            .then((dataUser) => {
              if (dataUser) {
                if (password == dataUser.dataValues.password) {
                  var fiveMinutesLater = new Date();
                  fiveMinutesLater.setMinutes(
                    fiveMinutesLater.getMinutes() + 5
                  );
                  const token = {
                    access_token: makeid(40),
                    expires: fiveMinutesLater,
                    username: dataUser.dataValues.username,
                    client_id: dataClient.dataValues.client_id,
                    refresh_token: makeid(40),
                  };
                  console.log(token);

                  Token.create(token)
                    .then((data) => res.send(data))
                    .catch((err) => {
                      res.status(401).send({
                        error: "invalid_request",
                        error_description: "token ada kesalahan masbro!",
                      });
                    });
                } else {
                  res.status(401).send({
                    error: "invalid_request",
                    error_description: "pw ada kesalahan masbro!",
                  });
                }
              }
            })
            .catch((err) => {
              res.status(401).send({
                error: "invalid_request",
                error_description: "user ada kesalahan masbro!",
              });
            });
        } else {
          res.status(401).send({
            error: "invalid_request",
            error_description: "secret ada kesalahan masbro!",
          });
        }
      }
    })
    .catch((err) => {
      res.status(401).send({
        error: "invalid_request",
        error_description: "client ada kesalahan masbro!",
      });
    });
};

exports.accessResource = (req, res) => {
  const npm = "1906292912";
  const accessToken = req.headers.bearer;
  Token.findByPk(accessToken)
    .then((dataToken) => {
      if (dataToken) {
        if (dataToken.dataValues.expires.getTime() > new Date().getTime()) {
          User.findByPk(dataToken.dataValues.username)
            .then((dataUser) => {
              if (dataUser) {
                res.send({
                  access_token: dataToken.dataValues.access_token,
                  client_id: dataToken.dataValues.client_id,
                  user_id: dataUser.dataValues.user_id,
                  full_name: dataUser.dataValues.full_name,
                  npm: npm,
                  expires: dataToken.dataValues.expires,
                  refresh_token: dataToken.dataValues.refresh_token,
                });
              }
            })
            .catch((err) => {
              res.status(401).send({
                error: "invalid_token",
                error_description: "Token Salah masbro",
              });
            });
        } else {
          res.status(401).send({
            error: "invalid_token",
            error_description: "Token Salah masbro",
          });
        }
      } else {
        res.status(401).send({
          error: "invalid_token",
          error_description: "Token Salah masbro",
        });
      }
    })
    .catch((err) => {
      res.status(401).send({
        error: "invalid_token",
        error_description: "Token Salah masbro",
      });
    });
};
