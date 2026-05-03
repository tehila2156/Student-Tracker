import express from 'express' 
import bodyParser from 'body-parser' 
import mongoose from 'mongoose' 
import TeacherRouter from './api/router/teacher.js' 
import StudentRouter from './api/router/student.js' 
import dotenv from "dotenv" 
import cors from "cors";
import Student from './api/models/student.js';
import Teacher from './api/models/teacher.js'

dotenv.config()

const app = express()
const port = 3001

app.use(bodyParser.json());


app.use(cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

mongoose.connect("mongodb+srv://tehila2156:OYLXNOIAbbIs642M@cluster0.xg7vizr.mongodb.net/Schooldb?retryWrites=true&w=majority")
.then(() => {
    console.log("MongoDB connected successfully")
})
.catch(err => {
    console.log("MongoDB connection error:", err.message)
})

app.use('/teacher', TeacherRouter);

app.use('/student', StudentRouter);


const randomOffset= () => (Math.random() - 0.5) * 0.00001;

setInterval(async () => {

    try {
        const students = await Student.find();
        for (let s of students) {
            const latitude = s.location?.latitude || 32.0853;
            const longitude = s.location?.longitude || 34.7818;
            await Student.updateOne(
                { _id: s._id },
                {
                    location: {
                        latitude: baseLat + randomOffset(),
                        longitude: baseLng + randomOffset(),
                        time: new Date()
                    }
                }
            );
        }
        const teachers = await Teacher.find();
        for (let t of teachers) {
            const baseLat = t.location?.latitude || 32.0853;
            const baseLng = t.location?.longitude || 34.7818;
            await Teacher.updateOne(
                { _id: t._id },
                {
                    location: {
                        latitude: baseLat + randomOffset(),
                        longitude: baseLng + randomOffset(),
                        time: new Date()
                    }
                }
            );
        }
    } catch (err) {
        console.log(" ERROR:", err.message);
    }

}, 60000);


app.listen(port, () => {
    console.log(`my application is running in http://localhost:${port}`)
})