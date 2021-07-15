export const BASE_URL = "https://api.themoviedb.org/3"
export const API_KEY = "b22a93888dad84fae17688d54edad389"

export interface IMovie {
	id: number
	overview: string
	vote_average: number
	title: string
	release_date: string

	backdrop_path: string
	poster_path: string
}

export interface IActor {
	id: number
	name: string
	character: string
	profile_path: string
}

export interface IPageResponse {
	page: number
	results: Array<IMovie>
	total_pages: number
	total_results: number
}
