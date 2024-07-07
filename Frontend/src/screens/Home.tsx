import React from "react"
import {Link} from "react-router-dom"

const Home: React.FC = () => {
	return (
		<div>
			<h1 className="text-3xl font-bold mb-4">Welcome to URL Shortener</h1>
			<p className="mb-4">Shorten your URLs and track their statistics.</p>
			<div className="space-x-4">
				<Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
					Login
				</Link>
				<Link
					to="/shorten"
					className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
					Shorten URL
				</Link>
			</div>
		</div>
	)
}

export default Home
