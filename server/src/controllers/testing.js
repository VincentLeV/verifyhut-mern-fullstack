const router = require("express").Router()
const User = require("../models/user")
const Category = require("../models/category")
const Signature = require("../models/signature")

router.post("/reset", async (_, res) => {
    await User.deleteMany({})
    await Category.deleteMany({})
    await Signature.deleteMany({})

    return res.status(204).end()
})

module.exports = router