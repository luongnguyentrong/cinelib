import styled from "styled-components"
import { IMovie } from "../../hooks/types"
import ActorCard from "../ActorCard"
import MovieCard from "../MovieCard"

interface IActor {
	id: number
	name: string
	character: string
	profile_path: string
}

const HideOverflow = styled.div`
	width: 100%;

	overflow-x: scroll;

	@media only screen and (min-width: 768px) {
		overflow: hidden;
	}
`

const Item = styled.li`
	display: inline-block;
	box-sizing: border-box;
	flex-shrink: 0;
	padding-left: 12px;
	padding-right: 12px;

	width: 144px;

	@media only screen and (min-width: 408px) {
		width: ${100 / 3}%;
	}

	@media only screen and (min-width: 604px) {
		width: 25%;
	}

	@media only screen and (min-width: 813px) {
		width: 20%;
	}
`
const List = styled.ul`
	list-style-type: none;
	padding: 0;
	margin: 0;
	width: calc(100% + 24px);
	margin-left: -12px;
	margin-right: -12px;
	transition: transform 0.5s ease 0s;

	overflow: visible;
	display: flex;

	@media only screen and (min-width: 1022px) {
		.not-in-details {
			width: ${100 / 6}%;
		}
	}
`

interface IProps {
	list: Array<IMovie | IActor>
	translateAmount: number
	fromDetails?: boolean
}

export default function Slide(props: IProps) {
	return (
		<HideOverflow>
			<List
				style={{
					transform: `translateX(${props.translateAmount}%)`,
				}}
			>
				{props.list.map((item) => {
					return (
						<Item
							className={props.fromDetails ? undefined : "not-in-details"}
							key={item.id}
						>
							{"character" in item ? (
								<ActorCard actor={item} />
							) : (
								<MovieCard movie={item} />
							)}
						</Item>
					)
				})}
			</List>
		</HideOverflow>
	)
}
