import { useEffect, useState } from "react"; 
import { useSelector, useDispatch } from "react-redux"; 
import { Link, useNavigate } from "react-router-dom"; 
import { LogOut } from "lucide-react"; 
import { logoutTeacher } from "../redux/teacherAction.js"; 

export default function NavBar() {

  const teacher = useSelector((state) => state.Teacher.currentTeacher); 
  

  const dispatch = useDispatch(); 
  
  const navigate = useNavigate(); 
  
  const logout = () => { 

    localStorage.removeItem("token"); 
    localStorage.removeItem("_id"); 
    localStorage.removeItem("name"); 
    localStorage.removeItem("teacher"); 
    dispatch(logoutTeacher()); 
    navigate("/"); 
  };

  return (
    <nav style={styles.navbar}> 
      <ul style={styles.ul}> 

        {!teacher && ( 

          <>
            <li><Link to="/">התחברות</Link></li> 

            <li><Link to="/register">הרשמה</Link></li> 
          </>
        )}

        {teacher && ( 

          <>
            <li><Link to="/dashboard">הפרטים שלי</Link></li> 

            <li><Link to="/add-student">הוספת תלמידה</Link></li> 
            <li>
              <Link to="/search-students">חיפוש תלמידות</Link> 
            </li>

            <li>
              <Link to="/MapView"> מפה בזמן אמת</Link> 
            </li>

            <li>
              <button onClick={logout} style={styles.logoutBtn}> 

                <LogOut size={18} /> 
                התנתקות 
              </button>
            </li>

          </>
        )}

      </ul>

      <h5 style={styles.userName}>
        {teacher?.firstName} 
      </h5>

    </nav>
  );
}

const styles = { 

  navbar: {
    backgroundColor: '#b5ad86', 
    padding: '12px 20px', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    direction: 'rtl', 
  },

  ul: {
    display: 'flex', 
    listStyle: 'none', 
    gap: '16px', 
    margin: 0, 
    padding: 0, 
  },

  li: {
    display: 'flex', 

    alignItems: 'center', 
  },

  link: {
    textDecoration: 'none', 

    color: '#1b4332', 
  },

  logoutBtn: {
    backgroundColor: '#b5ad87', 

    border: 'none', 

    padding: '8px 16px', 

    cursor: 'pointer', 
  },

  userName: {
    margin: 0, 
  }
};