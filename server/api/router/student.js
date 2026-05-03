import express from 'express';
import {
    addStudent,
    getAllStudents,
    getStudentByFullName,
    getStudentByTz,
    updateLocation,
    getStudentsWithLocation
} from '../controller/student.js';

import { validateAndCheckTz } from '../middlewares/validateTz.js';
import { checkAuth, isTeacher } from '../middlewares/auth.js';

const studentRouter = express.Router();

studentRouter.get("/getAll", checkAuth, isTeacher, getAllStudents);
studentRouter.get("/getStudentByTz/:tz", checkAuth, isTeacher, getStudentByTz);
studentRouter.get("/getStudentByFullName", checkAuth, isTeacher, getStudentByFullName);
studentRouter.get("/map", checkAuth, isTeacher, getStudentsWithLocation);
studentRouter.post("/updateLocation", updateLocation);
studentRouter.post("/addStudent", checkAuth, isTeacher, validateAndCheckTz, addStudent);

export default studentRouter;