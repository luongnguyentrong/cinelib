import { useEffect, useRef } from "react"
import styled from "styled-components"
import fallbackPoster from "./images/fallback-poster.png"
import fallbackBackdrop from "./images/fallback-backdrop.png"

const Container = styled.div<{ ratio: number }>`
	display: inline-block;
	width: 100%;
	position: relative;

	padding-bottom: ${(props) => props.ratio * 100}%;

	overflow: hidden;
`

const Image = styled.img`
	position: absolute;
	top: 0;

	z-index: 2;

	background-color: #f5f5f5;
	width: 100%;
	height: 100%;
`

interface IProps {
	src: string | undefined
	alt: string
	ratio: "POSTER_RATIO" | "BACKDROP_RATIO"
}

const observer = new IntersectionObserver(
	(entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const image = entry.target as HTMLImageElement

				if (!image.getAttribute("data-src"))
					throw new Error("Data-src is not defined in <Image />")

				const src = image.getAttribute("data-src") as string

				if (src) image.src = src

				observer.unobserve(image)
			}
		})
	},
	{
		threshold: 0.1,
	}
)

const RATIO = {
	POSTER_RATIO: 278 / 185,
	BACKDROP_RATIO: 720 / 1280,
}

export default function WrappedImage(props: IProps) {
	const imageRef = useRef<HTMLImageElement>(null)

	useEffect(() => {
		// Observer image after it is mounted
		if (imageRef.current) observer.observe(imageRef.current)
	}, [imageRef])

	const GetImage = props.src ? (
		<Image
			onLoad={(event) => {
				const image = event.target as HTMLImageElement

				// remove the background outline bug at image corners
				image.style.background = "none"
			}}
			onError={(event) => {
				const image = event.target as HTMLImageElement

				if (props.ratio === "POSTER_RATIO") image.src = fallbackPoster
				else image.src = fallbackBackdrop
			}}
			ref={imageRef}
			data-src={props.src}
			alt={props.alt}
		/>
	) : (
		<Image
			src={props.ratio === "POSTER_RATIO" ? fallbackPoster : fallbackBackdrop}
			alt={props.alt}
		/>
	)

	return <Container ratio={RATIO[props.ratio]}>{GetImage}</Container>
}
