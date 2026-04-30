import axios from "axios";

const API = "http://localhost:3001/teacher";

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};
export const loginTeacher = (user) => {
    return axios.post(`${API}/login`, user);
};

export const registerTeacher = (user) => {
    return axios.post(`${API}/register`, user);
};
export const getAllTeachers = () => {
    return axios.get(`${API}/getAll`, getAuthHeader());
};

export const getTeacherByTz = (tz) => {
    return axios.get(`${API}/getTeacherByTz/${tz}`, getAuthHeader());
};

export const getStudentsByTeacher = (tz) => {
    return axios.get(
        `${API}/getStudentsByTeacher/${tz}`,
        getAuthHeader()
    );
};