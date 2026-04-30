import { combineReducers, createStore } from "redux"; 

import { TeacherReducer } from "./teacherReducer.js"; 

const rootReducer = combineReducers({
    Teacher: TeacherReducer
    
});

const store = createStore(rootReducer); 

export default store; 
