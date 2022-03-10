const categoryRouter = require( "express" ).Router()
const Category = require("../models/category")
const User = require("../models/user")
const { successHandler, tokenExtractor } = require("../middleware")

categoryRouter.get("/", async (_, res) => {
    const categories = await Category.find({})
    successHandler(res, categories, 200)
})

categoryRouter.get("/:id", async (req, res, next) => {
    const category = await Category.findById(req.params.id)
    category ? successHandler(res, category, 200) : next(new Error("not found"))
})

categoryRouter.post("/", tokenExtractor, async (req, res, next) => {
    const user = await User.findById(req.decodedToken.id)
    if (!user) next(new Error("not found"))

    const category = new Category({ name: req.body.name, user: user.id })
    const savedCategory = await category.save()
    user.categories = await user.categories.concat(savedCategory._id)
    await user.save()

    savedCategory ? successHandler(res, savedCategory, 201) : next(new Error("can't save to db")) 
})

categoryRouter.put("/:id", tokenExtractor, async (req, res, next) => {
    const user = await User.findById(req.decodedToken.id)
    if (!user) next(new Error("not found"))
    const category = await Category.findById(req.params.id)
    if (!category) next(new Error("not found"))

    if (category.user.toString() === req.decodedToken.id) {
        const updatedCategory = await Category.findByIdAndUpdate( req.params.id, req.body, { new: true } )
        updatedCategory ? successHandler(res, updatedCategory, 200) : next(new Error("can't save to db"))
    } else {
        return next(new Error("invalid signature"))
    }  

})

categoryRouter.delete("/:id", tokenExtractor, async (req, res, next) => {
    const user = await User.findById(req.decodedToken.id)
    if (!user) next(new Error("not found"))
    const category = await Category.findById(req.params.id)
    if (!category) next(new Error("not found"))

    if (category.user.toString() === req.decodedToken.id) {
        await Category.findByIdAndRemove(req.params.id)
        const index = user.categories.indexOf(req.params.id)
        user.categories.splice(index, 1)
        await user.save()
        return successHandler(res, category, 204)
    } else {
        return next(new Error("invalid signature"))
    }  
})

module.exports = categoryRouter