import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  
  console.log("Authorization Header:", auth);

  if (!auth) {
    return res.status(401).send({ error: "Token is required" });
  }

  const token = auth.split(' ')[1]; // מפריד את Bearer מהטוקן עצמו
  console.log("Extracted Token:", token);

  if (!token) {
    return res.status(401).send({ error: "Token is invalid" });
  }

  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    if (error || !decoded) {
      console.log("JWT Error:", error);
      console.log("SECRET בעת אימות:", process.env.SECRET);

      return res.status(401).send({ error: 'Authorization failed!' });
    }

    console.log("Decoded Token:", decoded);
    req.user = decoded; // אפשר לשמור את המשתמש למקרה שתצטרכי בגוף הבקשה
    next();
  });
};