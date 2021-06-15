import { useEffect, useRef } from "react"
import styled from "styled-components"

const Container = styled.div<{ ratio: number }>`
	display: inline-block;
	width: 100%;
	position: relative;

	padding-bottom: ${(props) => props.ratio * 100}%;

	border-radius: 12px;
	@media only screen and (min-width: 768px) {
		border-radius: 24px;
	}

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
	src: string
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

				image.src = image.getAttribute("data-src") as string
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
	BACKDROP_RATIO: 1280 / 720,
}

export default function WrappedImage(props: IProps) {
	const imageRef = useRef<HTMLImageElement>(null)

	useEffect(() => {
		// Observer image after it is mounted
		if (imageRef.current) observer.observe(imageRef.current)
	}, [imageRef])

	return (
		<Container ratio={RATIO[props.ratio]}>
			<Image
				onLoad={(event) => {
					const image = event.target as HTMLImageElement

					// remove the background outline bug at image corners
					image.style.background = "none"
				}}
				onError={(event) => {
					const image = event.target as HTMLImageElement

					image.src = "fallback-poster.png"
				}}
				ref={imageRef}
				data-src={props.src}
				alt={props.alt}
			/>
		</Container>
	)
}
