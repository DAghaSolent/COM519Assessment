const Workout = require("../models/Workout");
const { db } = require("../models/User");
const Exercise =  require("../models/Exercise");

// exports.lists = async(req, res) => {
//     try {
//         const workouts =  await Workout.find().populate('exercises');
//         res.render("workouts", {workouts});

//     } catch (error) {
//         res.status(404).send({message: "Could not find Workout"})
//     }
// }

exports.list = async(req, res) => {
    try{
        const workouts = await Workout.find({});
        res.render('workouts', {workouts: workouts});
    }catch(e){
        res.status(404).send({ message: "could not list workouts"});
    }
};

// exports.listWorkouts = async (req, res) => {
//     try {
//         // Find all workouts in the database
//         const workouts = await Workout.find({});

//         // Render the workouts page with the workouts
//         res.render('workouts', { workouts });
//     } catch (e) {
//         res.status(400).send({
//             message: "Error finding workouts",
//             error: e
//         });
//     }
// };

exports.delete = async(req, res) => {
     const id = req.params.id
    try {
        const workouts =  await Workout.find({});
        res.render("workouts", {workouts});
        await Workout.findByIdAndDelete(id);
        res.redirect("/workouts/:workoutId/exercises");
        
    } catch (error) {
        res.status(404).send({message: "Could not find Workout"})
    }
}


exports.createWorkout = async (req, res) => {
    try{
        let workout = new Workout({
            date: req.body.date,
            description: req.body.description
        });

        await workout.save();

        res.redirect('/workouts');
    
    }catch (e) {
        if (e.errors){
            res.render('create-workout', {errors: e.errors});
            return;
        }
    

        res.status(400).send({
            message: "Error saving workout",
            error: e
        });
    }
};

exports.viewWorkout = (req, res) => {
    const workoutId = req.params.workoutId;
    Exercise.find({ workoutId: workoutId }, (err, exercises) => {
        if (err) return res.status(500).send(err);
        res.render("view-exercises", { exercises });
    });
};


// exports.viewWorkout = async (req, res) => {
//     try{
//         const workout = await Workout.findById(req.params.workoutId).populate('exercises');
//         if(!workout){
//             res.status(400).send({ message: "Workout not found"});
//             return;
//         }
//         res.render("view-exercises", {exercises});

//     }catch(e) {
//         res.status(400).send({
//             message: "Error finding workout",
//             error: e
//         });
//     }
// };


// exports.addExerciseToWorkout = async (req, res) => {
//     try {
//         const workout = await Workout.findById(req.params.workoutiD);
//         if(!workout){
//             res.status(404).send({message: "Workout not found"});
//             return;
//         }
//     }

//     workout.exercise.push(req.body)
// }

// exports.createWorkout = async (req, res) => {
//     try{
//         let workout = new Workout({
//             date: req.body.date,
//             description: req.body.description
//         });

//         await workout.save();

//         res.redirect('/workouts');

//     }catch (e) {
//         if (e.errors) {
//             res.render('create-workout', {errors: e.errors});
//             return;
//         }
//     }

//     res.status(400).send({
//         message: "Error saving workout",
//         error: e
//     });

// };


// exports.createWorkout = async (req, res) => {
//     try{
//         const exercise = await Exercise.findById(req.body.exercise_id);
//         let workout = new Workout({
//             date: req.body.date,
//             description: req.body.description,
//             exercise_id: req.body.exercise_id,
//         });
//         await workout.save();
//         res.redirect('/create-success');
//     }catch(e){
//         if (e.errors){
//             res.render('create-workout', { errors: e.errors})
//             return;
//         }
//         return res.status(400).send({
//             message: JSON.parse(e),
//         });
//     }
// }


// exports.createWorkout = async (req, res) => {
//     const {date, description, exercises} = req.body;
//     try{
//         const workout = new Workout({
//             date, description, exercises
//         });
//         await workout.save();
//         res.redirect("create-success");

//     }catch(e){
//         if(e.errors){
//             console.log(e.errors);
//             res.render("create-workout", {errors: e.errors});
//             return;
//         }
//         return res.status(400).send({
//             message: JSON.parse(e),
//         });
//     }
// }


// exports.create = async (req, res) => {
//     try{
//         const exercise = await exercise.findById(req.body.exercise_id);

//         await Workout.create({
//             date: req.body.date,
//             description: req.body.String,
//             exercise: req.body.exercise_id,
//         })

//         res.redirect('/workouts/?message=workout has been created')
//     } catch(e){
//         if (e.errors) {
//             res.render('workouts', { errors: e.errors })
//             return;
//           }
//         return res.status(400).send({
//           message: JSON.parse(e),
//         });
//     }
// }

// exports.create = async(req, res) => {
//     console.log(req);
//     res.send("post req sent!");
// }
