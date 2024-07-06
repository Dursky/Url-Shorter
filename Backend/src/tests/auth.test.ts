import request from "supertest"
import app from "../index"
import mongoose, {mongo} from "mongoose"
import {User} from "../models/User"

describe("Auth Endpoints", () => {
	const testEmail = "test@example.com"
	const testPassword = "password123"

	beforeAll(async () => {
		await mongoose.connect(process.env.MONGO_URI!)

		await mongoose.connection.dropDatabase()
	})

	beforeEach(async () => {
		const collections = mongoose.connection.collections
		for (const key in collections) {
			const collection = collections[key]
			await collection.deleteMany({})
		}
	})

	afterAll(async () => {
		await mongoose.connection.close()
	})

	it("should register a new user", async () => {
		const res = await request(app)
			.post("/api/auth/register")
			.send({email: testEmail, password: testPassword})

		expect(res.statusCode).toEqual(201)
		expect(res.body).toHaveProperty("token")
	})

	it("should login an existing user", async () => {
		const user = new User({email: testEmail, password: testPassword})
		await user.save()

		const res = await request(app)
			.post("/api/auth/login")
			.send({email: testEmail, password: testPassword})

		expect(res.statusCode).toEqual(200)
		expect(res.body).toHaveProperty("token")
	})

	it("should login an existing user", async () => {
		await request(app).post("/api/auth/register").send({email: testEmail, password: testPassword})

		const response = await request(app)
			.post("/api/auth/login")
			.send({email: testEmail, password: testPassword})

		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty("token")
	})

	it("should not login with incorrect password", async () => {
		await request(app).post("/api/auth/register").send({email: testEmail, password: testPassword})

		const response = await request(app)
			.post("/api/auth/login")
			.send({email: testEmail, password: "wrongpassword"})

		expect(response.status).toBe(401)
		expect(response.body.message).toBe("Invalid credentials")
	})

	it("should not login a non-existent user", async () => {
		const response = await request(app)
			.post("/api/auth/login")
			.send({email: "nonexistent@example.com", password: "password123"})

		expect(response.status).toBe(404)
		expect(response.body.message).toBe("User not found")
	})
})
