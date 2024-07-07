import React from "react"
import {useParams} from "react-router-dom"
import {useQuery} from "@tanstack/react-query"
import {getUrlStats} from "../api"

const UrlStats: React.FC = () => {
	const {shortUrl} = useParams<{shortUrl: string}>()

	const {data, isLoading, isError} = useQuery({
		queryKey: ["urlStats", shortUrl],
		queryFn: () => getUrlStats(shortUrl || ""),
		enabled: !!shortUrl,
	})

	if (!shortUrl) return <div>No short URL provided</div>
	if (isLoading) return <div>Loading stats...</div>
	if (isError) return <div>Error fetching stats</div>

	return (
		<div className="mt-4 p-4 bg-gray-100 rounded">
			<h2 className="text-xl font-bold mb-2">URL Statistics for {shortUrl}</h2>
			{data && (
				<>
					<p>Visits: {data.visits}</p>
					<p>Unique Visitors: {data.uniqueVisitors}</p>
					<p>Last Visited: {new Date(data.lastVisited).toLocaleString()}</p>
				</>
			)}
		</div>
	)
}

export default UrlStats
