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
    try {
        const workouts =  await Workout.find({});
        res.render("workouts", {workouts: workouts});
        
    } catch (error) {
        res.status(404).send({message: "Could not find Workout"})
    }
}