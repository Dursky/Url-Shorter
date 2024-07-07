import React from "react"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {loginSchema} from "../../validations/loginValidation"

export interface LoginFormData {
	email: string
	password: string
}

interface LoginFormProps {
	onSubmit: (data: LoginFormData) => void
	isLoading: boolean
}

const LoginForm: React.FC<LoginFormProps> = ({onSubmit, isLoading}) => {
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<LoginFormData>({
		resolver: yupResolver(loginSchema),
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
			<button
				type="submit"
				className="w-full p-2 bg-blue-500 text-white rounded"
				disabled={isLoading}>
				{isLoading ? "Logging in..." : "Login"}
			</button>
		</form>
	)
}

export default LoginForm
