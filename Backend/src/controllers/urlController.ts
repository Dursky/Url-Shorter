import {Request, Response} from "express"
import {ShortenedUrl} from "../models/ShortenedUrl"
import {v4 as uuidv4} from "uuid"
import {IUser} from "../models/User"
import {UrlStats} from "../models/UrlStats"

declare global {
	namespace Express {
		interface Request {
			user?: IUser
		}
	}
}
export const updateUrlStats = async (shortUrl: string, ip: string) => {
	let stats = await UrlStats.findOne({shortUrl})

	if (!stats) {
		stats = new UrlStats({shortUrl})
	}

	stats.visits += 1
	stats.lastVisited = new Date()

	if (!stats.visitorIPs.includes(ip)) {
		stats.uniqueVisitors += 1
		stats.visitorIPs.push(ip)
	}

	await stats.save()
}

export const createShortenedUrl = async (req: Request, res: Response) => {
	try {
		const {originalUrl} = req.body
		const user = req.user

		if (!user) {
			return res.status(401).json({message: "Unauthorized"})
		}

		const existingShortUrl = await ShortenedUrl.findOne({originalUrl})
		if (existingShortUrl) {
			const url = `http://${process.env.SERVER_ADDRESS}/short/${existingShortUrl.shortUrl}`
			return res.status(200).json({
				originalUrl,
				shorted: url,
			})
		}

		const generatedId = uuidv4().split("-")[0]

		const shortUrl = new ShortenedUrl({
			originalUrl,
			shortUrl: generatedId,
			userId: user._id,
		})

		await shortUrl.save()

		const url = `http://${process.env.SERVER_ADDRESS}:${process.env.PORT}/short/${generatedId}`

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

export const redirectToOriginalUrl = async (req: Request, res: Response) => {
	try {
		const {shortId} = req.params

		const shortUrl = await ShortenedUrl.findOne({shortUrl: shortId})

		if (!shortUrl) {
			return res.status(404).json({message: "Shortened URL not found"})
		}

		if (req.ip) await updateUrlStats(shortId, req.ip)

		return res.status(200).redirect(shortUrl.originalUrl)
	} catch (err) {
		console.error(err)
		return res.status(500).json({message: "Server error"})
	}
}

export const getUrlStats = async (req: Request, res: Response) => {
	try {
		const {shortUrl} = req.params
		const stats = await UrlStats.findOne({shortUrl})

		if (!stats) {
			return res.status(404).json({message: "Stats not found for this URL"})
		}

		return res.status(200).json({
			visits: stats.visits,
			uniqueVisitors: stats.uniqueVisitors,
			lastVisited: stats.lastVisited,
		})
	} catch (err) {
		console.error(err)
		return res.status(500).json({message: "Server error"})
	}
}
