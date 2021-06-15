import styled from "styled-components"
import Rating from "./Rating"

interface IBasicInfo {
	id: number
	overview: string
	vote_average: number
	title: string
	release_date: string
	backdrop_path: string
	poster_path: string
	genre_ids: Array<number>
}

interface IProps {
	movie: IBasicInfo
}

const Container = styled.div`
	width: 100%;
	cursor: pointer;
	flex-shrink: 0;
`
const Poster = styled.img`
	display: inline-block;
	width: 100%;
	border-radius: 12px;
	
	@media only screen and (min-width: 768px) {
		border-radius: 24px;
	}

	overflow: hidden;
`

const Title = styled.p`
	line-height: 1.3;
	width: 100%;
	margin: 4px 0;
	color: #eee;

	@media only screen and (min-width: 768px) {
		font-weight: bold;
		margin-top: 8px;
	}
`

const IMG_BASE_URL =
	"https://image.tmdb.org/t/p/" +
	(document.body.clientWidth >= 1000 ? "w185" : "w154")

export default function MovieCard(props: IProps) {
	return (
		<Container>
			<Poster
				src={IMG_BASE_URL + props.movie.poster_path}
				alt="movie poster"
			/>

			<Title>{props.movie.title}</Title>

			<Rating>{props.movie.vote_average}</Rating>
		</Container>
	)
}

export { Container }
