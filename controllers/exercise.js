const Exercise = require("../models/Exercise");
const { db } = require("../models/User");

exports.create = async (req, res) => {
    let exercise =  new Exercise({date: req.body.date, 
                                  exerciseName: req.body.exerciseName, 
                                  weight: req.body.weight, 
                                  setAndReps: req.body.setAndReps, 
                                  comments: req.body.comments});
    try{
        await exercise.save();
        res.redirect("/create-success");
    }catch(e){
        return res.status(400).send({message: JSON.parse(e)})
    }
};

exports.lists = async (req, res) => {
    try{
        const exercises = await Exercise.find({});
        res.render("view-exercise", {exercises});
    } catch(e){
        res.status(404).send({message: "could not find exercise"})
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    try{
        await Exercise.findByIdAndDelete(id);
        res.redirect("/delete-success");
    } catch(e){
        res.status(404).send({message: "could not delete exercise"})
    }
}