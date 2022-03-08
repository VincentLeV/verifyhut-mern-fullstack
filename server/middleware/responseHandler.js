const logger = require( "../utils/logger" )

const errorHandler = (err, _, res, next) => {
    logger.error( err.message )

    if ( err.name === "CastError" ) {
        return res.status(400).send({ err: "Malformatted Id" })
    } else if ( err.name === "ValidationError" ) {
        return res.status(400).json({ err: err.message })
    } else if (err.name === "Error") {
        if (err.message.includes("data and salt")) {
            return res.status(400).json({ err: "Error. Password is not defined"})
        } else if (err.message.includes("password is too short")) {
            return res.status(400).json({ err: "Error. Password is too short"})
        } else if (err.message.includes("not found")) {
            return res.status(400).json({ err: "Error. Data not found"})
        } else if (err.message.includes("can't save to db")) {
            return res.status(400).json({ err: "Error. Data can't be saved to database"})
        } else if (err.message.includes("unauthorize")) {
            return res.status(401).json({ err: "Unauthorized. Invalid username or password"})
        }
    } else if (err.name === "JsonWebTokenError") {
        if (err.message.includes("invalid signature")) {
            return res.status(401).json({ err: "Unauthorized. Invalid user" })
        }
    } if (err.name === "TokenExpiredError") {
        return res.status(401).json({ err: "Unauthorized. Token expired" }) 
    }

    next(err)
}

const successHandler = (res, data, code, message) => {
    if (!message) { 
        message = "Successful operation" 
    }

    logger.info(message)
    res.status(code).send(data).end()
}

module.exports = {
    errorHandler,
    successHandler
}
