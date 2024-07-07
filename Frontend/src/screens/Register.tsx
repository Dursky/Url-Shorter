import React from "react"
import {useMutation} from "@tanstack/react-query"
import {register as apiRegister, setAuthToken} from "../api"
import {useNavigate} from "react-router-dom"
import RegisterForm, {RegisterFormData} from "../components/RegisterForm"

interface RegisterResponse {
	token: string
}

const RegisterScreen: React.FC = () => {
	const navigate = useNavigate()

	const registerMutation = useMutation<RegisterResponse, Error, RegisterFormData>({
		mutationFn: (data: RegisterFormData) => apiRegister(data.email, data.password),
		onSuccess: (data) => {
			setAuthToken(data.token)
			navigate("/shorten")
		},
	})

	const handleSubmit = (data: RegisterFormData) => {
		registerMutation.mutate(data)
	}

	return (
		<div>
			<h1>Register</h1>
			<RegisterForm onSubmit={handleSubmit} isLoading={registerMutation.isPending} />
		</div>
	)
}

export default RegisterScreen
