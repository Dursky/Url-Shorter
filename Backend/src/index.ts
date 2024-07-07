import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoutes from "./routes/auth"
import urlRoutes from "./routes/url"
import {redirectToOriginalUrl} from "./controllers/urlController"

dotenv.config()

const app = express()

app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/url", urlRoutes)

app.get("/short/:shortId", redirectToOriginalUrl)

const PORT = process.env.PORT || 3000

if (process.env.NODE_ENV !== "test") {
	const mongoURI = `mongodb://${[process.env.SERVER_ADDRESS]}:${process.env.MONGO_PORT}/${
		process.env.MONGO_DB_NAME
	}`
	mongoose
		.connect(mongoURI)
		.then(() => app.listen(PORT, () => console.log(`-> Server running on port ${PORT}`)))
		.catch((err) => console.log(err))
}

export default app
