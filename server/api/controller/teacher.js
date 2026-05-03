import Student from "../models/student.js"
import Teacher from "../models/teacher.js"
import jwt from "jsonwebtoken"

export const registerTeacher = async (req, res) => {
    try {
        const { firstName, lastName, tz, grade } = req.body
        
        const teacher = await Teacher.create({
            firstName,
            lastName,
            tz,
            grade,

            location: {
                latitude: 32.0853,
                longitude: 34.7818,
                time: new Date()
            }
        })
        const token = jwt.sign(
            {
                id: teacher._id,
                firstName: teacher.firstName,
                tz: teacher.tz,
                role: "teacher"
            },
            process.env.SECRET,
            { expiresIn: "1d" }
        )

        res.status(201).send({ teacher, token })
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}
export const loginTeacher = async (req, res) => {
    try {
        const { tz } = req.body
        const teacher = await Teacher.findOne({ tz })

        if (!teacher) {
            return res.status(400).send({ error: "תעודת זהות לא קיימת" })
        }
        const token = jwt.sign(
            {
                id: teacher._id,
                firstName: teacher.firstName,
                tz: teacher.tz,
                role: "teacher"
            },
            process.env.SECRET,
            { expiresIn: "1d" }
        )

        res.status(200).send({ teacher, token })
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}

export const getAllTeachers = (req, res) => {
    Teacher.find()
        .then(list => res.send(list))
        .catch(err => res.status(500).send({ error: err.message }))
}
export const getTeacherByTz = (req, res) => {
    const { tz } = req.params
    Teacher.findOne({ tz })
        .then(teacher => {
            if (!teacher)
                return res.status(404).send({ message: "מורה לא נמצא" })
            res.send(teacher)
        })
        .catch(err => res.status(500).send({ error: err.message }))
}

export const getStudentsByTeacher = async (req, res) => {
    try {
        const { tz } = req.params
        const teacher = await Teacher.findOne({ tz })
        if (!teacher) {
            return res.status(404).send({ message: "מורה לא נמצא" })
        }
        const students = await Student.find({ grade: teacher.grade })
        res.send(students)
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}