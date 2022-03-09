const mongoose = require( "mongoose" )
const uniqueValidator = require("mongoose-unique-validator")

const signatureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    signatures: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Signature"
        }
    ]
})

signatureSchema.set( "toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model( "Category", signatureSchema )
