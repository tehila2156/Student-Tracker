import { useState } from "react"; 

import {getStudentByTz,getStudentByFullName} from "../api/student"; 
export default function SearchStudents() { 
  const [tz, setTz] = useState(""); 
  const [firstName, setFirstName] = useState(""); 
  const [lastName, setLastName] = useState(""); 
  const [result, setResult] = useState([]); 
  
  const searchByTz = async () => { 

    if (!tz) return alert("יש להזין תעודת זהות"); 

    try {
      const s = await getStudentByTz(tz); 
      setResult(s.data ? [s.data] : []); 
    } catch {
      setResult([]); 
      alert("לא נמצא תלמיד"); 
    }
  };
  const searchByName = async () => { 

    if (!firstName || !lastName)
      return alert("יש להזין שם פרטי ומשפחה"); 

    try {
      const res = await getStudentByFullName(firstName, lastName); 
      setResult(res.data || []); 
    } catch {
      setResult([]); 
    }
  };

  return (
    <div style={styles.page}> 
      <div style={styles.card}> 
        <h2 style={styles.title}>🔍 חיפוש תלמידים</h2> 
        <div style={styles.section}> 
          <input
            style={styles.input} 
            placeholder="תעודת זהות" 
            value={tz} 
            onChange={(e) => setTz(e.target.value)} 
          />

          <button style={styles.button} onClick={searchByTz}> 
            חפש לפי ת״ז
          </button>
        </div>

        <hr style={styles.hr} /> 
        <div style={styles.section}> 
          <input
            style={styles.input}
            placeholder="שם פרטי"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="שם משפחה"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <button style={styles.button} onClick={searchByName}>
            חפש לפי שם
          </button>
        </div>

        <hr style={styles.hr} /> 

        <h3 style={{ marginTop: 10 }}>תוצאות:</h3> 

        {result.length === 0 ? ( 
          <p style={{ color: "#bbb" }}>אין תוצאות</p> 

        ) : (
          result.map((s) => ( 
            <div key={s._id} style={styles.resultCard}> 

              👩‍🎓 {s.firstName} {s.lastName} — {s.grade} 
              <p>{s.tz}</p>  
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

  section: {
    display: "flex", 
    flexDirection: "column", 
    gap: "10px", 
    marginBottom: "15px" 
  },

  input: {
    padding: "10px", 
    borderRadius: "8px", 
    border: "1px solid #334155", 
    background: "#b5ad87", 
    color: "white", 
    outline: "none" 
  },

  button: {
    padding: "10px", 
    borderRadius: "8px", 
    border: "none", 
    background: "#938b65", 
    color: "white", 
    cursor: "pointer", 
    fontWeight: "bold" 
  },

  hr: {
    border: "0.5px solid #334155", 

    margin: "15px 0" 
  },

  resultCard: {
    background: "#938b65", 
    padding: "10px", 
    borderRadius: "10px", 
    marginTop: "8px" 
  }
};