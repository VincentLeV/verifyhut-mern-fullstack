const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const bcrypt = require("bcrypt")
const Category = require("../models/category")
const User = require("../models/user")
const Signature = require("../models/signature")

let token = null
let userId = null
let categoryId = null

beforeAll(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash( "password", 10 )
    const user = new User({ username: "user1234", passwordHash })
    const savedUser = await user.save()
    userId = savedUser._id

    const result = await api
        .post("/api/login")
        .send({ username: "user1234", password: "password" })
        .expect(200)
        .expect("Content-Type", /application\/json/)

    token = result.body.token
})

beforeEach(async () => {
    await Signature.deleteMany({})
    await Category.deleteMany({})

    const category = new Category({ name: "Stuff", user: userId })
    const savedCategory = await category.save()
    categoryId = savedCategory._id

    const signature = new Signature({ 
        image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD", 
        svg: "<svg></svg>",
        signer_name: "Root User", 
        reason: "Pay for stuff",
        category: categoryId,
        user: userId
    })
    
    await signature.save()
})

describe("Get Signature", () => {
    test("get all signatures in JSON format", async () => {
        await api
            .get("/api/signatures")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })

    test("get a single signature", async () => {
        const signatures = await Signature.find({})

        const result = await api
            .get(`/api/signatures/${signatures[0]._id}`)
            .expect(200)
            .expect("Content-Type", /application\/json/)

            expect(result.body.signer_name).toEqual("Root User")
            expect(result.body.reason).toEqual("Pay for stuff")
    })
})

describe("Create Signature", () => {
    test("creation fail without authorization", async () => {
        const signature = { 
            image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD", 
            svg: "<svg></svg>",
            signer_name: "Root User", 
            reason: "Pay for stuff"
        }

        const result = await api
            .post("/api/signatures")
            .send(signature)
            .expect(401)
            .expect("Content-Type", /application\/json/)

        expect(result.body.message).toEqual("Unauthorized. Invalid username or password")
    })

    test("creation succeeds with an image & without category", async () => {
        const signatures = await Signature.find({})
        const newSignature = { 
            image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABEGWAgAAAQABAAD", 
            svg: "<svg></svg>",
            signer_name: "Root User", 
            reason: "Pay for stuff"
        }

        await api
            .post("/api/signatures")
            .send(newSignature)
            .set("Authorization", `Bearer ${token}`)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const savedSignature = await Signature.find({})
        expect(savedSignature).toHaveLength( signatures.length + 1 )

        const reasons = savedSignature.map( r => r.reason )
        expect(reasons).toContain(newSignature.reason)
    })

    test("creation succeeds with category", async () => {
        const signatures = await Signature.find({})
        const newSignature = { 
            image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABEGWAgAAAQABAAD", 
            svg: "<svg></svg>",
            signer_name: "Root User", 
            reason: "Exchange stuff",
            category: categoryId
        }

        const result = await api
            .post("/api/signatures")
            .send(newSignature)
            .set("Authorization", `Bearer ${token}`)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const savedSignature = await Signature.find({})
        expect(savedSignature).toHaveLength( signatures.length + 1 )

        const reasons = savedSignature.map( r => r.reason )
        expect(reasons).toContain(newSignature.reason)
        expect(result.body.category).toBeDefined()
    })

    test("patch signature succeed", async () => {
        const signature = new Signature({ 
            image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAGWEIGHAD",
            svg: "<svg></svg>", 
            signer_name: "Root User", 
            reason: "Bought Stuff",
            user: userId
        })
        
        await signature.save()

        const result = await api
            .patch(`/api/signatures/${signature.id}`)
            .send({ category: categoryId })
            .set("Authorization", `Bearer ${token}`)
            .expect(200)
            .expect("Content-Type", /application\/json/)

            expect(result.body.category.toString()).toEqual(categoryId.toString())
    })

    test("modify signature fails", async () => {
        await api
            .put("/api/signatures")
            .expect(404)
            .expect("Content-Type", /application\/json/)
    })
})

afterAll(() => {    
    mongoose.connection.close()
})