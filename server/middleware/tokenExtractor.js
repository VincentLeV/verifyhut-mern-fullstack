const jwt = require("jsonwebtoken")
const { SECRET } = require("../utils/config")

const tokenExtractor = (req, _, next) => {
    const token = req.get("authorization") || req.get("x-access-token")
    if (!token) next(new Error("unauthorized")) 

    if (token.toLowerCase().startsWith("bearer")) {
        req.decodedToken = jwt.verify(token.substring(7), SECRET)
    } else {
        req.decodedToken = jwt.verify(token, SECRET)
    }
    next()
}

module.exports = tokenExtractor