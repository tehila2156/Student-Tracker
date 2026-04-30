import { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 

import { registerTeacher } from "../api/teacher"; 
import bg from "../picture/background.png";
export default function Register() { 
    const navigate = useNavigate(); 
    const [form, setForm] = useState({ 
        firstName: "", 
        lastName: "", 
        tz: "", 
        grade: "" 
    });

    const handleChange = (e) => { 
        setForm({ 
            ...form, 
            [e.target.name]: e.target.value 
        });
    };

    const handleRegister = async (e) => { 
        e.preventDefault(); 
        try {
            await registerTeacher(form); 

            alert("נרשמת בהצלחה 🎉"); 
             navigate("/"); 
        } catch (err) {
            alert("שגיאה בהרשמה"); 
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
                onSubmit={handleRegister} 
                style={{
                    background: "rgba(255,255,255,0.92)", 
                    padding: "30px", 
                    borderRadius: "14px", 
                    display: "flex", 
                    flexDirection: "column", 
                    gap: "12px", 
                    width: "300px", 
                    boxShadow: "0 10px 30px rgba(0,0,0,0.25)", 
                    textAlign: "center" 
                }}
            >

                <h2 style={{ margin: 0 }}>הרשמת מורה</h2> 

                <input
                    name="firstName" 
                    placeholder="שם פרטי" 
                    onChange={handleChange} 
                    style={{
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        outline: "none"
                    }}
                />

                <input
                    name="lastName"
                    placeholder="שם משפחה"
                    onChange={handleChange}
                    style={{
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        outline: "none"
                    }}
                />

                <input
                    name="tz"
                    placeholder="תעודת זהות"
                    onChange={handleChange}
                    style={{
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        outline: "none"
                    }}
                />

                <input
                    name="grade"
                    placeholder="כיתה"
                    onChange={handleChange}
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
                    הרשמה
                </button>

            </form>
        </div>
    );
}