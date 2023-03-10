const Exercise = require("../models/Exercise");
const { db } = require("../models/User");

exports.create = async (req, res) => {
    try{
        let exercise =  new Exercise(
            {date: req.body.date, 
            exerciseName: req.body.exerciseName, 
            weight: req.body.weight, 
            setAndReps: req.body.setAndReps, 
            comments: req.body.comments,
            user: req.session.userID,});
        await exercise.save();
        res.redirect(`view-exercise/?message=New Exercise: ${req.body.exerciseName} with Date: ${req.body.date} has been created`)
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
        const message = req.query.message;
        const exercises = await Exercise.find({user: req.session.userID});
        res.render("view-exercise", {exercises, message: req.query?.message});
    } catch(e){
        res.status(404).send({message: "could not find exercise"})
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    try{
        await Exercise.findByIdAndDelete(id);
        res.redirect(`/view-exercise/?message= Exercise has been sucessfully deleted`);
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
        res.redirect(`/view-exercise/?message= Exercise: ${req.body.exerciseName} with Date: ${req.body.date} has been sucessfully updated`);
    }catch(e){
        if(e.errors){
            return res.render('update-exercise', {errors: e.errors, exercise:req.body});
        }
        res.status(404).send({
            message: `could not update exercise ${id}.`,
        });
    }
}

exports.last7DaysExercises = async (req, res) => {
    try {
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const exercises = await Exercise.find({
            user: req.session.userID,
            date: { $gte: sevenDaysAgo }
        }).sort({ date: -1 }).limit(10);
        res.render("home", { exercises });
    } catch (e) {
        res.status(404).send({ message: "could not find exercise" });
    }
};

