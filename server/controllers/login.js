const jwt = require( "jsonwebtoken" )
const bcrypt = require( "bcrypt" )
const loginRouter = require( "express" ).Router()
const User = require( "../models/user" )
const { successHandler } = require("../middleware")
const { SECRET } = require("../utils/config")

loginRouter.post("/", async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username })
    const isCorrectPassword = await bcrypt.compare( req.body.password, user.passwordHash )

    if (user === null || !isCorrectPassword) {
        return next(new Error("unauthorized"))
    } 

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign( userForToken, SECRET, { expiresIn: "1h" } )
    // const token = jwt.sign(userForToken, SECRET)
    return successHandler(res, { token, username: user.username, name: user.name }, 200)
})

module.exports = loginRouter