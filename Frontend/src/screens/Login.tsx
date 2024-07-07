import React from "react"
import {useMutation} from "@tanstack/react-query"
import {login, setAuthToken} from "../api"
import {useLocation, useNavigate} from "react-router-dom"
import LoginForm, {LoginFormData} from "../components/LoginForm"

interface LoginResponse {
	token: string
}

const LoginScreen: React.FC = () => {
	const navigate = useNavigate()
	const location = useLocation()

	const loginMutation = useMutation<LoginResponse, Error, LoginFormData>({
		mutationFn: ({email, password}) => login(email, password),
		onSuccess: (data) => {
			setAuthToken(data.token)
			localStorage.setItem("token", data.token) // Zapisz token w localStorage
			const origin = (location.state as any)?.from?.pathname || "/shorten"
			navigate(origin)
		},
	})

	const handleSubmit = (data: LoginFormData) => {
		loginMutation.mutate(data)
	}

	return (
		<div>
			<h1>Login</h1>
			<LoginForm onSubmit={handleSubmit} isLoading={loginMutation.isPending} />
		</div>
	)
}

export default LoginScreen
