import { Redirect } from "react-router"
import useGetEndpoint from "../../hooks/useGetEndpoint"
import Content from "./Content"

export default function ViewAll() {
	const endpoint = useGetEndpoint()

	if (endpoint === null) return <Redirect to="/" />

	return <Content endpoint={endpoint} />
}
