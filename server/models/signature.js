const mongoose = require( "mongoose" )

const signatureSchema = new mongoose.Schema({
    image: {
        type: Buffer,
        required: true
    },
    signer_name: {
        type: String,
        required: true
    },
    reason: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, { timestamps: true })

signatureSchema.set( "toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model( "Signature", signatureSchema )
