require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./app/models");

db.sequelize.sync();
// Development
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/first", (req, res) => {
  res.json({ message: "First Response" });
});

// // Get all players
// app.get("/player", async (req, res) => {
//   try {
//     const allPlayers = await pool.query("SELECT * FROM player;");
//     res.json(allPlayers.rows);
//   } catch (error) {
//     console.error(error.message);
//   }
// });

require("./app/routes/tutorial.routes.js")(app);
require("./app/routes/user.routes.js");
// set port, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// References:
// https://www.bezkoder.com/node-express-sequelize-postgresql/
