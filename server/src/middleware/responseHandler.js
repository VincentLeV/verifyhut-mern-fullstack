const logger = require( "../utils/logger" )

const errorHandler = (err, _, res, next) => {
    logger.error( err.message )

    if ( err.name === "CastError" ) {
        return res.status(400).send({ message: "Malformatted Id" })
    } 
    if ( err.name === "ValidationError" ) {
        return res.status(400).json({ message: err.message })
    } 

    if ( err.name === "ReferenceError" ) {
        return res.status(400).json({ message: err.message })
    }

    if (err.name === "Error") {
        if (err.message.includes("data and salt")) {
            return res.status(400).json({ message: "Error. Password is not defined"})
        } else if (err.message.includes("password is too short")) {
            return res.status(400).json({ message: "Error. Password is too short"})
        } else if (err.message.includes("not found")) {
            return res.status(404).json({ message: "Error. Data not found"})
        } else if (err.message.includes("can't save to db")) {
            return res.status(400).json({ message: "Error. Data can't be saved to database"})
        } else if (err.message.includes("unauthorize")) {
            return res.status(401).json({ message: "Unauthorized. Invalid username or password"})
        } else if (err.message.includes("can only edit category")) {
            return res.status(400).json({ message: "Error. Can only edit signature's category"})
        } else if (err.message.includes("invalid user")) {
            return res.status(401).json({ message: "Unauthorized. Invalid user" })
        } else {
            return res.status(404).json({ message: err.message })
        }
    } 

    if (err.name === "JsonWebTokenError") {
        if (err.message.includes("invalid signature")) {
            return res.status(401).json({ message: "Unauthorized. Invalid user" })
        }
    } 
    if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Unauthorized. Session expired" }) 
    } 
    if (err.name === "MongoServerError") {
        if (err.message.includes("duplicate key error")) {
            return res.status(409).json({ message: "Error. Duplicated" }) 
        }
    }

    next(err)
}

const successHandler = (res, data, code, message) => {
    if (!message) { 
        message = "Successful operation" 
    }

    if (!data) {
        res.status(code).end()
    }

    logger.info(message)
    res.status(code).send(data).end()
}

module.exports = {
    errorHandler,
    successHandler
}
