import mongoose from "mongoose";

const teacherSchema=mongoose.Schema({
    firstName:String,
    lastName:String,
    tz:String,
    grade:String,
    location: 
    {
    latitude: Number,
    longitude: Number,
    time: Date
    }

})
export default mongoose.model('Teacher', teacherSchema)
