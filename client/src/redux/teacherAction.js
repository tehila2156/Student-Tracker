export const setTeacher = (teacher) => { 

    return { 
        type: "SET_TEACHER", 

        payload: teacher 
    };
};

export const logoutTeacher = () => { 

    return { 
        type: "LOGOUT_TEACHER" 
    };
};