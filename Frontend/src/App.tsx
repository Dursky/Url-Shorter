import React from "react"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import LoginForm from "./components/LoginForm"
import UrlShortener from "./components/UrlShortener"
import UrlStats from "./components/UrlStats"

const queryClient = new QueryClient()

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<div className="container mx-auto p-4">
				<h1 className="text-3xl font-bold mb-4">URL Shortener</h1>
				<LoginForm />
				<div className="mt-8">
					<UrlShortener />
				</div>
				<div className="mt-8">
					<UrlStats shortUrl="example-short-url" />
				</div>
			</div>
		</QueryClientProvider>
	)
}

export default App
