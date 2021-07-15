import styled from "styled-components"
import { ReactComponent as NotFoundIcon } from "../../icons/not-found.svg"

const Middle = styled.div`
    display: grid;
    place-items: center;
    padding-top: 32px;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Title = styled.p`
    margin: 0;
    padding: 0;
    margin-top: 32px;
    color: #eee;
    font-size: 24px;
    line-height: 1;
    font-weight: bold;
`

export default function NotFoundPlaceholder() {
    return <Middle>
        <Container>
            <NotFoundIcon />
            <Title>No results found</Title>
        </Container> 
    </Middle>
}
