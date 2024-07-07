import request from "supertest"
import app from "../index"
import mongoose from "mongoose"
import {MongoMemoryServer} from "mongodb-memory-server"
import {User} from "../models/User"
import {ShortenedUrl} from "../models/ShortenedUrl"
import {UrlStats} from "../models/UrlStats"

describe("URL Shortener API", () => {
	let authToken: string
	let mongoServer: MongoMemoryServer
	const testEmail = "test@example.com"
	const testPassword = "password123"

	beforeAll(async () => {
		mongoServer = await MongoMemoryServer.create()
		const uri = mongoServer.getUri()

		await mongoose.connect(uri)
	})

	beforeEach(async () => {
		const collections = mongoose.connection.collections
		for (const key in collections) {
			const collection = collections[key]
			await collection.deleteMany({})
		}
	})

	afterAll(async () => {
		await mongoose.connection.dropDatabase()
		await mongoose.connection.close()
		await mongoServer.stop()
	})

	it("should create a shortened URL", async () => {
		const user = new User({email: testEmail, password: testPassword})
		await user.save()

		const loginResponse = await request(app)
			.post("/api/auth/login")
			.send({email: testEmail, password: testPassword})

		const response = await request(app)
			.post("/api/url")
			.set("Authorization", `Bearer ${loginResponse.body.token}`)
			.send({originalUrl: "https://example.com/test"})

		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty("originalUrl")
		expect(response.body).toHaveProperty("shorted")
	})

	it("should return 404 when trying to access non-existing short URL", async () => {
		const response = await request(app)
			.get("/api/url/abc123")
			.set("Authorization", `Bearer ${authToken}`)

		expect(response.status).toBe(404)
	})

	it("should have the same short URL if trying to duplicate URL", async () => {
		const user = new User({email: testEmail, password: testPassword})
		await user.save()

		const loginResponse = await request(app)
			.post("/api/auth/login")
			.send({email: testEmail, password: testPassword})

		const response1 = await request(app)
			.post("/api/url")
			.set("Authorization", `Bearer ${loginResponse.body.token}`)
			.send({
				originalUrl: "https://example.com/test",
			})

		const response2 = await request(app)
			.post("/api/url")
			.set("Authorization", `Bearer ${loginResponse.body.token}`)
			.send({originalUrl: "https://example.com/test"})

		expect(response1.status).toBe(200)
		expect(response1.body).toHaveProperty("originalUrl")
		expect(response1.body).toHaveProperty("shorted")

		expect(response2.status).toBe(200)
		expect(response2.body).toHaveProperty("originalUrl")
		expect(response2.body).toHaveProperty("shorted")

		expect(response1.body.shorted).toBe(response2.body.shorted)
	})

	it("should return 401 when unauthorized user tries to shorten URL", async () => {
		const response = await request(app)
			.post("/api/url")
			.send({originalUrl: "https://example.com/test"})

		expect(response.status).toBe(401)
	})

	it("should redirect to the original URL when accessing a valid short URL", async () => {
		const user = new User({email: testEmail, password: testPassword})
		await user.save()

		const shortUrl = new ShortenedUrl({
			originalUrl: "https://example.com/test",
			shortUrl: "testshort",
			userId: user._id,
		})
		await shortUrl.save()

		const response = await request(app).get("/short/testshort")

		expect(response.status).toBe(302)
		expect(response.header.location).toBe("https://example.com/test")
	})

	// STATISTICS
	it("should update statistics when accessing a shortened URL", async () => {
		const user = new User({email: testEmail, password: testPassword})
		await user.save()

		const shortUrl = new ShortenedUrl({
			originalUrl: "https://example.com/test",
			shortUrl: "testshort",
			userId: user._id,
		})
		await shortUrl.save()

		// First visit
		await request(app).get("/short/testshort")

		// Second visit
		await request(app).get("/short/testshort")

		const stats = await UrlStats.findOne({shortUrl: "testshort"})
		expect(stats).toBeDefined()
		expect(stats?.visits).toBe(2)
		expect(stats?.uniqueVisitors).toBe(1)
	})

	it("should return correct statistics for a shortened URL", async () => {
		const user = new User({email: testEmail, password: testPassword})
		await user.save()

		const loginResponse = await request(app)
			.post("/api/auth/login")
			.send({email: testEmail, password: testPassword})

		const shortUrl = new ShortenedUrl({
			originalUrl: "https://example.com/test",
			shortUrl: "testshort",
			userId: user._id,
		})
		await shortUrl.save()

		// Simulate some visits
		await request(app).get("/short/testshort")
		await request(app).get("/short/testshort")

		const response = await request(app)
			.get("/api/url/stats/testshort")
			.set("Authorization", `Bearer ${loginResponse.body.token}`)

		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty("visits", 2)
		expect(response.body).toHaveProperty("uniqueVisitors", 1)
		expect(response.body).toHaveProperty("lastVisited")
	})
})
