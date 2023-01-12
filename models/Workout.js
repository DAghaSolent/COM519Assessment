const mongoose = require("mongoose");
const { Schema } = mongoose;

const workoutSchema = new Schema ({
    date:String,
    exercise:String,   // exercises: [{types: mongoose.schema.Types.ObjectId, ref: "Exercise"}]   
    reps:Number,
    //user_id: {types: Schema.Types.ObjectId, ref: "User"}
},
    { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);




/// Worout.find({user_id: <all worouts>}).populate("exercises")