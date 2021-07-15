import styled from "styled-components"
import Search from "./Search"
import { ReactComponent as HomeIcon } from "../icons/home.svg"
import { ReactComponent as GithubIcon } from "../icons/github.svg"
import { Link } from "react-router-dom"

const Container = styled.div`
	background-color: #222831;
	border-bottom: 1px solid #393e46;
	position: fixed;
	z-index: 9999;
	top: 0;
	transition: top 0.3s;
	box-sizing: border-box;
	width: 100%;
	padding: 0px 5%;
	display: grid;
	align-content: center;
	align-items: center;

	#home {
		justify-self: start;
	}

	#github {
		justify-self: end;
	}

	> a {
		display: inline-block;
		line-height: 0;
	}

	@media only screen and (max-width: 768px) {
		height: 100px;
		grid-template-columns: auto 24px;
		grid-row-gap: 16px;

		#github svg {
			width: 24px;
			height: 24px;
		}

		#search {
			grid-column-start: 1;
			grid-column-end: 3;
		}
	}

	@media only screen and (min-width: 768px) {
		padding: 0px 7%;
		height: 56px;
		grid-template-columns: auto 40% auto;

		#search {
			grid-column-start: 2;
			grid-column-end: 3;
			grid-row-start: 1;
			grid-row-end: 2;
		}
	}

	@media only screen and (min-width: 1430px) {
		padding: 0;
		justify-content: center;
		grid-template-columns: 365px 500px 365px;
	}
`

export default function Header() {
	return (
		<Container>
			<Link id="home" to="/">
				<HomeIcon />
			</Link>

			<a id="github" href="https://github.com/ducluong-vn/cinelib">
				<GithubIcon />
			</a>

			<div id="search">
				<Search />
			</div>
		</Container>
	)
}
