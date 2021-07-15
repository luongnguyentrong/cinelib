import styled from "styled-components"

const Container = styled.button`
	background-color: #d65a31;
	color: #eee;
	font-size: 14px;
	font-weight: bold;
	line-height: 1;
	width: 90px;
	height: 32px;
	border-radius: 16px;
`

export default function ViewAllButton() {
	return <Container>View all</Container>
}
