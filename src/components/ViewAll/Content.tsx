import styled from "styled-components"
import useFetchWithPage from "../../hooks/useFetchWithPage"
import MovieCard from "../MovieCard"
import NotFoundPlaceholder from "./NotFoundPlaceholder"
import Spinner from "./Spinner"

interface IProps {
	endpoint: string
}

const Container = styled.div`
	padding: 132px 5% 32px;

	@media only screen and (min-width: 768px) {
		padding: 88px 7% 32px;
	}

	@media only screen and (min-width: 1430px) {
		width: 1230px;
		padding: 88px 0 32px;

		margin-left: auto;
		margin-right: auto;
	}
`

const Grid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 24px;

	@media only screen and (min-width: 408px) {
		grid-template-columns: 1fr 1fr 1fr;
	}

	@media only screen and (min-width: 604px) {
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}

	@media only screen and (min-width: 813px) {
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	}

	@media only screen and (min-width: 1022px) {
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
	}
`

const Button = styled.button`
	display: block;
	width: 300px;
	height: 40px;
	background-color: #d65a31;
	color: #eee;
	border-radius: 20px;
	font-size: 16px;
	line-height: 1;
	font-weight: bold;

	margin-top: 24px;
	margin-left: auto;
	margin-right: auto;
`

export default function Content(props: IProps) {
	const [movies, nextPage, reachLimit] = useFetchWithPage(props.endpoint)

	return (
		<Container>
			{movies ? (
				movies.length > 0 ? (
					<>
						<Grid>
							{movies.map((movie) => (
								<MovieCard key={movie.id} movie={movie} />
							))}
						</Grid>

						{!reachLimit && <Button onClick={() => nextPage()}>Load more</Button>}
					</>
				) : (
					<Spinner />
				)
			) : (
				<NotFoundPlaceholder />
			)}
		</Container>
	)
}
