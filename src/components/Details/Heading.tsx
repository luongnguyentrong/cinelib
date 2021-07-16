import styled from "styled-components"
import { ReactComponent as StarIcon } from "../../icons/star.svg"
import { ReactComponent as TimeIcon } from "../../icons/time.svg"
import { ReactComponent as CalendarIcon } from "../../icons/calendar.svg"

interface IProps {
	title: string
	tagline: string
	vote_average: number
	runtime: number
	release_date: string
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	margin-top: 16px;
	margin-bottom: 32px;
	@media only screen and (min-width: 768px) {
		margin-top: 32px;
		margin-bottom: 40px;
	}
`

const Title = styled.p`
	margin: 0;
	font-weight: bold;
	font-size: 20px;
	line-height: 1.5;
	text-align: center;

	@media only screen and (min-width: 768px) {
		font-size: 32px;
	}
`

const Tagline = styled.p`
	margin: 0;
	margin-top: 8px;
	line-height: 1.3;
	font-size: 14px;
	font-style: italic;
	text-align: center;

	margin-bottom: 16px;

	@media only screen and (min-width: 768px) {
		font-size: 16px;
		margin-bottom: 20px;
	}
`

const Info = styled.div`
	width: 100%;
	max-width: 300px;
	margin-top: 8px;
	display: flex;
	justify-content: space-between;

	@media only screen and (min-width: 768px) {
		max-width: 450px;
	}
`

const InfoBlock = styled.div`
	display: flex;
	align-items: center;

	font-weight: bold;
	line-height: 1;
	font-size: 14px;

	> .icon {
		margin-right: 8px;
		line-height: 0;

		@media only screen and (min-width: 768px) {
			width: 32px;
			height: 32px;
			border-radius: 16px;
			background-color: #d65a31;
			display: grid;
			place-items: center;
			margin-right: 12px;

			> svg {
				fill: #eee;
			}
		}
	}
`

function toTime(runtime: number): string {
	if (runtime < 60) return `${runtime}m`
	if (runtime % 60 === 0) return `${runtime / 60}h`

	return `${Math.floor(runtime / 60)}h ${runtime % 60}m`
}

function transformDateFormat(date: string): string {
	const newDate = new Date(date)

	return `${newDate.getDate()} / ${newDate.getMonth() + 1} / ${newDate.getFullYear()}`
}

export default function Heading(props: IProps) {
	return (
		<Container>
			<Title>{props.title}</Title>
			{props.tagline && <Tagline>{props.tagline}</Tagline>}
			<Info>
				<InfoBlock>
					<span className="icon">
						<StarIcon />
					</span>
					{props.vote_average}
				</InfoBlock>
				<InfoBlock>
					<span className="icon">
						<TimeIcon />
					</span>
					{toTime(props.runtime)}
				</InfoBlock>
				<InfoBlock>
					<span className="icon">
						<CalendarIcon />
					</span>
					{transformDateFormat(props.release_date)}
				</InfoBlock>
			</Info>
		</Container>
	)
}
