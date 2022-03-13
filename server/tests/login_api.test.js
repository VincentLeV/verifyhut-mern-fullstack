const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const bcrypt = require("bcrypt")
const User = require("../models/user")

beforeEach( async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash( "secret", 10 )
    const user = new User({ username: "root", name: "Root User", passwordHash })

    await user.save()
})

describe( "Login", () => {
    test( "succeeds if the password is correct and return token", async () => {
        const user = { username: "root", password: "secret" }
        const result = await api
            .post("/api/login")
            .send(user)
            .expect(200)
            .expect("Content-Type", /application\/json/)

        expect(result.body.token).toBeTruthy()
    })

    test("fails if the password is incorrect", async () => {
        const user = { username: "root", password: "notsecret" }
        const result = await api
            .post( "/api/login" )
            .send( user )
            .expect( 401 )
            .expect( "Content-Type", /application\/json/ )

        expect( result.body.message ).toContain( "Invalid username or password" )
    })
})

afterAll(() => {
    mongoose.connection.close()
})