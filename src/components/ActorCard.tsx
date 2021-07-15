import styled from "styled-components"
import { IActor } from "../hooks/types"
import WrappedImage from "./WrappedImage"

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

const Name = styled.p`
	line-height: 1.3;
	width: 100%;
	margin: 4px 0;
	font-size: 14px;
	font-weight: bold;
	width: 100%;
	white-space: pre-wrap;
	color: #eee;

	@media only screen and (min-width: 768px) {
		font-size: 16px;
		margin-top: 8px;
	}
`

const Character = styled.p`
	line-height: 1.3;
	width: 100%;
	font-size: 14px;
	width: 100%;
	white-space: pre-wrap;
	color: #eee;

	@media only screen and (min-width: 768px) {
		font-size: 16px;
	}
`

interface IProps {
	actor: IActor
}

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w185"

export default function ActorCard(props: IProps) {
	const IMAGE_SRC = props.actor.profile_path ? IMG_BASE_URL + props.actor.profile_path : undefined;

	return (
		<Container>
			<ImageStyles>
				<WrappedImage ratio="POSTER_RATIO" src={IMAGE_SRC} alt="Actor profile image" />
			</ImageStyles>

			<Name>{props.actor.name}</Name>

			<Character>{props.actor.character}</Character>
		</Container>
	)
}
