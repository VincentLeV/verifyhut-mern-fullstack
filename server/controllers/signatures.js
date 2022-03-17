const signatureRouter = require( "express" ).Router()
const Signature = require( "../models/signature" )
const User = require("../models/user")
const Category = require("../models/category")
const { successHandler, tokenExtractor } = require("../middleware")

signatureRouter.get("/", async (_, res) => {
    const signatures = await Signature.find({})
    return successHandler(res, signatures, 200)
})

signatureRouter.get("/uncategorized/user/:id", async (req, res) => {
    const signatures = await Signature.find({ category: undefined, user: req.params.id })
    return successHandler(res, signatures, 200)
})

signatureRouter.get("/:id", async (req, res, next) => {
    const signature = await Signature.findById(req.params.id)
    return signature ? successHandler(res, signature, 200) : next(new Error("not found"))
})

signatureRouter.post("/", tokenExtractor, async (req, res, next) => {
    const user = await User.findById( req.decodedToken.id )
    if (!user) return next(new Error("not found"))

    let category
    let savedSignature
    const signature = new Signature({ 
        image: req.body.image,
        svg: req.body.svg,
        signer_name: req.body.signer_name,
        reason: req.body.reason,    
        user: user.id
    })

    if (req.body.category) {
        category = await Category.findById(req.body.category)
        if (!category) return next(new Error("not found"))
        signature.category = category.id
        savedSignature = await signature.save()
        category.signatures = await category.signatures.concat(savedSignature._id)
        await category.save({ validateModifiedOnly: true })
    } else if (!req.body.category) {
        savedSignature = await signature.save()
        user.signatures = await user.signatures.concat(savedSignature._id)
        await user.save({ validateModifiedOnly: true })
    }

    return savedSignature ? successHandler(res, savedSignature, 201) : next(new Error("can't save to db")) 
})

signatureRouter.patch("/:id", tokenExtractor, async (req, res, next) => {
    const user = await User.findById(req.decodedToken.id)
    if (!user) return next(new Error("not found"))
    const signature = await Signature.findById(req.params.id)
    if (!signature) return next(new Error("not found"))

    const { category, fromCategory, ...others } = req.body

    if (
        Object.keys(others).length > 0 || 
        Object.keys(req.body).findIndex(x => x === "category") === -1
    ) {
        return next(new Error("can only edit category"))
    }

    if (signature.user.toString() === req.decodedToken.id) {
        if (!fromCategory && category) {
            const categoryFromDB = await Category.findById(req.body.category)
            if (!categoryFromDB) return next(new Error("not found"))

            signature.category = req.body.category
            const updatedSignature = await Signature.findByIdAndUpdate( req.params.id, signature, { new: true } )

            categoryFromDB.signatures = await categoryFromDB.signatures.concat(updatedSignature.id)
            const updatedCategory = await categoryFromDB.save({ validateModifiedOnly: true })
            if (!updatedCategory) return next(new Error("can't save to db"))

            return updatedSignature ? successHandler(res, updatedSignature, 200) : next(new Error("can't save to db"))
        } else if (fromCategory && !category) {
            const categoryFromDB = await Category.findById(req.body.fromCategory)
            if (!categoryFromDB) return next(new Error("not found"))

            signature.category = undefined
            const updatedSignature = await signature.save()

            const index = categoryFromDB.signatures.findIndex(x => x.id === signature.id)
            categoryFromDB.signatures.splice(index, 1)
            const updatedCategory = await categoryFromDB.save({ validateModifiedOnly: true })
            if (!updatedCategory) return next(new Error("can't save to db"))

            return updatedSignature ? successHandler(res, signature, 200) : next(new Error("can't save to db"))
        } else if (fromCategory && category) {
            const fromCategoryFromDB = await Category.findById(req.body.fromCategory)
            const toCategoryFromDB = await Category.findById(req.body.category)
            if (!fromCategoryFromDB) return next(new Error("not found"))
            if (!toCategoryFromDB) return next(new Error("not found"))

            const index = fromCategoryFromDB.signatures.findIndex(x => x.id === signature.id)
            fromCategoryFromDB.signatures.splice(index, 1)
            const updatedFCategory = await fromCategoryFromDB.save({ validateModifiedOnly: true })
            toCategoryFromDB.signatures = await toCategoryFromDB.signatures.concat(signature.id)
            const updatedTCategory = await toCategoryFromDB.save({ validateModifiedOnly: true })
            if (!updatedFCategory) next(new Error("can't save to db"))

            return updatedTCategory ? successHandler(res, updatedTCategory, 200) : next(new Error("can't save to db"))
        }
    } else {
        return next(new Error("invalid user"))
    }
})

signatureRouter.delete("/:id", tokenExtractor, async (req, res, next) => {
    const user = await User.findById(req.decodedToken.id)
    const signature = await Signature.findById(req.params.id)
    if (!signature) return next(new Error("not found"))
    const category = await Category.findById(signature.category)

    if (signature.user.toString() === req.decodedToken.id && category) {
        if (!category) return next(new Error("not found"))
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
        return next(new Error("invalid user"))
    } 
})

module.exports = signatureRouter