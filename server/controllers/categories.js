const categoryRouter = require( "express" ).Router()
const Category = require( "../models/category" )
const { successHandler } = require("../middleware")

categoryRouter.get("/", async (_, res) => {
    const categories = await Category.find({})
    successHandler(res, categories, 200)
})

categoryRouter.get("/:id", async (req, res, next) => {
    const category = await Category.findById(req.params.id)
    category ? successHandler(res, category, 200) : next(new Error("not found"))
})

categoryRouter.post("/", async (req, res, next) => {
    const category = new Category({ name: req.body.name })
    const savedCategory = await category.save()
    savedCategory ? successHandler(res, savedCategory, 201) : next(new Error("can't save to db")) 
})

categoryRouter.put("/:id", async (req, res, next) => {
    const category = await Category.findByIdAndUpdate( req.params.id, req.body, { new: true } )
    category ? successHandler(res, category, 200) : next(new Error("can't save to db"))
})

categoryRouter.delete("/:id", async (req, res, next) => {
    const category = await Category.findByIdAndRemove(req.params.id)
    category ? successHandler(res, category, 204) : next(new Error("not found")) 
})

module.exports = categoryRouter