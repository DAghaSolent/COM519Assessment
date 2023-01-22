const mongoose = require("mongoose");
const { Schema } =  mongoose;

const exerciseSchema = new Schema(
    {
        //type:mongoose.Schema.Types.ObjectId,ref: "Exercise",

        date:{type:Date, required:[true, 'Date is required']},
        exerciseName:{type:String, required:[true, 'Exercise name is required']},
        weight:{type:String, required:[true, 'Weight is required']},
        setAndReps:{type:String, required:[true, 'Set and Reps are required']},

        // I have ommitted comments since I want it to be an optional input for the user.
        comments:{type:String},
    }
)

module.exports = mongoose.model("Exercise", exerciseSchema);