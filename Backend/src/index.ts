import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoutes from "./routes/auth"
import urlRoutes from "./routes/url"

dotenv.config()

const app = express()

app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/url", urlRoutes)

const PORT = process.env.PORT || 3000

mongoose
	.connect(process.env.MONGO_URI!)
	.then(() => app.listen(PORT, () => console.log(`-> Server running on port ${PORT}`)))
	.catch((err) => console.log(err))

export default app
