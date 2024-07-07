import React, {useState} from "react"
import {useMutation} from "@tanstack/react-query"
import {shortenUrl} from "../api"

const UrlShortener: React.FC = () => {
	const [url, setUrl] = useState("")

	const shortenMutation = useMutation(() => shortenUrl(url), {
		onSuccess: (data) => {
			console.log(data.shorted)
		},
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		shortenMutation.mutate()
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
				disabled={shortenMutation.isLoading}>
				{shortenMutation.isLoading ? "Shortening..." : "Shorten URL"}
			</button>
			{shortenMutation.isSuccess && (
				<div className="mt-4 p-2 bg-gray-100 rounded">
					Shortened URL:{" "}
					<a href={shortenMutation.data.shorted} target="_blank" rel="noopener noreferrer">
						{shortenMutation.data.shorted}
					</a>
				</div>
			)}
		</form>
	)
}

export default UrlShortener
