const Workout = require("../models/Workout");

exports.lists = async(req, res) => {
    try {
        const workouts =  await Workout.find({});
        res.render("workouts", {workouts: workouts});

    } catch (error) {
        res.status(404).send({message: "Could not find Workout"})
    }
}

exports.delete = async(req, res) => {
     const id = req.params.id
    try {
        //const workouts =  await Workout.find({});
        //res.render("workouts", {workouts: workouts});
        await Workout.findByIdAndDelete(id);
        res.redirect("/workouts");
        
    } catch (error) {
        res.status(404).send({message: "Could not find Workout"})
    }
}

exports.create = async(req, res) => {
    console.log(req);
    res.send("post req sent!");
}
