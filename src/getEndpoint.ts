interface IEndpoints {
	[index: string]: { url: string } | { searchParams: string; url: (params: string) => string }
}

const Endpoints: IEndpoints = {
	popular: {
		url: "/movie/popular",
	},
	now_playing: {
		url: "/movie/now_playing",
	},
	top_rated: {
		url: "/movie/top_rated",
	},
	upcoming: {
		url: "/movie/upcoming",
	},
	search: {
		searchParams: "keyword",
		url: (keyword: string) => `/search/movie?query=${keyword}`,
	},
	similar: {
		searchParams: "id",
		url: (id: string) => `/movie/${id}/similar`,
	},
}

function getEndpoint(url: string): string | null {
	// url should have form /list/<something>
	url = url.split("/", 3)[2]

	const [key, search] = url.split("?", 2)
	const searchParams = new URLSearchParams(search)

	if (!Object.keys(Endpoints).includes(key)) return null

	const Endpoint = Endpoints[key]

	if ("searchParams" in Endpoint) {
		const searchValue = searchParams.get(Endpoint.searchParams)

		if (searchValue) return Endpoint.url(searchValue)

		return null
	}

	return Endpoint.url
}

export default getEndpoint
