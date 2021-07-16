import React from "react"
import styled from "styled-components"

interface IProps {
	overview: string
	genres: Array<{ id: number; name: string }>
}

const Container = styled.div`
	margin-top: 32px;
	line-height: 1.7;

	@media only screen and (min-width: 768px) {
		margin-top: 40px;
	}
`

const Heading = styled.p`
	font-size: 16px;
	font-weight: bold;
	line-height: 1;
	margin-bottom: 8px;

	@media only screen and (min-width: 768px) {
		font-size: 20px;
	}
`

const Genres = styled.ul`
	list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    
    margin-top: 8px;
	@media only screen and (min-width: 768px) {
		margin-top: 16px;
	}
`

const GenreBlock = styled.li`
	font-size: 14px;
	line-height: 1;
	padding: 10px 16px;
	border-radius: 20px;
	background-color: #393e46;
    
    margin-right: 12px;
	margin-top: 8px;

	@media only screen and (min-width: 768px) {
		font-size: 16px;
		padding: 12px 20px;
	}
`

export default function Overview(props: IProps) {
	return (
		<Container>
			<Heading>Overview</Heading>
			{props.overview}

			<Genres>
				{props.genres.map((genre) => (
					<GenreBlock key={genre.id}>{genre.name}</GenreBlock>
				))}
			</Genres>
		</Container>
	)
}
