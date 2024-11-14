const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;
const dotenv = require("dotenv");

const authRoute = require("./src/routes/authRoute");
const staffRoute = require("./src/routes/staffRoute");
const adminRoute = require("./src/routes/adminRoute");
const testRoute = require("./src/routes/testRoute");
const eventRoute = require("./src/routes/eventRoute");

const connectDB = require("./src/services/dbConnection");
const RelationsJoin = require("./src/models/relations");

dotenv.config({ path: "./.env" });

// Database connection

try {
  connectDB();
  RelationsJoin();
} catch (error) {
  console.error(error);
}

app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/auth", authRoute);
app.use("/admin", adminRoute);
app.use("/staff", staffRoute);
app.use("/event", eventRoute);

app.use("/test", testRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
