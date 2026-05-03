import express from 'express';
import {
    registerTeacher,
    loginTeacher,
    getAllTeachers,
    getTeacherByTz,
    getStudentsByTeacher
} from '../controller/teacher.js';

import { validateAndCheckTz } from '../middlewares/validateTz.js';
import { checkAuth, isTeacher } from '../middlewares/auth.js';

const teacherRouter = express.Router();


teacherRouter.post("/register", validateAndCheckTz, registerTeacher)
teacherRouter.post("/login", loginTeacher)
teacherRouter.get("/getAll", checkAuth, isTeacher, getAllTeachers)
teacherRouter.get("/getTeacherByTz/:tz", checkAuth, isTeacher, getTeacherByTz)
teacherRouter.get("/getStudentsByTeacher/:tz", checkAuth, isTeacher, getStudentsByTeacher)

export default teacherRouter;