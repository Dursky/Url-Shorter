import Joi from "joi"

export const urlSchema = Joi.object({
	originalUrl: Joi.string().uri().required(),
})
