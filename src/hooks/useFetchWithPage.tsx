import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL, API_KEY, IMovie, IPageResponse } from "./types"

type ReturnObj = [movies: Array<IMovie> | undefined, nextPage: () => void, reachLimit: boolean]

export default function useFetchWithPage(url: string): ReturnObj {
	const [movies, setMovies] = useState<Array<IMovie> | undefined>([])
	const [page, setPage] = useState<number>(1)
	const [pageLimit, setPageLimit] = useState<number>()

	const nextPage = () => {
		if (movies) {
			if (pageLimit && page < pageLimit) {
				setPage(page + 1)
			} else {
				throw new Error("Reach page limit")
			}
		} else throw new Error("Movies in undefined")
	}

	useEffect(() => {
		setMovies([])
		setPage(1)
	}, [url])

	useEffect(() => {
		axios({
			method: "GET",
			url: url,
			baseURL: BASE_URL,
			params: {
				page: page,
				api_key: API_KEY,
			},
		}).then((res) => {
			const data: IPageResponse = res.data

			// set page limit, a readonly state
			if (!pageLimit) setPageLimit(data.total_pages)

			if (data.results && movies) {
				if (data.results.length === 0 && movies.length === 0) setMovies(undefined)
				else setMovies((oldMovies) => oldMovies && oldMovies.concat(data.results))
			} else {
				throw new Error("No movies in Response")
			}
		})

		// eslint-disable-next-line
	}, [url, page])

	return [movies, nextPage, page === pageLimit]
}
