import { useEffect, useState } from "react"; 
import { getAllStudents } from "../api/student"; 

export default function AllStudents() { 

    const [students, setStudents] = useState([]); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => { 
        getAllStudents() 
            .then(st => { 
                setStudents(st.data); 
                setLoading(false); 
            })
            .catch(err => { 
                console.log(err); 
                setLoading(false);
            });
    }, []); 

    if (loading) return <h3 style={{ textAlign: "center" }}>טוען תלמידות...</h3>; 

    return (
        <div style={styles.page}> 
 
            <div style={styles.card}> 

                <h2 style={styles.title}>📚 כל התלמידות</h2> 

                {students.length === 0 ? ( 
                    <p style={{ color: "#eee" }}>אין תלמידות</p> 
                ) : (
                    <div style={styles.grid}> 
                        {students.map(s => ( 
                            <div key={s._id} style={styles.studentCard}> 
                                <div>👩‍🎓 {s.firstName} {s.lastName}</div> 
                                <div>ת"ז: {s.tz}</div> 
                                <div>כיתה: {s.grade}</div> 
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: "100vh", // גובה מסך מלא
        display: "flex", // שימוש ב-flex
        justifyContent: "center", // ממרכז אופקית
        alignItems: "center", // ממרכז אנכית
        background: "linear-gradient(135deg, #b5ad87, #fcfcf9)", // רקע גרדיאנט
        direction: "rtl", // כיוון ימין לשמאל
        fontFamily: "Arial" // פונט
    },

    card: {
        width: "600px", // רוחב הכרטיס
        maxHeight: "80vh", // גובה מקסימלי
        overflowY: "auto", // גלילה אם יש הרבה תוכן
        background: "#b5ad87", // צבע רקע
        padding: "25px", // ריווח פנימי
        borderRadius: "16px", // פינות מעוגלות
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)", // צל
        color: "white", // צבע טקסט
        textAlign: "center" // יישור טקסט
    },

    title: {
        marginBottom: "20px", // רווח מתחת לכותרת
        fontSize: "22px" // גודל טקסט
    },

    grid: {
        display: "flex", // flex
        flexDirection: "column", // סידור אנכי
        gap: "10px" // רווח בין כרטיסים
    },

    studentCard: {
        background: "#938b65", // צבע כרטיס תלמידה
        padding: "12px", // ריווח פנימי
        borderRadius: "10px", // פינות מעוגלות
        textAlign: "right" // יישור לימין
    }
};