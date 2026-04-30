import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; 
import "leaflet/dist/leaflet.css"; 
import { useEffect, useState, useRef } from "react"; 
import { getTeacherByTz, getStudentsByTeacher } from "../api/teacher.js"; 
import L from "leaflet"; 
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function getDistanceInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; 

  const dLat = (lat2 - lat1) * Math.PI / 180;

  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function MapView() {

  const [students, setStudents] = useState([]); 

  const [teacher, setTeacher] = useState(null); 

  const prevDistances = useRef({}); 

  const alertedStudents = useRef(new Set()); 

  const farStudents = useRef(new Set()); 

  const FAR = 0.03; 

  const loadData = async () => {
    try {
      const savedTeacher = JSON.parse(localStorage.getItem("teacher"));
      if (!savedTeacher?.tz) return;
      const teacherFromDb = await getTeacherByTz(savedTeacher.tz);
      setTeacher(teacherFromDb.data);
      const students= await getStudentsByTeacher(savedTeacher.tz);
      setStudents(students.data);
    } catch (err) {
      console.log(" ERROR:", err);
    }
  };
  useEffect(() => {
    loadData(); 
    const interval = setInterval(loadData, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!teacher?.location) return;

    students.forEach((s) => {
      if (!s.location) return;

      const distance = getDistanceInKm(
        teacher.location.latitude,
        teacher.location.longitude,
        s.location.latitude,
        s.location.longitude
      );

      const prev = prevDistances.current[s.tz];

      const becameFar = prev !== undefined && prev <= FAR && distance > FAR;

      const becameNear = prev !== undefined && prev > FAR && distance <= FAR;

      if (becameFar && !alertedStudents.current.has(s.tz)) {
        alertedStudents.current.add(s.tz);
        alert(`⚠️ ${s.firstName} ${s.lastName} התרחק מהמורה`);
      }

      if (becameNear) {
        alertedStudents.current.delete(s.tz);
        farStudents.current.delete(s.tz);
      }

      if (distance > FAR) {
        farStudents.current.add(s.tz);
      } else {
        farStudents.current.delete(s.tz);
      }

      prevDistances.current[s.tz] = distance;
    });
  }, [students, teacher]);

  const getOffset = (tz) => {
    let x = 0;

    for (let i = 0; i < tz.length; i++) {
      x += tz.charCodeAt(i);
    }

    return (x % 100) * 0.00002;
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>מפת תלמידים</h2>

      <MapContainer
        center={[32.0853, 34.7818]}
        zoom={13}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {teacher?.location && (
          <Marker
            position={[
              teacher.location.latitude,
              teacher.location.longitude
            ]}
          >
            <Popup>👩‍🏫 {teacher.firstName}</Popup>
          </Marker>
        )}

        {students.map((s) => {

          if (!teacher?.location || !s.location) return null;

          const lat = Number(s.location.latitude) + getOffset(s.tz);
          const lng = Number(s.location.longitude) + getOffset(s.tz);

          const distance = getDistanceInKm(
            teacher.location.latitude,
            teacher.location.longitude,
            s.location.latitude,
            s.location.longitude
          );

          const isFar = distance > FAR;

          const color = isFar ? "#ff4d4f" : "white";
          const textColor = isFar ? "white" : "#111";
          const border = isFar ? "darkred" : "#333";

         const customIcon = L.divIcon({
  className: "custom-box",
  html: `
    <div style="
      background: ${color};
      color: ${textColor};
      border: 2px solid ${border};
      border-radius: 14px;
      padding: 10px;
      text-align: center;
      width: 120px;
      white-space: normal;
      word-wrap: break-word;
      font-size: 12px;
      line-height: 1.4;
    ">
      <div style="font-weight: bold;">
      </div>
      <div>
       ${s.tz}
      </div>
    </div>
  `
});

          return (
            <Marker
              key={s.tz}
              position={[lat, lng]}
              icon={customIcon}
            >
              <Popup>
                {s.firstName} {s.lastName}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}