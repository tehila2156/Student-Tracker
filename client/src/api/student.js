import axios from "axios";

const API = "http://localhost:3001/student";

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export const getAllStudents = () => {
    return axios.get(`${API}/getAll`, getAuthHeader());
};

export const getStudentByTz = (tz) => {
    return axios.get(`${API}/getStudentByTz/${tz}`, getAuthHeader());
};

export const getStudentByFullName = (firstName, lastName) => {
    return axios.get(
        `${API}/getStudentByFullName?firstName=${firstName}&lastName=${lastName}`,
        getAuthHeader()
    );
};

export const addStudent = (student) => {
    return axios.post(
        `${API}/addStudent`,
        student,
        getAuthHeader()
    );
};



export const updateStudentLocation = (data) => {
    return axios.post(`${API}/updateLocation`, data);
};

export const moveStudents = () => {
    return axios.post(`${API}/move`, {}, getAuthHeader());
};
export const getStudentsForMap = () => {
    const token = localStorage.getItem("token");

    return axios.get("http://localhost:3001/student/map", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};