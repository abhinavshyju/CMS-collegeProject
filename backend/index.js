const express = require("express");
const { sequelize } = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const staff = require("./routes/staff");
const { StudentRelations } = require("./model/student");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
    await sequelize.sync();
    console.log("Database synced, tables created!");
    StudentRelations();
  } catch (error) {
    console.error(`Error connecting to the database: ${error.message}`);
    console.debug(error);
  }
})();
app.use("/staff", staff);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
