const jwt = require( "jsonwebtoken" )
const bcrypt = require( "bcrypt" )
const loginRouter = require( "express" ).Router()
const User = require( "../models/user" )
const { successHandler } = require("../middleware")
const { SECRET } = require("../utils/config")

loginRouter.post("/", async (req, res) => {
    const user = await User.findOne({ username: req.body.username })

    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare( req.body.password, user.passwordHash )

    if (!passwordCorrect) return res.status( 401 ).json({ err: "Invalid username or password" })

    const userForToken = {
        username: user.username,
        id: user._id
    }

    // const token = jwt.sign( userForToken, SECRET, { expiresIn: "5m" } )
    const token = jwt.sign(userForToken, SECRET)
    successHandler(res, { token, username: user.username, name: user.name }, 200)
})

module.exports = loginRouter