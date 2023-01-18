const mongoose = require("mongoose");
const { Schema } = mongoose;

const workoutSchema = new Schema ({
    date:Date,
    description:String,
    // exercises: [{types: mongoose.schema.Types.ObjectId, ref: "Exercise"}],
    // user_id: {types: Schema.Types.ObjectId, ref: "User"},
},
    { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);




/// Worout.find({user_id: <all worouts>}).populate("exercises")