import {Schema, model, Document} from "mongoose"

interface IShortenedUrl extends Document {
	originalUrl: string
	shortUrl: string
	user: Schema.Types.ObjectId
}

const ShortenedUrlSchema = new Schema<IShortenedUrl>({
	originalUrl: {type: String, required: true},
	shortUrl: {type: String, required: true, unique: true},
	user: {type: Schema.Types.ObjectId, ref: "User", required: true},
})

export const ShortenedUrl = model<IShortenedUrl>("ShortenedUrl", ShortenedUrlSchema)
