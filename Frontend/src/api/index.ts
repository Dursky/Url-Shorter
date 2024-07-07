import axios from "axios"

const API_URL = "http://127.0.0.1:3000/api"

export const api = axios.create({
	baseURL: API_URL,
})

export const setAuthToken = (token: string) => {
	api.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

export const clearAuthToken = () => {
	delete api.defaults.headers.common["Authorization"]
}

export const login = async (email: string, password: string) => {
	const response = await api.post("/auth/login", {email, password})
	return response.data
}

export const register = async (email: string, password: string) => {
	const response = await api.post("/auth/register", {email, password})
	return response.data
}

export const shortenUrl = async (originalUrl: string) => {
	const response = await api.post("/url", {originalUrl})
	return response.data
}

export const getUrlStats = async (shortUrl: string) => {
	const response = await api.get(`/url/stats/${shortUrl}`)
	return response.data
}
