import React from "react"
import {Link} from "react-router-dom"

const Navbar: React.FC = () => {
	return (
		<nav className="mb-4">
			<ul className="flex space-x-4">
				<li>
					<Link to="/" className="text-blue-500 hover:text-blue-700">
						Home
					</Link>
				</li>
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
				<li>
					<Link to="/shorten" className="text-blue-500 hover:text-blue-700">
						Shorten URL
					</Link>
				</li>
			</ul>
		</nav>
	)
}

export default Navbar
