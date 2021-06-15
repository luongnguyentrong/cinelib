import axios from "axios"
import { useEffect, useState } from "react"

const BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = "b22a93888dad84fae17688d54edad389"

interface IMovie {
	id: number
	overview: string
	vote_average: number
	title: string
	release_date: string

	backdrop_path: string
	poster_path: string

	genre_ids: Array<number>
}

type ReturnObj = [movies: Array<IMovie>, loading: boolean, nextPage: () => void]

export default function useFetchWithPage(url: string): ReturnObj {
	const [movies, setMovies] = useState<Array<IMovie>>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [page, setPage] = useState<number>(1)
	const [pageLimit, setPageLimit] = useState<number | null>(null)

	const nextPage = () => {
		if (pageLimit && page < pageLimit) {
			setPage(page + 1)
		} else {
			throw new Error("Reach page limit")
		}
	}

	useEffect(() => {
		setLoading(true);
		
		axios({
			method: "GET",
			url: url,
			baseURL: BASE_URL,
			params: {
				page: page,
				api_key: API_KEY,
			},
		}).then((res) => {
			setLoading(false);

			// set page limit, a readonly state
			if (pageLimit === null && res.data.total_pages)
				setPageLimit(res.data.total_pages)

			if (res.data.results)
				setMovies((oldMovies) => oldMovies.concat(res.data.results))
			else {
				throw new Error("No movies in Response")
			}
		})

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page])

	return [movies, loading, nextPage]
}
