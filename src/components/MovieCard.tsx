import styled from "styled-components"
import WrappedImage from "./WrappedImage"
import Rating from "./Rating"
import { Link } from "react-router-dom"
import { IMovie } from "../hooks/types"

interface IProps {
	movie: IMovie
}

const Container = styled.div`
	width: 100%;
	cursor: pointer;
	flex-shrink: 0;
`
const ImageStyles = styled.div`
	line-height: 0;
	border-radius: 12px;
	overflow: hidden;

	@media only screen and (min-width: 768px) {
		border-radius: 24px;
	}
`

const Title = styled.p`
	line-height: 1.3;
	width: 100%;
	margin: 8px 0 4px;
	font-size: 14px;
	color: #eee;

	@media only screen and (min-width: 768px) {
		font-size: 16px;
		font-weight: bold;
	}
`

function truncateTitle(title: string): string {
	const MAX_LEN = window.innerWidth < 768 ? 25 : 34

	if (title.length <= MAX_LEN) return title

	return title.substring(0, MAX_LEN) + "..."
}

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w185"

export default function MovieCard(props: IProps) {
	const IMAGE_SRC = props.movie.poster_path ? IMG_BASE_URL + props.movie.poster_path : undefined

	return (
		<Link to={`/movie/${props.movie.id}`}>
			<Container>
				<ImageStyles>
					<WrappedImage ratio="POSTER_RATIO" src={IMAGE_SRC} alt="movie poster" />
				</ImageStyles>

				<Title>{truncateTitle(props.movie.title)}</Title>

				<Rating>{Math.round(props.movie.vote_average * 10) / 10}</Rating>
			</Container>
		</Link>
	)
}
