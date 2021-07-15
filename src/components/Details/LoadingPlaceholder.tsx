import styled from "styled-components"

const Container = styled.div`
	> .backdrop {
		margin-left: -5%;
		margin-right: -5%;
		width: calc(10 / 9 * 100%);
		padding-bottom: 56.25%;
		background-color: #eee;
		margin-bottom: 16px;

		@media only screen and (min-width: 768px) {
            margin: 0;
            width: 100%;
			border-radius: 24px;
			margin-bottom: 32px;
		}
	}

	> .heading {
		display: flex;
		flex-direction: column;
		align-items: center;

		margin-bottom: 32px;
		@media only screen and (min-width: 768px) {
			margin-bottom: 40px;
		}

		> .title {
			width: 150px;
			height: 63px;
			background-color: #eee;
			border-radius: 24px;
			margin-bottom: 16px;

			@media only screen and (min-width: 768px) {
				width: 250px;
				height: 75px;
				margin-bottom: 12px;
			}
		}

		> .info {
			width: 100%;
			max-width: 300px;

			@media only screen and (min-width: 768px) {
				max-width: 450px;
			}

			display: flex;
			justify-content: space-between;

			> .info-block {
				width: 70px;
				height: 16px;
				border-radius: 24px;
				background-color: #eee;

				@media only screen and (min-width: 768px) {
					width: 100px;
					height: 32px;
				}
			}
		}
	}

	> .overview {
		width: 100px;
		height: 20px;
		border-radius: 8px;
		margin-bottom: 8px;
		background-color: #eee;
	}

	> .overview-content {
		width: 100%;
		height: 80px;
		border-radius: 24px;
		background-color: #eee;
	}
`

export default function LoadingPlaceholder() {
	return (
		<Container>
			<div className="backdrop"></div>

			<div className="heading">
				<div className="title"></div>
				<div className="info">
					<div className="info-block"></div>
					<div className="info-block"></div>
					<div className="info-block"></div>
				</div>
			</div>
			<div className="overview"></div>
			<div className="overview-content"></div>
		</Container>
	)
}
