const userRouter = require( "express" ).Router()
const User = require( "../models/user" )
const { successHandler, tokenExtractor } = require("../middleware")
const { encryptPassword } = require("../utils/helpers")

userRouter.get("/", async (_, res) => {
    const users = await User.find({}).populate("categories").populate("signatures")
    return successHandler(res, users, 200)
})

userRouter.get("/:id", async (req, res, next) => {
    const user = await User.findById(req.params.id).populate("categories").populate("signatures")
    return user ? successHandler(res, user, 200) : next(new Error("not found"))
})

userRouter.post("/", async (req, res, next) => {
    if ( req.body.password?.length <= 4 ) {
        return next(new Error("password is too short"))
    }

    const user = new User({
        username: req.body.username,
        name: req.body.name,
        passwordHash: await encryptPassword(req.body.password),
    })

    const savedUser = await user.save()
    return savedUser ? successHandler(res, savedUser, 201) : next(new Error("can't save to db")) 
})

userRouter.put("/:id", tokenExtractor, async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user) return next(new Error("not found")) 

    if (req.decodedToken.id !== user.id) {
        return next()
    }

    let savedUser

    if (!req.body.password) {
        savedUser = await User.findByIdAndUpdate( req.params.id, req.body, { new: true } )
    }

    if (!req.body.username) {
        if ( req.body.password?.length <= 4 ) {
            return next(new Error("password is too short"))
        }
        const passwordHash = await encryptPassword(req.body.password)
        savedUser = await User.findByIdAndUpdate( req.params.id, {passwordHash: passwordHash}, { new: true } )
    }

    if (req.body.username && req.body.password) {
        const newUser = {
            username: req.body.username,
            passwordHash: await encryptPassword(req.body.password)
        }
        savedUser = await User.findByIdAndUpdate( req.params.id, newUser, { new: true } )
    }

    return savedUser ? successHandler(res, savedUser, 200) : next(new Error("can't save to db"))
})

userRouter.delete("/:id", async (req, res, next) => {
    const user = await User.findByIdAndRemove(req.params.id)
    return user ? successHandler(res, user, 204) : next(new Error("not found")) 
})

module.exports = userRouter