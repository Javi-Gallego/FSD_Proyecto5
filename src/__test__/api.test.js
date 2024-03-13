import request from "supertest"
import { dbConnection } from "../database/db.js"
import { app } from "../app.js"
import "dotenv/config"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"

let server
let id
let token
let token2
let token3

beforeAll(async () => {
    await dbConnection()

    server = app.listen(4001)
})

afterAll(async () => {
    try {
        if (server) {
        await server.close()
        console.log('Server closed')
        }

        await mongoose.connection.close()
    } catch (error) {
        console.error('Error closing server and destroying database connection:', error)
        throw error
    }
})

describe("Healthy test", () => {
    test("GET healthy", async () => {
        const { status, body } = await request(server).get("/api/healthy")
       
        expect(status).toBe(200)
        expect(body).toEqual({
            success: true,
            message: "Server is healthy",
        })
    })
})

describe('Register tests', () => {
    test('Register user', async () => {
        const { status, body } = await request(server)
            .post('/api/auth/register')
            .send({
                userName: "Toriyama",
                email: "akira@gmail.com",
                password: "123456"
            })

        id = body.id

        expect(status).toBe(201)
    })

    test('Register same user name', async () => {
        const { status } = await request(server)
            .post('/api/auth/register')
            .send({
                userName: "Toriyama",
                email: "akir@gmail.com",
                password: "123456"
            })

        expect(status).toBe(400)
    })

    test('Register same email', async () => {
        const { status } = await request(server)
            .post('/api/auth/register')
            .send({
                userName: "Torima",
                email: "akira@gmail.com",
                password: "123456"
            })

        expect(status).toBe(400)
    })

    test('Register user wihtout password', async () => {
        const { status } = await request(server)
            .post('/api/auth/register')
            .send({
                userName: "Ricardo",
                email: "ricardo@gmail.com",
                password: ""
            })

        expect(status).toBe(400)
    })

    test('Register user wihtout email', async () => {
        const { status } = await request(server)
            .post('/api/auth/register')
            .send({
                userName: "Ricardo",
                password: "123456"
            })

        expect(status).toBe(400)
    })

    test('Register user wihtout user name', async () => {
        const { status } = await request(server)
            .post('/api/auth/register')
            .send({
                email: "ricardo@gmail.com",
                password: "123456"
            })

        expect(status).toBe(400)
    })

    test('Register user with password < 6 long', async () => {
        const { status } = await request(server)
            .post('/api/auth/register')
            .send({
                userName: "Ricardo",
                email: "ricardo@gmail.com",
                password: "1234"
            })

        expect(status).toBe(400)
    })

    test('Register user with password > 10 long', async () => {
        const { status } = await request(server)
            .post('/api/auth/register')
            .send({
                userName: "Ricardo",
                email: "ricardo@gmail.com",
                password: "123456789012"
            })

        expect(status).toBe(400)
    })
})

describe("Deactivate user test", () => {
    test('Login user', async () => {
        const { status, body } = await request(server)
            .post('/api/auth/login')
            .send({
                email: "akira@gmail.com",
                password: "123456"
            })

        token = body.token

        expect(status).toBe(200)
    })

    test('Deactivate user without token', async () => {
        const { status } = await request(server)
            .put("/api/users/deactivate")

        expect(status).toBe(401)
    })

    test('Deactivate user', async () => {
        const { status } = await request(server)
            .put("/api/users/deactivate")
            .set('Authorization', `Bearer ${token}`)

        expect(status).toBe(200)
    })
})

describe("Delete User", () => {
    test('Login super admin', async () => {
        const { status, body } = await request(server)
            .post('/api/auth/login')
            .send({
                email: "super_admin@gmail.com",
                password: "123456"
            })

        token = body.token

        expect(status).toBe(200)
    })

    test('Delete user without proper auth', async () => {
        const { status } = await request(server)
            .delete(`/api/users/${id}`)

        expect(status).toBe(401)
    })

    test('Delete user as super admin', async () => {
        const { status } = await request(server)
            .delete(`/api/users/${id}`)
            .set('Authorization', `Bearer ${token}`)

        expect(status).toBe(200)
    })
})
