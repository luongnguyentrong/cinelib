import styled from "styled-components"
import ViewAllButton from "./ViewAllButton"
import { ReactComponent as LeftButtonIcon } from "../../icons/left-circle-button.svg"
import { ReactComponent as RightButtonIcon } from "../../icons/right-circle-button.svg"

interface IProps {
	title: string
	dec: () => void
	inc: () => void
}

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;

	> .left-nav {
		display: flex;
	}
`

const Title = styled.p`
	margin: 0;
	line-height: 1;
	font-size: 20px;
	font-weight: bold;
	color: #eee;
`

const CarouselNav = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-column-gap: 12px;

	margin-left: 48px;
`

export default function CarouselTop(props: IProps) {
	return (
		<Container>
			<Title>{props.title}</Title>

			<div className="left-nav">
				<ViewAllButton />

				<CarouselNav>
					<button onClick={props.dec}>
						<LeftButtonIcon />
					</button>

					<button onClick={props.inc}>
						<RightButtonIcon />
					</button>
				</CarouselNav>
			</div>
		</Container>
	)
}
