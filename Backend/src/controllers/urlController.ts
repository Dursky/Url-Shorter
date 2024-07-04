import {Request, Response} from "express"
import {ShortenedUrl} from "../models/ShortenedUrl"
import {nanoid} from "nanoid"

export const createShortenedUrl = async (req: Request, res: Response) => {
	const {originalUrl} = req.body
	const user = req.user

	if (!user) {
		return res.status(401).json({message: "Unauthorized"})
	}

	const shortUrl = new ShortenedUrl({
		originalUrl,
		shortUrl: nanoid(10),
		userId: user._id,
	})

	await shortUrl.save()
	res.status(201).json(shortUrl)
}

export const getUrls = async (req: Request, res: Response) => {
	const user = req.user

	if (!user) {
		return res.status(401).json({message: "Unauthorized"})
	}

	const urls = await ShortenedUrl.find({userId: user._id})
	res.status(200).json(urls)
}

export const deleteUrl = async (req: Request, res: Response) => {
	const {shortUrl} = req.params
	const user = req.user

	if (!user) {
		return res.status(401).json({message: "Unauthorized"})
	}

	const url = await ShortenedUrl.findOneAndDelete({shortUrl, userId: user._id})

	if (!url) {
		return res.status(404).json({message: "URL not found"})
	}

	res.status(200).json({message: "URL deleted"})
}
