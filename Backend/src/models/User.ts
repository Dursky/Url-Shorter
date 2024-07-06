import {Schema, model, Document} from "mongoose"
import bcrypt from "bcryptjs"

export interface IUser extends Document {
	email: string
	password: string
	comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new Schema<IUser>({
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
})

UserSchema.pre<IUser>("save", async function (next) {
	if (!this.isModified("password")) return next()

	// Hashing password before save
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)

	next()
})

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
	return await bcrypt.compare(candidatePassword, this.password)
}

export const User = model<IUser>("User", UserSchema)
