import jwt from "jsonwebtoken"

export const checkAuth = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).send({ error:  "token חסר " })
    }
    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, process.env.SECRET)

        req.user = decoded
        next()

    } catch (err) {
        return res.status(401).send({ error: "שגוי token" })
    }
}

export const isTeacher = (req, res, next) => {

    if (req.user.role !== "teacher") {
        return res.status(403).send({ error: "מורות בלבד!" })
    }

    next()
}