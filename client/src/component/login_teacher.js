import { useState } from "react"; 
import { useDispatch } from "react-redux"; 
import { loginTeacher } from "../api/teacher"; 
import { setTeacher } from "../redux/teacherAction"; 
import { useNavigate } from "react-router-dom"; 
import bg from "../picture/background.png";
export default function Login() { 

    const [tz, setTz] = useState("");
    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 
    const handleLogin = async (e) => {
        e.preventDefault(); 
        try {
            const res = await loginTeacher({ tz }); 
            const teacher = res.data.teacher; 
            const token = res.data.token; 

            if (!token) { 
                alert("לא התקבל טוקן"); 
                return;
            }
            localStorage.setItem("token", token); 
            localStorage.setItem("teacher", JSON.stringify(teacher)); 
            dispatch(setTeacher(teacher)); 
            alert("התחברת בהצלחה 😄"); 
            navigate("/"); 
              }
         catch (err) {
            alert("שגיאה בהתחברות 🥲"); 
        }
    };

    return (
        <div
            style={{
                height: "100vh", 
                width: "100%", 
                  backgroundImage: `url(${bg})`,
                backgroundSize: "cover", 
                backgroundPosition: "center", 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center"
            }}
        >
            <form
                onSubmit={handleLogin}
                style={{
                    background: "rgba(255,255,255,0.92)",
                    padding: "30px", 
                    borderRadius: "14px", 
                    display: "flex", 
                    flexDirection: "column",
                    gap: "12px", 
                    width: "280px", 
                    boxShadow: "0 10px 30px rgba(0,0,0,0.25)", 
                    textAlign: "center" 
                }}
            >
                <h2 style={{ margin: 0 }}>התחברות מורה</h2> 
                <input
                    placeholder="תעודת זהות" 
                    value={tz} 
                    onChange={(e) => setTz(e.target.value)} 
                    required 
                    style={{
                        padding: "10px", 
                        borderRadius: "8px", 
                        border: "1px solid #ccc", 
                        outline: "none" 
                    }}
                />

                <button
                    type="submit" 
                    style={{
                        padding: "10px", 
                        border: "none", 
                        borderRadius: "8px", 
                        background: "#111", 
                        color: "white", 
                        cursor: "pointer", 
                        fontWeight: "bold" 
                    }}
                >
                    התחבר
                </button>
            </form>
        </div>
    );
}