import { produce } from "immer";

const initialState = {
    currentTeacher: null
};

export const TeacherReducer = produce((state, action) => {
    switch (action.type) {

        case "SET_TEACHER":
            state.currentTeacher = action.payload;
            break;

        case "LOGOUT_TEACHER":
            state.currentTeacher = null;
            break;

        default:
            break;
    }
}, initialState);