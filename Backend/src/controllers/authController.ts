import {Request, Response} from "express"
import jwt from "jsonwebtoken"
import {User} from "../models/User"
import {registerSchema, loginSchema} from "../validation/auth"
import mongoose from "mongoose"

export const register = async (req: Request, res: Response) => {
	try {
		const {email, password} = req.body

		const {error} = registerSchema.validate(req.body)

		if (error) return res.status(400).json({message: error.details[0].message})

		const existingUser = await User.findOne({email})
		if (existingUser) {
			return res.status(400).json({message: "User already exists"})
		}

		const newUser = new User({email, password: password})
		await newUser.save()

		const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET!, {expiresIn: "1h"})

		res.status(201).json({token})
	} catch (err) {
		if (err instanceof mongoose.Error.ValidationError) {
			return res.status(400).json({message: "Validation error", details: err.errors})
		}

		console.error(err)
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
			return res.status(404).json({message: "User not found"})
		}

		const isMatch = await user.comparePassword(password)
		if (!isMatch) {
			return res.status(401).json({message: "Invalid credentials"})
		}

		const payload = {id: user.id}
		const token = jwt.sign(payload, process.env.JWT_SECRET!, {expiresIn: "1h"})

		return res.json({token})
	} catch (err) {
		return res.status(500).json({message: "Server error"})
	}
}
