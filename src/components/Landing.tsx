import styled from "styled-components"
import Carousel from "./Carousel"

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

const AddSpacing = styled.div`
	margin-bottom: 32px;

	&:last-of-type {
		margin-bottom: 0;
	}
`

const prominentList = [
	{
		title: "Popular",
		url: "/list/popular",
	},
	{
		title: "Top rated",
		url: "/list/top_rated",
	},
	{
		title: "Now playing",
		url: "/list/now_playing",
	},
	{
		title: "Upcoming",
		url: "/list/upcoming",
	},
]

export default function Landing() {
	return (
		<Container>
			{prominentList.map((list, idx) => (
				<AddSpacing key={idx}>
					<Carousel title={list.title} url={list.url} />
				</AddSpacing>
			))}
		</Container>
	)
}
