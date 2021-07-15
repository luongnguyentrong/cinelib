import { useEffect, useState } from "react"

function debounce(fn: Function, ms: number) {
	let timer: number | undefined
	return () => {
		clearTimeout(timer)

		timer = window.setTimeout(() => {
			timer = undefined
			fn()
		}, ms)
	}
}

function getCardCount(width: number, fromDetails: boolean): number {
	return width < 604
		? 3
		: width < 812
		? 4
		: width < 1022 || fromDetails
		? 5
		: 6
}

export default function useGetCardCount(fromDetails: boolean = false) {
	const [width, setWidth] = useState(window.innerWidth)

	useEffect(() => {
		const updateWidth = debounce(() => {
			setWidth(window.innerWidth)
		}, 100)

		window.addEventListener("resize", updateWidth)

		return () => {
			window.removeEventListener("resize", updateWidth)
		}
	}, [])

	return getCardCount(width, fromDetails)
}
