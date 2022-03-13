const mongoose = require( "mongoose" )
const uniqueValidator = require("mongoose-unique-validator")

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    signatures: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Signature"
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

categorySchema.plugin(uniqueValidator)

categorySchema.set( "toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model( "Category", categorySchema )
