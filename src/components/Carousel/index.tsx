import axios from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { IMovie, IActor, IPageResponse } from "../../hooks/types"

import LoadingPlaceholder from "./LoadingPlaceholder"
import Slide from "./Slide"
import Controller from "./Controller"
import { Link } from "react-router-dom"
import getEndpoint from "../../getEndpoint"

interface IProps {
	title: string
	url: string
	cast?: boolean
	fromDetails?: boolean
}

interface ICreditResponse {
	id: number
	cast: Array<IActor>
	crew: Array<any>
}

const CarouselTop = styled.div`
	display: flex;
	justify-content: space-between;

	margin-bottom: 16px;

	@media only screen and (min-width: 768px) {
		margin-bottom: 24px;
	}
`

const Title = styled.p`
	margin: 0;
	padding: 0;

	font-size: 16px;
	line-height: 1;
	font-weight: bold;
	align-self: flex-end;

	@media only screen and (min-width: 768px) {
		font-size: 20px;
	}
`

const LeftMenu = styled.div`
	display: flex;
	align-items: center;
`

const ViewAllButton = styled.button`
	color: #d65a31;
	font-size: 16px;
	line-height: 1;
	text-decoration: underline;

	@media only screen and (min-width: 768px) {
		font-size: 14px;
		font-weight: bold;
		height: 32px;
		width: 90px;
		border-radius: 16px;
		color: #eee;
		text-decoration: none;
		background-color: #d65a31;
	}
`

export default function Carousel(props: IProps) {
	const [list, setList] = useState<Array<IMovie | IActor>>()
	const [translateAmount, setTranslateAmount] = useState(0)

	const endpoint = props.cast ? props.url : getEndpoint(props.url)

	useEffect(() => {
		if (endpoint) {
			axios({
				baseURL: "https://api.themoviedb.org/3",
				url: endpoint,
				params: {
					api_key: "b22a93888dad84fae17688d54edad389",
				},
			}).then((res) => {
				if (props.cast) {
					const data: ICreditResponse = res.data

					setList(data.cast)
				} else {
					const data: IPageResponse = res.data

					setList(data.results)
				}
			})
		}
	}, [endpoint, props.cast])

	return list ? (
		<div>
			<CarouselTop>
				<Title>{props.title}</Title>

				<LeftMenu>
					{!props.cast && (
						<Link to={props.url}>
							<ViewAllButton>View all</ViewAllButton>
						</Link>
					)}

					<Controller
						totalCard={list.length}
						changeTranslateAmount={(value: number) => {
							setTranslateAmount(value)
						}}
						fromDetails={props.fromDetails}
					/>
				</LeftMenu>
			</CarouselTop>

			<Slide fromDetails={props.fromDetails} list={list} translateAmount={translateAmount} />
		</div>
	) : (
		<LoadingPlaceholder />
	)
}
