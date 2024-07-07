import React, {useState} from "react"
import {useMutation} from "@tanstack/react-query"
import {login, setAuthToken} from "../api"

interface LoginResponse {
	token: string
}

const LoginForm: React.FC = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const loginMutation = useMutation<LoginResponse, Error, {email: string; password: string}>(
		({email, password}) => login(email, password),
		{
			onSuccess: (data) => {
				setAuthToken(data.token)
			},
		},
	)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		loginMutation.mutate({email, password})
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<input
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Email"
				className="w-full p-2 border rounded"
			/>
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
				className="w-full p-2 border rounded"
			/>
			<button
				type="submit"
				className="w-full p-2 bg-blue-500 text-white rounded"
				disabled={loginMutation.isLoading}>
				{loginMutation.isLoading ? "Logging in..." : "Login"}
			</button>
		</form>
	)
}

export default LoginForm
