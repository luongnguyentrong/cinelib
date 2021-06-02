import { ReactComponent as StarIcon } from "../icons/star.svg"
import styled from "styled-components"

const Container = styled.div`
	display: flex;
	align-items: center;
`

const Vote = styled.span`
	display: inline-block;
	margin: 0;
	margin-left: 8px;
	color: #d65a31;
`

export default function Rating(props: { children: number }) {
	return (
		<Container>
			<StarIcon />
			<Vote>{props.children}</Vote>
		</Container>
	)
}
