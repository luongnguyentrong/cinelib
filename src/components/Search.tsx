import axios, { CancelTokenSource } from "axios"
import React, { useCallback, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { IPageResponse } from "../hooks/types"
import { ReactComponent as SearchIcon } from "../icons/search.svg"

const Form = styled.form`
	border-radius: 18px;
	background-color: #eee;
	display: flex;

	position: relative;
`

const Input = styled.input`
	flex-grow: 1;
	font-family: "Montserrat";
	font-size: 14px;
	line-height: 1;
	color: #222831;
	padding-left: 18px;
`

const Button = styled.button`
	flex-shrink: 0;
	padding: 9px;
	padding-right: 18px;
	line-height: 0;
	background: transparent;
`

const SuggestionList = styled.ul`
	position: absolute;
	z-index: 9999;
	top: 120%;
	width: 100%;
	border-radius: 12px;

	display: block;
	background-color: #eee;
	margin: 0;
	padding: 0;

	list-style-type: none;

	li {
		color: #222831;
		font-size: 14px;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 18px;
		transition: background 0.2s ease-in;

		&:hover {
			background: rgba(57, 62, 70, 0.15);
		}
	}
`

let searchRequestTimeout: number,
	searchRequest: CancelTokenSource | null = null

const SUGGESTION_MAX = 5
interface ISuggestion {
	id: number
	title: string
}

export default function Search() {
	const history = useHistory()
	const [suggestions, setSuggestions] = useState<Array<ISuggestion>>()

	const removeSuggestions = useCallback(() => {
		setSuggestions(undefined)
	}, [])

	useEffect(() => {
		if (suggestions) document.addEventListener("click", removeSuggestions)
		else document.removeEventListener("click", removeSuggestions)
	}, [suggestions, removeSuggestions])

	const handleRequest = (value: string) => {
		if (searchRequest) searchRequest.cancel()

		searchRequest = axios.CancelToken.source()

		axios({
			baseURL: "https://api.themoviedb.org/3",
			url: "/search/movie",
			params: {
				api_key: "b22a93888dad84fae17688d54edad389",
				query: value,
			},
			cancelToken: searchRequest.token,
		}).then((res) => {
			if (res.data.results) {
				const response: IPageResponse = res.data

				const extractedRes: Array<ISuggestion> = response.results
					.slice(0, SUGGESTION_MAX)
					.map((movie) => ({
						id: movie.id,
						title: movie.title,
					}))

				setSuggestions(extractedRes)
			} else throw new Error("No [results] in Response")
		})
	}

	const handleChange = (): void => {
		clearTimeout(searchRequestTimeout)

		const input = document.getElementById(
			"search-input"
		) as HTMLInputElement

		if (!input.value) removeSuggestions()
		else searchRequestTimeout = setTimeout(handleRequest, 1000, input.value)
	}

	const handleSubmission = (event: React.FormEvent<HTMLFormElement>) => {
		clearTimeout(searchRequestTimeout)

		event.preventDefault()

		const input = document.getElementById(
			"search-input"
		) as HTMLInputElement

		if (input.value) {
			const url = `/list/search?keyword=${input.value}`

			history.push(url)
		} else throw new Error("inputRef is null or empty")
	}

	return (
		<Form onSubmit={handleSubmission}>
			<Input
				onChange={handleChange}
				type="text"
				placeholder="Search"
				id="search-input"
			/>

			<Button>
				<SearchIcon />
			</Button>

			<SuggestionList>
				{suggestions &&
					suggestions.map((suggestion) => (
						<Link
							className="suggestions"
							key={suggestion.id}
							to={`/movie/${suggestion.id}`}
						>
							<li>{suggestion.title}</li>
						</Link>
					))}
			</SuggestionList>
		</Form>
	)
}
