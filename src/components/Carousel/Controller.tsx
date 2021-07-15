import { useEffect, useState } from "react"
import styled from "styled-components"
import useGetCardCount from "../../hooks/useGetCardCount"
import { ReactComponent as LeftCircleIcon } from "../../icons/left-circle-button.svg"
import { ReactComponent as RightCircleIcon } from "../../icons/right-circle-button.svg"

const FixedWidth = styled.div`
	@media only screen and (min-width: 768px) {
		width: 210px;
	}
`

const Container = styled.div`
	display: none;

	@media only screen and (min-width: 768px) {
		display: flex;
		align-items: center;
		float: right;
	}
`

const Location = styled.span`
	display: inline-block;
	line-height: 1;
	font-size: 16px;
	margin-right: 16px;
`

const NavButtons = styled.div`
	display: grid;
	grid-template-columns: auto auto;
	grid-column-gap: 12px;
`

interface IProps {
	totalCard: number
	changeTranslateAmount: (value: number) => void
	fromDetails?: boolean
}

export default function Controller(props: IProps) {
	const [jump, setJump] = useState(0)
	const cardCount = useGetCardCount(props.fromDetails)

	useEffect(() => {
		props.changeTranslateAmount((jump / cardCount) * 100)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [jump, cardCount])

	const dec = () => {
		if (jump === 0) setJump(-props.totalCard + cardCount)
		else setJump(Math.min(jump + cardCount, 0))
	}

	const inc = () => {
		if (jump === -props.totalCard + cardCount) setJump(0)
		else setJump(Math.max(jump - cardCount, -props.totalCard + cardCount))
	}

	return (
		<FixedWidth>
			<Container>
				<Location>
					{Math.ceil(-jump / cardCount)} / {Math.ceil(props.totalCard / cardCount) - 1}
				</Location>
				<NavButtons>
					<button onClick={dec}>
						<LeftCircleIcon />
					</button>
					<button onClick={inc}>
						<RightCircleIcon />
					</button>
				</NavButtons>
			</Container>
		</FixedWidth>
	)
}
