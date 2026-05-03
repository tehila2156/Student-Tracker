import Student from "../models/student.js";

export const getAllStudents = async (req, res) => {

    try {
        const students = await Student.find();
        res.send(students);

    } catch (err) {

        res.status(500).send({ error: err.message });
    }
};
export const getStudentByTz = async (req, res) => {
    try {
        const { tz } = req.params;
        if (!tz) {
            return res.status(400).send({ message: "חסר תעודת זהות" });
        }
        const student = await Student.findOne({ tz });
        if (!student) {
            return res.status(404).send({ message: "תלמיד לא נמצא" });
        }
        res.send(student);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const getStudentByFullName = async (req, res) => {
    try {
        const { firstName, lastName } = req.query;
        if (!firstName || !lastName) {
            return res.status(400).send({ message: "יש להזין שם פרטי ומשפחה" });
        }

        const students = await Student.find({
            firstName: { $regex: `^${firstName}$`, $options: "i" },
            lastName: { $regex: `^${lastName}$`, $options: "i" }
        });
        if (students.length === 0) {
            return res.status(404).send({ message: "לא נמצאו תוצאות" });
        }

        res.send(students);

    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const addStudent = async (req, res) => {
    try {
        const randomNumber = () => (Math.random() - 0.5) * 0.002;
        const newStudent = {
            ...req.body,
            location: {
                latitude: 32.0853 + randomNumber(),
                longitude: 34.7818 + randomNumber(),
                time: new Date()
            }
        };
        const student = await Student.create(newStudent);
        res.status(201).send(student);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const updateLocation = async (req, res) => {
    try {
        const { tz, latitude, longitude } = req.body;
        if (!tz || latitude == null || longitude == null) {
            return res.status(400).send({ message: "חסר או תז או מיקום" });
        }
        const student = await Student.findOneAndUpdate({ tz },
            {
                location: {
                    latitude,
                    longitude,
                    time: new Date()
                }
            },
            { new: true }//שיחזיר לי את האובייקט המעודכן
        );
        if (!student) {
            return res.status(404).send({ message: "תלמיד לא נמצא" });
        }

        res.send(student);

    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const getStudentsWithLocation = async (req, res) => {
    try {
        const students = await Student.find({
            "location.latitude": { $ne: null }          
        });

        res.send(students);

    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};