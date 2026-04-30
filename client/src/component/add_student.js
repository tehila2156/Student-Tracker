import { useState } from "react"; 
import { addStudent } from "../api/student"; 
export default function AddStudent() { 

    const [form, setForm] = useState({ 
        firstName: "", 
        lastName: "", 
        tz: "", 
        grade: "" 
    });

    const handleChange = (e) => { 
        setForm({ ...form, [e.target.name]: e.target.value }); 
    };

    const handleAdd = async () => { 
        try {
            await addStudent(form); 
            alert("נוספה תלמידה"); 
            setForm({ 
                firstName: "",
                lastName: "",
                tz: "",
                grade: ""
            });
        } catch (err) { 
            alert("שגיאה"); 
        }
    };

    return (
        <div style={styles.page}> 

            <div style={styles.card}> 

                <h2 style={styles.title}>➕ הוספת תלמידה</h2> {/* כותרת */}

                <input
                    style={styles.input}
                    name="firstName" 
                    placeholder="שם פרטי" 
                    value={form.firstName} 
                    onChange={handleChange} 
                />

                <input
                    style={styles.input}
                    name="lastName"
                    placeholder="שם משפחה"
                    value={form.lastName}
                    onChange={handleChange}
                />

                <input
                    style={styles.input}
                    name="tz"
                    placeholder="תעודת זהות"
                    value={form.tz}
                    onChange={handleChange}
                />

                <input
                    style={styles.input}
                    name="grade"
                    placeholder="כיתה"
                    value={form.grade}
                    onChange={handleChange}
                />

                <button style={styles.button} onClick={handleAdd}> 
                    הוסף תלמידה
                </button>

            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: "100vh", // גובה מלא של המסך
        display: "flex", // שימוש ב-flex
        justifyContent: "center", // מרכז אופקית
        alignItems: "center", // מרכז אנכית
        background: "linear-gradient(135deg, #b5ad87, #fcfcf9)", // רקע גרדיאנט
        direction: "rtl", // כיוון ימין לשמאל
        fontFamily: "Arial" // פונט
    },

    card: {
        width: "380px", // רוחב הכרטיס
        background: "#b5ad87", // צבע רקע
        padding: "25px", // ריווח פנימי
        borderRadius: "16px", // פינות מעוגלות
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)", // צל
        color: "white", // צבע טקסט
        textAlign: "center", // יישור טקסט
        display: "flex", // flexbox
        flexDirection: "column", // סידור בעמודה
        gap: "10px" // רווח בין אלמנטים
    },

    title: {
        marginBottom: "15px", // רווח מתחת לכותרת
        fontSize: "22px" // גודל טקסט
    },

    input: {
        padding: "10px", // ריווח פנימי
        borderRadius: "8px", // פינות מעוגלות
        border: "1px solid #334155", // גבול
        background: "#b5ad87", // צבע רקע
        color: "white", // צבע טקסט
        outline: "none" // ביטול מסגרת כחולה בלחיצה
    },

    button: {
        padding: "10px", // ריווח פנימי
        borderRadius: "8px", // פינות מעוגלות
        border: "none", // בלי גבול
        background: "#938b65", // צבע כפתור
        color: "white", // צבע טקסט
        cursor: "pointer", // יד על hover
        fontWeight: "bold", // טקסט מודגש
        marginTop: "10px" // רווח מעל הכפתור
    }
};