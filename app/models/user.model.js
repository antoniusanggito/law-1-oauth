module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    grant_type: {
      type: Sequelize.STRING,
    },
    client_id: {
      type: Sequelize.STRING,
    },
    client_secret: {
      type: Sequelize.STRING,
    },
  });
  return User;
};
