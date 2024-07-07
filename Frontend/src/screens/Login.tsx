import React from "react"
import {useMutation} from "@tanstack/react-query"
import {login, setAuthToken} from "../api"
import {useNavigate} from "react-router-dom"
import LoginForm, {LoginFormData} from "../components/LoginForm"

interface LoginResponse {
	token: string
}

const LoginScreen: React.FC = () => {
	const navigate = useNavigate()

	const loginMutation = useMutation<LoginResponse, Error, LoginFormData>({
		mutationFn: ({email, password}) => login(email, password),
		onSuccess: (data) => {
			setAuthToken(data.token)
			navigate("/shorten")
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
