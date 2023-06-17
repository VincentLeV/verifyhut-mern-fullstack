const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const bcrypt = require("bcrypt")
const User = require("../models/user")

beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash( "secret", 10 )
    const user = new User({ username: "root", name: "Root User", passwordHash })

    await user.save()
})

describe("Get Users", () => {
    test("get all users in JSON format", async () => {
        await api
            .get("/api/users")
            .expect( 200 )
            .expect( "Content-Type", /application\/json/ )
    })
})

describe("Create Users", () => {
    test("creation succeeds with a fresh username", async () => {
        const users = await User.find({})

        const newUser = {
            username: "johndoe",
            name: "John Doe",
            password: "password"
        }

        await api
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const savedNewUser = await User.find({})
        expect(savedNewUser).toHaveLength( users.length + 1 )

        const usernames = savedNewUser.map( u => u.username )
        expect(usernames).toContain(newUser.username)
    })

    test("creation fails if username already taken", async () => {
        const users = await User.find({})

        const newUser = {
            username: "root",
            name: "Other User",
            password: "password"
        }

        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/)

        expect(result.body.message).toContain("`username` to be unique")

        const notSavedUser = await User.find({})
        expect(notSavedUser).toHaveLength(users.length)
    })

    test("creation fails if username length is shorter than 3", async () => {
        const users = await User.find({})

        const newUser = {
            username: "a",
            name: "A",
            password: "pass"
        }

        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/)

        expect(result.body.message).toContain("Error. Password is too short")

        const notSavedUser = await User.find({})
        expect(notSavedUser).toHaveLength(users.length)
    })

    test("creation fails if password is shorter than or equal to 4", async () => {
        const users = await User.find({})

        const newUser = {
            username: "user",
            name: "User",
            password: "p"
        }

        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)

        expect(result.body.message).toContain("Password is too short")

        const notSavedUser = await User.find({})
        expect(notSavedUser).toHaveLength(users.length)
    })

    test("creation fails if password is not defined", async () => {
        const users = await User.find({})

        const newUser = {
            username: "user",
            name: "User"
        }

        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)

        expect(result.body.message).toContain("Password is not defined")

        const notSavedUser = await User.find({})
        expect(notSavedUser).toHaveLength(users.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})