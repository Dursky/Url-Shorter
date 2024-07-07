import React from "react"
import {useQuery} from "@tanstack/react-query"
import {getUrlStats} from "../api"

interface UrlStatsProps {
	shortUrl: string
}

const UrlStats: React.FC<UrlStatsProps> = ({shortUrl}) => {
	const {data, isLoading, isError} = useQuery(["urlStats", shortUrl], () => getUrlStats(shortUrl))

	if (isLoading) return <div>Loading stats...</div>
	if (isError) return <div>Error fetching stats</div>

	return (
		<div className="mt-4 p-4 bg-gray-100 rounded">
			<h2 className="text-xl font-bold mb-2">URL Statistics</h2>
			<p>Visits: {data.visits}</p>
			<p>Unique Visitors: {data.uniqueVisitors}</p>
			<p>Last Visited: {new Date(data.lastVisited).toLocaleString()}</p>
		</div>
	)
}

export default UrlStats
