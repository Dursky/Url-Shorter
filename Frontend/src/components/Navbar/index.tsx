import React from "react"
import {Link, useNavigate} from "react-router-dom"

const Navbar: React.FC = () => {
	const navigate = useNavigate()
	const isAuthenticated = localStorage.getItem("token") !== null

	const handleLogout = () => {
		localStorage.removeItem("token")
		navigate("/login")
	}

	return (
		<nav className="mb-4">
			<ul className="flex space-x-4">
				<li>
					<Link to="/" className="text-blue-500 hover:text-blue-700">
						Home
					</Link>
				</li>
				{!isAuthenticated ? (
					<>
						<li>
							<Link to="/login" className="text-blue-500 hover:text-blue-700">
								Login
							</Link>
						</li>
						<li>
							<Link to="/register" className="text-blue-500 hover:text-blue-700">
								Register
							</Link>
						</li>
					</>
				) : (
					<>
						<li>
							<Link to="/shorten" className="text-blue-500 hover:text-blue-700">
								Shorten URL
							</Link>
						</li>
						<li>
							<button onClick={handleLogout} className="text-blue-500 hover:text-blue-700">
								Logout
							</button>
						</li>
					</>
				)}
			</ul>
		</nav>
	)
}

export default Navbar
