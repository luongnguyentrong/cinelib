import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import styled from "styled-components"
import { IMovie } from "../../hooks/types"
import Heading from "./Heading"
import LoadingPlaceholder from "./LoadingPlaceholder"
import Overview from "./Overview"
import WrappedImage from "../WrappedImage"
import Carousel from "../Carousel"

const Container = styled.div`
	padding: 132px 5% 32px;

	@media only screen and (min-width: 768px) {
		padding: 88px 7% 32px;
	}

	@media only screen and (min-width: 1186px) {
		width: 1021px;
		padding: 88px 0 32px;

		margin-left: auto;
		margin-right: auto;
	}
`

const ImageStyles = styled.div`
	margin-left: -5%;
	margin-right: -5%;
	width: calc(10 / 9 * 100%);
	line-height: 0;

	@media only screen and (min-width: 768px) {
		margin: 0;
		width: 100%;
		border-radius: 24px;
		overflow: hidden;
	}
`

const AddSpacing = styled.div`
	margin-bottom: 32px;

	&:last-of-type {
		margin-bottom: 0;
	}
`

interface IDetails extends IMovie {
	genres: Array<{ id: number; name: string }>
	release_date: string
	runtime: number
	tagline: string
}

const IMG_SRC =
	"https://image.tmdb.org/t/p/" +
	(document.body.clientWidth <= 400
		? "w300"
		: document.body.clientWidth <= 900
		? "w780"
		: "w1280")

function getCastURL(id: number): string {
	return `/movie/${id}/credits`
}

function getSimilarURL(id: number): string {
	return `/list/similar?id=${id}`
}

export default function Details() {
	const [details, setDetails] = useState<IDetails>()
	const { id } = useParams<{ id: string }>()

	useEffect(() => {
		setDetails(undefined)
		window.scrollTo(0, 0)

		axios({
			baseURL: "https://api.themoviedb.org/3",
			url: `/movie/${id}`,
			params: {
				api_key: "b22a93888dad84fae17688d54edad389",
			},
		}).then((res) => {
			const data = res.data as IDetails

			setDetails(data)
		})
	}, [id])

	return (
		<Container>
			{details ? (
				<>
					<ImageStyles>
						<WrappedImage
							src={
								details.backdrop_path ? IMG_SRC + details.backdrop_path : undefined
							}
							alt="Backdrop"
							ratio="BACKDROP_RATIO"
						/>
					</ImageStyles>

					<Heading
						title={details.title}
						tagline={details.tagline}
						vote_average={details.vote_average}
						runtime={details.runtime}
						release_date={details.release_date}
					/>

					<AddSpacing>
						<Overview overview={details.overview} genres={details.genres} />
					</AddSpacing>

					<AddSpacing>
						<Carousel fromDetails cast title="Cast" url={getCastURL(details.id)} />
					</AddSpacing>

					<AddSpacing>
						<Carousel
							fromDetails
							title="Similar"
							url={getSimilarURL(details.id)}
						/>
					</AddSpacing>
				</>
			) : (
				<LoadingPlaceholder />
			)}
		</Container>
	)
}
