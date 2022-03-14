const signatureRouter = require( "express" ).Router()
const Signature = require( "../models/signature" )
const User = require("../models/user")
const Category = require("../models/category")
const { successHandler, tokenExtractor } = require("../middleware")

signatureRouter.get("/", async (_, res) => {
    const signatures = await Signature.find({})
    successHandler(res, signatures, 200)
})

signatureRouter.get("/uncategorized/user/:id", async (req, res) => {
    const signatures = await Signature.find({ category: undefined, user: req.params.id })
    successHandler(res, signatures, 200)
})

signatureRouter.get("/:id", async (req, res, next) => {
    const signature = await Signature.findById(req.params.id)
    signature ? successHandler(res, signature, 200) : next(new Error("not found"))
})

signatureRouter.post("/", tokenExtractor, async (req, res, next) => {
    const user = await User.findById( req.decodedToken.id )
    if (!user) next(new Error("not found"))

    let category
    const signature = new Signature({ 
        image: req.body.image,
        svg: req.body.svg,
        signer_name: req.body.signer_name,
        reason: req.body.reason,    
        user: user.id
    })

    if (req.body.category) {
        category = await Category.findById(req.body.category)
        if (!category) next(new Error("not found"))
        signature.category = category.id
    }

    const savedSignature = await signature.save()
    user.signatures = await user.signatures.concat(savedSignature._id)
    await user.save({ validateModifiedOnly: true })

    if (req.body.category) {
        category.signatures = await category.signatures.concat(savedSignature._id)
        await category.save({ validateModifiedOnly: true })
    }
    
    savedSignature ? successHandler(res, savedSignature, 201) : next(new Error("can't save to db")) 
})

signatureRouter.delete("/:id", tokenExtractor, async (req, res, next) => {
    const user = await User.findById(req.decodedToken.id)
    const signature = await Signature.findById(req.params.id)
    if (!signature) next(new Error("not found"))
    const category = await Category.findById(signature.category)

    if (signature.user.toString() === req.decodedToken.id && category) {
        if (!category) next(new Error("not found"))
        await Signature.findByIdAndRemove(req.params.id)
        const userIndex = user.signatures.indexOf(req.params.id)
        const categoryIndex = category.signatures.indexOf(req.params.id)
        user.signatures.splice(userIndex, 1)
        category.signatures.splice(categoryIndex, 1)
        await user.save({ validateModifiedOnly: true })
        await category.save({ validateModifiedOnly: true })
        return res.status(204).end()
    } else if (signature.user.toString() === req.decodedToken.id && !category) {
        await Signature.findByIdAndRemove(req.params.id)
        const userIndex = user.signatures.indexOf(req.params.id)
        user.signatures.splice(userIndex, 1)
        await user.save({ validateModifiedOnly: true })
        return res.status(204).end()
    } else {
        return next(new Error("invalid signature"))
    } 
})

module.exports = signatureRouter