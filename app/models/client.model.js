module.exports = (sequelize, Sequelize) => {
  const Client = sequelize.define(
    "client",
    {
      client_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      client_secret: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
      instanceMethods: {
        generateHash(client_secret) {
          return bcrypt.hash(client_secret, bcrypt.genSaltSync(8));
        },
        validPassword(client_secret) {
          return bcrypt.compare(client_secret, this.client_secret);
        },
      },
    }
  );
  return Client;
};
