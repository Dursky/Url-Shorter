import React from "react"
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import UrlShortener from "./screens/UrlShortener"
import UrlStats from "./screens/UrlStats"
import Home from "./screens/Home"
import LoginScreen from "./screens/Login"
import RegisterScreen from "./screens/Register"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"

const queryClient = new QueryClient()

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<div className="container mx-auto p-4">
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<LoginScreen />} />
						<Route path="/register" element={<RegisterScreen />} />
						<Route
							path="/shorten"
							element={
								<ProtectedRoute>
									<UrlShortener />
								</ProtectedRoute>
							}
						/>
						<Route path="/stats/:shortUrl" element={<UrlStats />} />
					</Routes>
				</div>
			</Router>
		</QueryClientProvider>
	)
}

export default App
