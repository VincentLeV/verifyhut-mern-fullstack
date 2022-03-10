const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const bcrypt = require("bcrypt")
const Category = require("../models/category")
const User = require("../models/user")

let token = null
let userId = null

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
    await Category.deleteMany({})
    const category = new Category({ name: "General", user: userId })
    await category.save()
})

describe("Get Category", () => {
    test("get all categories in JSON format", async () => {
        await api
            .get("/api/categories")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })

    test("get a single category", async () => {
        const categories = await Category.find({})

        const result = await api
            .get(`/api/categories/${categories[0]._id}`)
            .expect( 200 )
            .expect( "Content-Type", /application\/json/ )

            expect(result.body.name).toEqual("General")
    })
})

describe("Create Category", () => {
    test("creation fail without authorization", async () => {
        const newCategory = { name: "Delivery" }

        const result = await api
            .post("/api/categories")
            .send(newCategory)
            .expect(401)
            .expect("Content-Type", /application\/json/)

        expect(result.body.err).toEqual("Unauthorized. Invalid username or password")
    })

    test("creation succeeds with a name", async () => {
        const categories = await Category.find({})
        const newCategory = { name: "Delivery" }

        await api
            .post("/api/categories")
            .send(newCategory)
            .set("Authorization", `Bearer ${token}`)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const savedNewCategory = await Category.find({})
        expect(savedNewCategory).toHaveLength( categories.length + 1 )

        const names = savedNewCategory.map( c => c.name )
        expect(names).toContain(newCategory.name)
    })

    test("creation fails if name already taken", async () => {
        const categories = await Category.find({})

        const newCategory = { name: "General" }

        const result = await api
            .post("/api/categories")
            .send(newCategory)
            .set("Authorization", `Bearer ${token}`)
            .expect(400)
            .expect("Content-Type", /application\/json/)

        expect(result.body.err).toContain("Error. Duplicated")

        const notSavedCategory = await Category.find({})
        expect(notSavedCategory).toHaveLength(categories.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})