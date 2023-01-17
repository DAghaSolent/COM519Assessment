const mongoose = require("mongoose");
const { Schema } =  mongoose;

const exerciseSchema = new Schema(
    {
        date:{type:String, required:true},
        exerciseName:{type:String, required:true},
        weight:{type:String, required:true},
        set:{type:String, required:true},
        comments:{type:String, required:true},
    }
)

module.exports = mongoose.model("Exercise", exerciseSchema);