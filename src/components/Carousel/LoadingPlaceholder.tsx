import React from "react"
import styled from "styled-components"

const TopBar = styled.div`
	display: flex;
	justify-content: space-between;

	> .left {
		width: 120px;
		height: 32px;
		background-color: #eee;
		border-radius: 12px;

		@media only screen and (min-width: 768px) {
			width: 150px;
		}
	}

	> .right {
		width: 65px;
		height: 32px;
		background-color: #eee;
		border-radius: 12px;

		@media only screen and (min-width: 768px) {
			width: 225px;
		}
	}
`

const Content = styled.div`
	margin-top: 24px;
	width: 100%;
	height: 250px;

	@media only screen and (min-width: 768px) {
		height: 350px;
	}
	background-color: #eee;
	border-radius: 24px;
`

export default function LoadingPlaceholder() {
	return (
		<div>
			<TopBar>
				<div className="left"></div>
				<div className="right"></div>
			</TopBar>
			<Content />
		</div>
	)
}
