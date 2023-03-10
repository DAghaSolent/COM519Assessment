require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const chalk = require("chalk");
const bodyParser = require('body-parser');
const User = require("./models/User");
const Exercise = require("./models/Exercise");
const expressSession = require("express-session");


// controllers

const userController = require("./controllers/user");
const exerciseController = require("./controllers/exercise");
const exerciseApiController = require("./controllers/api/exercise");

const app = express();
app.set("view engine", "ejs");

const { WEB_PORT, MONGODB_URI } = process.env;


app.use(expressSession({ secret: 'foo barr', cookie: { expires: new Date(253402300000000) } }))

global.user = false;
app.use("*", async (req, res, next) => {
  if (req.session.userID && !global.user) {
    const user = await User.findById(req.session.userID);
    global.user = user;
  }
  next();
})

const authMiddleware = async (req, res, next) => {
  const user = await User.findById(req.session.userID);
  if (!user) {
    return res.redirect('/');
  }
  next()
}

//________ Locking non logged in from users from  accessing the various pages____________________


app.get("/create-exercise", authMiddleware, (req, res) => {
  res.render("create-exercise", { errors: {} });
});


app.get("/edit-exercise", authMiddleware, (req, res) => {
  res.render("edit-exercise", { errors: {} });
});

app.get("/edit-success", authMiddleware, (req, res) => {
  res.render("edit-success", { errors: {} });
});

app.get("/delete-success", authMiddleware, (req, res) => {
  res.render("delete-success", { errors: {} });
});

app.get("/search-exercises", authMiddleware, (req, res) => {
  res.render("search-exercises", { errors: {} });
});

//_______________________End of locking out of non logged in users ____________________________ 


app.get("/logout", async (req, res) => {
  req.session.destroy();
  global.user = false;
  res.redirect('/');
})

app.get("/view-exercise/logout", async (req, res) => {
  req.session.destroy();
  global.user = false;
  res.redirect('/');
})

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

mongoose.connection.on("error", (err) => {
  console.error(err);
  console.error("Connection Error");
  process.exit();
});

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/create-exercise", exerciseController.create);

app.get("/api/search-exercises", exerciseApiController.list);

app.get("/home", exerciseController.last7DaysExercises);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/search-exercises", (req, res) => {
  res.render("search-exercises");
});

app.get("/edit-exercise", (req, res) => {
  res.render("edit-exercise");
});

app.get("/join", (req, res) => {
  res.render('sign-up', {errors: {}});
});

app.get("/create-exercise", (req, res) => {
  res.render("create-exercise", {errors: {}});
})

app.get("/update-exercise", (req, res) => {
  res.render("edit-exercise", {errors: {}});
})

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
app.get("/view-exercise/update/:id", exerciseController.edit);
app.post("/view-exercise/update/:id", exerciseController.update);

app.listen(WEB_PORT, () => {
  console.log(`Example app listening at http://localhost:${WEB_PORT}`);
});

