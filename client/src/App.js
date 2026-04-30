import './App.css'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Login from './component/login_teacher.js';
import Register from './component/register_teacher.js';
import NavBar from './component/navBar.js';
import TeacherDashboard from './component/my_student.js';
import AddStudent from './component/add_student.js';
import AllStudents from './component/all_student.js';
import SearchStudents from './component/SearchStudents.js';
import MapView from './component/MapView.js';
import { setTeacher } from './redux/teacherAction.js';

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    const savedTeacher = localStorage.getItem("teacher");
    if (savedTeacher) {

      dispatch(setTeacher(JSON.parse(savedTeacher)));
    }

  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search-students" element={<SearchStudents />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/MapView" element={<MapView />} />
        <Route path="/students" element={<AllStudents />} />
        <Route path="/dashboard" element={<TeacherDashboard />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
