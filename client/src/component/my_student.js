import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; 
import { getStudentsByTeacher } from "../api/teacher"; 

export default function TeacherDashboard() { 

    const teacher = useSelector(state => state.Teacher.currentTeacher); 
    const [students, setStudents] = useState([]); 

    const loadStudents = async () => { 
        try {
            const s = await getStudentsByTeacher(teacher.tz); 
            setStudents(s.data); 
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => { 
        if (teacher) loadStudents(); 
    }, [teacher]); 

    return (
        <div style={styles.page}> 

            <div style={styles.card}>

                <h2 style={styles.title}> 
                     תלמידים של {teacher?.firstName}👩‍🏫 
                </h2>

                {students.length === 0 ? ( 
                    <p style={styles.empty}>אין תלמידים להצגה</p> 
                ) : ( 
                    students.map(s => ( 
                        <div key={s._id} style={styles.studentCard}> 

                            <div style={styles.name}>
                                👩‍🎓 {s.firstName} {s.lastName}
                            </div>

                            <div style={styles.info}> 
                                🪪 ת״ז: {s.tz} 
                            </div>

                        </div>
                    ))
                )}

            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: "100vh", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        background: "linear-gradient(135deg, #b5ad87, #fcfcf9)", 
        direction: "rtl", 
        fontFamily: "Arial" 
    },

    card: {
        width: "420px", 
        background: "#b5ad87", 
        padding: "25px", 
        borderRadius: "16px", 
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        color: "white", 
        textAlign: "center" 
    },

    title: {
        marginBottom: "20px", 
        fontSize: "22px" 
    },

    studentCard: {
        background: "#938b65", 
        padding: "10px", 
        borderRadius: "10px", 
        marginBottom: "10px", 
        textAlign: "right" 
    },

    name: {
        fontSize: "15px", 
        fontWeight: "bold" 
    },

    info: {
        fontSize: "13px", 
        marginTop: "3px"
    },

    empty: {
        color: "#eee" 
    }
};