module.exports = (sequelize, Sequelize) => {
  const Token = sequelize.define(
    "token",
    {
      access_token: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      expires: {
        type: Sequelize.DATE,
      },
      username: {
        type: Sequelize.STRING,
      },
      client_id: {
        type: Sequelize.INTEGER,
      },
      refresh_token: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  return Token;
};
