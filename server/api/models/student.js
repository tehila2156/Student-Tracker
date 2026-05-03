import mongoose from "mongoose";

const studentSchema=mongoose.Schema({
    firstName:String,
    lastName:String,
    tz:String,
    grade:String,
     location: {
        latitude: Number,
        longitude: Number,
        time: Date
    }

})
export default mongoose.model('Student', studentSchema)
