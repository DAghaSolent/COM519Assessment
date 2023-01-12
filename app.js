require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const Workout = require("./models/Workout");
const app = express();
app.set("view engine", "ejs");


const { WEB_PORT, MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

mongoose.connection.on("error", (err) => {
  console.error(err);
  console.error("Connection Error");
  process.exit();
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/workouts", async (req,res) => {
  const workout = await Workout.find({});
  res.render("workouts");
});

app.get("/view-workout", (req, res) => {
  res.render("view-workout");
});

app.get("/edit-workout", (req, res) => {
  res.render("edit-workout");
});

app.listen(WEB_PORT, () => {
  console.log(`Example app listening at http://localhost:${WEB_PORT}`);
});


