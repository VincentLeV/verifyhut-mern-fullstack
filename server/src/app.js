const config = require("./utils/config")
const express = require("express")
require("express-async-errors")
const app = express()
const cors = require( "cors" )
const {
    requestLogger,
    errorHandler,
    unknownEndpoint 
} = require( "./middleware" )
const logger = require( "./utils/logger" )
const mongoose = require( "mongoose" )
const userRouter = require( "./controllers/users" )
const loginRouter = require("./controllers/login")
const categoryRouter = require("./controllers/categories")
const signatureRouter = require("./controllers/signatures")

logger.info( "Connecting to", config.MONGODB_URI )

mongoose
    .connect( config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( () => logger.info("Connected to MongoDB") )
    .catch( err => logger.error("Error connecting to MongoDB:", err.message) )

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use( "/api/users", userRouter )
app.use( "/api/login", loginRouter )
app.use( "/api/categories", categoryRouter )
app.use( "/api/signatures", signatureRouter )

if (process.env.NODE_ENV === "test") {  
    const testingRouter = require("./controllers/testing")  
    app.use("/api/testing", testingRouter)
}

app.get( "/", (_, res) => {
    res.send("Server is running")
})

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
