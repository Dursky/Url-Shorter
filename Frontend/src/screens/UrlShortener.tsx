import React, {useState} from "react"
import {useMutation} from "@tanstack/react-query"
import {shortenUrl} from "../api"
import {Link} from "react-router-dom"

const UrlShortener: React.FC = () => {
	const [url, setUrl] = useState("")

	const shortenMutation = useMutation({
		mutationFn: (originalUrl: string) => shortenUrl(originalUrl),
		onSuccess: (data) => {
			console.log(data.shorted)
		},
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		shortenMutation.mutate(url)
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<input
				type="url"
				value={url}
				onChange={(e) => setUrl(e.target.value)}
				placeholder="Enter URL to shorten"
				className="w-full p-2 border rounded"
			/>
			<button
				type="submit"
				className="w-full p-2 bg-green-500 text-white rounded"
				disabled={shortenMutation.isPending}>
				{shortenMutation.isPending ? "Shortening..." : "Shorten URL"}
			</button>
			{shortenMutation.isSuccess && shortenMutation.data && (
				<div className="mt-4 p-2 bg-gray-100 rounded">
					Shortened URL:{" "}
					<a href={shortenMutation.data.shorted} target="_blank" rel="noopener noreferrer">
						{shortenMutation.data.shorted}
					</a>
					<br />
					<Link
						to={`/stats/${shortenMutation.data.shorted.split("/").pop()}`}
						className="text-blue-500 hover:text-blue-700">
						View Stats
					</Link>
				</div>
			)}
		</form>
	)
}

export default UrlShortener
