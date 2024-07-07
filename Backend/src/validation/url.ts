import Joi from "joi"

export const urlSchema = Joi.object({
	originalUrl: Joi.string().uri().required(),
})

export const getUrlStatsSchema = Joi.object({
	shortUrl: Joi.string().required(),
})
