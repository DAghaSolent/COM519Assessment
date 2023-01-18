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
const exerciseController = require("./controllers/exercise");

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


app.post("/create-exercise", exerciseController.create);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/workouts", workoutController.lists);

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

app.get("/create-exercise", (req, res) => {
  res.render("create-exercise");
})

app.post("/join", userController.create);

app.get("/login", (req, res) => {
  res.render('login-user', { errors: {} })
});
app.post("/login", userController.login);

app.get("/view-exercise", exerciseController.lists);

app.get("/edit-success", (req, res) => {
  res.render("edit-success");
})

app.get("/delete-success", (req, res) => {
  res.render("delete-success");
})

app.get("/create-success", (req, res) => {
  res.render("create-success");
})

app.get("/view-exercise/delete/:id", exerciseController.delete);


app.listen(WEB_PORT, () => {
  console.log(`Example app listening at http://localhost:${WEB_PORT}`);
});


