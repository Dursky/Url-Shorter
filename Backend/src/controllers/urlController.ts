import {Request, Response} from "express"
import {ShortenedUrl} from "../models/ShortenedUrl"
import {v4 as uuidv4} from "uuid"
import {IUser} from "../models/User"

declare global {
	namespace Express {
		interface Request {
			user?: IUser
		}
	}
}

export const createShortenedUrl = async (req: Request, res: Response) => {
	try {
		const {originalUrl} = req.body

		const user = req.user

		if (!user) {
			return res.status(401).json({message: "Unauthorized"})
		}

		const generatedId = uuidv4().split("-")[0]

		const shortUrl = new ShortenedUrl({
			originalUrl,
			shortUrl: generatedId,
			userId: user._id,
		})

		await shortUrl.save()

		const url = `http://${process.env.SERVER_ADDRESS}/short/${generatedId}`

		return res.status(200).json({
			originalUrl,
			shorted: url,
		})
	} catch (err) {
		console.error(err)
		return res.status(500).json({message: "Server error"})
	}
}

export const getUrls = async (req: Request, res: Response) => {
	try {
		const user = req.user

		if (!user) {
			return res.status(401).json({message: "Unauthorized"})
		}

		const urls = await ShortenedUrl.find({userId: user._id})
		return res.status(200).json(urls)
	} catch (err) {
		console.error(err)
		return res.status(500).json({message: "Server error"})
	}
}

export const deleteUrl = async (req: Request, res: Response) => {
	try {
		const {shortUrl} = req.params
		const user = req.user

		if (!user) {
			return res.status(401).json({message: "Unauthorized"})
		}

		const url = await ShortenedUrl.findOneAndDelete({shortUrl, userId: user._id})

		if (!url) {
			return res.status(404).json({message: "URL not found"})
		}

		return res.status(200).json({message: "URL deleted"})
	} catch (err) {
		console.error(err)
		return res.status(500).json({message: "Server error"})
	}
}
