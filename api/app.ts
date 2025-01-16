import { Request, Response } from "express";
import "tsconfig-paths/register";
import { initModels } from "./src/models/index";
import db from "./src/db";
import Routes from "./src/routes/index";
import bodyParser from "body-parser";
import path from "path";
// const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;
const cores = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

// Database connection

try {
  initModels(db);
  db.authenticate();
  db.sync();
} catch (error) {
  console.error(error);
}

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cores({
    origin: "*",
    methods: ["GET", "POST", "PATCH"],
  })
);

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req: Request, res: Response) => res.send("Hello World!"));

app.use("/", Routes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
