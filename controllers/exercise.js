const Exercise = require("../models/Exercise");
const { db } = require("../models/User");

exports.create = async (req, res) => {
    try{
        let exercise =  new Exercise(
            {date: req.body.date, 
            exerciseName: req.body.exerciseName, 
            weight: req.body.weight, 
            setAndReps: req.body.setAndReps, 
            comments: req.body.comments});
        await exercise.save();
        res.redirect("/create-success");
    }catch(e){
        if(e.errors) {
            console.log(e.errors);
            res.render('create-exercise', { errors: e.errors});
            return;
        }
        return res.status(400).send({
            message: JSON.parse(e),
        });
    }
}

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

exports.edit = async (req, res) => {
    const id = req.params.id;
    try{
        const exercise = await Exercise.findById(id);
        res.render("update-exercise", {exercise: exercise, id: id, errors: {} });
    } catch(e){
        if(e.errors){
            console.log(e.errors);
            return res.render('update-exercise', {errors: e.errors });
        }
        res.status(404).send({
            message: `could not find exercise ${id}.`,
        });
    }
}

exports.update = async (req, res) => {
    const id = req.params.id;
    try{
        const exercise = await Exercise.updateOne({ _id: id }, req.body, {runValidators:true});
        res.redirect("/edit-success");
    }catch(e){
        if(e.errors){
            return res.render('update-exercise', {errors: e.errors, exercise:req.body});
        }
        res.status(404).send({
            message: `could not update exercise ${id}.`,
        });
    }
}