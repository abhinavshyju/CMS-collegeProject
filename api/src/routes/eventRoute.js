const { Router } = require("express");
const EventModel = require("../models/eventModel");
const jwt = require("jsonwebtoken");
const router = Router();

// Create an event

const validateUser = (req, res, next) => {
  try {
    const token = req.body.token;
    if (!token) {
      res.send("Token not found");
    }
    const decode = jwt.verify(token, process.env.JWTKEY);
    if (["admin", "staff", "faculty"].includes(decode.role)) {
      next();
    }
    res
      .status(401)
      .json({ message: "You are not authorized to create an event" });
  } catch (error) {}
};

router.get("/", async (req, res) => {
  try {
    const events = await EventModel.findAll();
    if (events.length != 0) {
      res
        .status(200)
        .json({ message: "Events fetched successfully", data: events });
    }
    res.json({ message: "There are no events at this time." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const event = await EventModel.findOne({ where: { id: id } });
    if (!event) {
      res.status(404).json({ message: "Event not found!" });
    }
    res
      .status(200)
      .json({ message: "Event fetched successfully.", data: event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Erorr" });
  }
});

router.post("/add", validateUser, async (req, res) => {
  const { title, description, date, token } = req.body;
  const event = await EventModel.create({
    title: title,
    date: date,
    description: description,
    published_by: jwt.verify(token, process.env.JWTKEY),
  });
  res.status(201).json({ message: "Event created successfull", data: event });
});

module.exports = router;
