import {Request, Response} from "express"
import jwt from "jsonwebtoken"
import {User} from "../models/User"
import Joi from "joi"
import {registerSchema, loginSchema} from "../validation/auth"

export const register = async (req: Request, res: Response) => {
	try {
		const {error} = registerSchema.validate(req.body)
		if (error) return res.status(400).json({message: error.details[0].message})

		const {email, password} = req.body

		let user = await User.findOne({email})
		if (user) {
			return res.status(400).json({message: "User already exists"})
		}

		user = new User({email, password})
		await user.save()

		const payload = {id: user.id}
		const token = jwt.sign(payload, process.env.JWT_SECRET!, {expiresIn: "1h"})

		res.status(201).json({token})
	} catch (err) {
		res.status(500).json({message: "Server error"})
	}
}

export const login = async (req: Request, res: Response) => {
	try {
		const {error} = loginSchema.validate(req.body)

		if (error) return res.status(400).json({message: error.details[0].message})

		const {email, password} = req.body

		const user = await User.findOne({email})
		if (!user) {
			return res.status(400).json({message: "Invalid credentials"})
		}

		const isMatch = await user.comparePassword(password)
		if (!isMatch) {
			return res.status(400).json({message: "Invalid credentials"})
		}

		const payload = {id: user.id}
		const token = jwt.sign(payload, process.env.JWT_SECRET!, {expiresIn: "1h"})

		res.json({token})
	} catch (err) {
		res.status(500).json({message: "Server error"})
	}
}
