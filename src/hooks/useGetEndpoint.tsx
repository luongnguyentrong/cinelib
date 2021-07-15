import { useLocation } from "react-router"
import getEndpoint from "../getEndpoint"

export default function useGetEndpoint(): string | null {
	const location = useLocation()

	const endpoint = getEndpoint(location.pathname + location.search)

	return endpoint;
}
