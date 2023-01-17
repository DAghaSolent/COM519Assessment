require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const chalk = require("chalk");
const bodyParser = require('body-parser');
const User = require("./models/User");
const Workout = require("./models/Workout");
const Exercise = require("./models/Exercise");

// controllers

const workoutController = require("./controllers/workout");
const userController = require("./controllers/user");

const app = express();
app.set("view engine", "ejs");

const { WEB_PORT, MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

mongoose.connection.on("error", (err) => {
  console.error(err);
  console.error("Connection Error");
  process.exit();
});

app.post("/create-workout");
app.get("/create-workout", (req, res) => {
  res.render("create-workout");
})

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.get("/", (req, res) => {
  res.render("index");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/workouts", workoutController.lists);

app.get("/view-exercise", (req, res) => {
  res.render("view-exercise");
});

app.get("/edit-exercise", (req, res) => {
  res.render("edit-exercise");
});

app.get("/edit-workout", (req, res) => {
  res.render("edit-workout");
});

app.get("/create-workout", (req, res) => {
  res.render("create-workout");
})

app.get("/join", (req, res) => {
  res.render('sign-up', {errors: {}});
});

app.post("/join", userController.create);

app.get("/login", (req, res) => {
  res.render('login-user', { errors: {} })
});
app.post("/login", userController.login);

app.listen(WEB_PORT, () => {
  console.log(`Example app listening at http://localhost:${WEB_PORT}`);
});


