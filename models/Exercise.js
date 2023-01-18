const mongoose = require("mongoose");
const { Schema } =  mongoose;

const exerciseSchema = new Schema(
    {
        date:{type:Date, required:true},
        exerciseName:{type:String, required:true},
        weight:{type:String, required:true},
        setAndReps:{type:String, required:true},
        comments:{type:String, required:true},
    }
)

module.exports = mongoose.model("Exercise", exerciseSchema);