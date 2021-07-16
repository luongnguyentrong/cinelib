import { ReactComponent as StarIcon } from "../icons/star.svg"
import styled from "styled-components"

const Container = styled.div`
	display: flex;
	align-items: center;
`

const Vote = styled.span`
	display: inline-block;
	margin: 0;
	margin-left: 6px;
	color: #d65a31;
	font-size: 14px;
	
	@media only screen and (min-width: 768px) {
		font-size: 16px;
	}
`

export default function Rating(props: { children: number }) {
	return (
		<Container>
			<StarIcon />
			<Vote>{props.children}</Vote>
		</Container>
	)
}
