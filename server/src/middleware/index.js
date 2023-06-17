const requestLogger = require("./requestLogger")
const {
    errorHandler,
    successHandler
} = require("./responseHandler")
const tokenExtractor = require("./tokenExtractor")

const unknownEndpoint = (_, res) => {
    res.status(404).send({ err: "Unknown Endpoint" })
}

module.exports = {
    requestLogger,
    errorHandler,
    unknownEndpoint,
    successHandler,
    tokenExtractor
}
