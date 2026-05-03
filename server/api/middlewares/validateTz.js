import Student from "../models/student.js"
import Teacher from "../models/teacher.js"

export const validateAndCheckTz = async (req, res, next) => {
    try {
        const { tz } = req.body

        if (!tz) {
            return res.status(400).send({ message: "חובה להזין תעודת זהות" })
        }
        const tzRegex = /^\d{9}$/
        if (!tzRegex.test(tz)) {
            return res.status(400).send({ message: "תעודת זהות לא תקינה" })
        }
        const teacherExists = await Teacher.findOne({ tz })
        const studentExists = await Student.findOne({ tz })
        if (teacherExists || studentExists) {
            return res.status(400).send({ message: "תעודת זהות כבר קיימת במערכת" })
        }
        next()
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}