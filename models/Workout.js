const mongoose = require("mongoose");
const { Schema } = mongoose;

const workoutSchema = new Schema ({
    date: {type:Date, required: true},
    // Description is optional if you want to add it to a workout
    description: {type: String},
    exercises: [{type: Schema.Types.ObjectId, ref: "Exercise"}],
    //user_id: {type: Schema.Types.ObjectId, ref: "User"},
},
    { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);




/// Worout.find({user_id: <all workouts>}).populate("exercises")