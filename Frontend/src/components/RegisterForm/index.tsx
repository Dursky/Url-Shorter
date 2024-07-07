import React from "react"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {registerSchema} from "../../validations/registerValidation"

export interface RegisterFormData {
	email: string
	password: string
	confirmPassword: string
}

interface RegisterFormProps {
	onSubmit: (data: RegisterFormData) => void
	isLoading: boolean
}

const RegisterForm: React.FC<RegisterFormProps> = ({onSubmit, isLoading}) => {
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<RegisterFormData>({
		resolver: yupResolver(registerSchema),
	})

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div>
				<input
					{...register("email")}
					type="email"
					placeholder="Email"
					className="w-full p-2 border rounded"
				/>
				{errors.email && <p className="text-red-500">{errors.email.message}</p>}
			</div>
			<div>
				<input
					{...register("password")}
					type="password"
					placeholder="Password"
					className="w-full p-2 border rounded"
				/>
				{errors.password && <p className="text-red-500">{errors.password.message}</p>}
			</div>
			<div>
				<input
					{...register("confirmPassword")}
					type="password"
					placeholder="Confirm Password"
					className="w-full p-2 border rounded"
				/>
				{errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
			</div>
			<button
				type="submit"
				className="w-full p-2 bg-blue-500 text-white rounded"
				disabled={isLoading}>
				{isLoading ? "Registering..." : "Register"}
			</button>
		</form>
	)
}

export default RegisterForm
