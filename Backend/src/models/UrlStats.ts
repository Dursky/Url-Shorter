import mongoose from "mongoose"

const urlStatsSchema = new mongoose.Schema(
	{
		shortUrl: {type: String, required: true, unique: true},
		visits: {type: Number, default: 0},
		lastVisited: {type: Date},
		uniqueVisitors: {type: Number, default: 0},
		visitorIPs: [{type: String}],
	},
	{timestamps: true},
)

export const UrlStats = mongoose.model("UrlStats", urlStatsSchema)
