import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"
import {User} from "../models/User"

interface DecodedToken {
	id: string
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.header("Authorization")?.replace("Bearer ", "")

		if (!token) {
			return res.status(401).json({message: "No token, authorization denied"})
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken
		const user = await User.findById(decoded.id)

		if (!user) {
			return res.status(401).json({message: "User not found"})
		}

		req.user = user

		next()
	} catch (err) {
		res.status(401).json({message: "Token is not valid"})
	}
}
