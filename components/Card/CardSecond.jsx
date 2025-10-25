import { forwardRef } from 'react';
import styled from 'styled-components'
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion'
import error from '../../public/image-not-found.png';

const CardWrapper = styled.div`
	position: relative;
	display: flex;
	border-radius: 15px;
	overflow: hidden;
	background-color: var(--bg-dark);
	@media (max-width: 768px){
		flex-direction:column;
	}
`
const Body = styled.div`
	padding: 30px;
	display: flex;
	flex-direction: column;
	justify-content: center;
`
const Figure = styled.figure`
	height:100%;
	flex: 0 0 100px;
	position: relative;
	margin-bottom: 10px;
`

const ImageEl = styled(Image)`
	position: absolute;
	width: calc(100% - 15px);
	height: 100%;
	left: 15px !important;
	top: 0;
	object-fit: contain;
	transition: transform .4s linear;
	@media (max-width: 768px){
		left: 0 !important;
		top: 20px !important;
	}
`

const TitleEl = styled.h3`
	font-family: var(--font-oswald);
	text-transform: uppercase;
	line-height: 2.2rem;
	font-size: 1.5rem;
	margin-bottom: 5px;
	color: var(--white);
	font-weight: 700;
	margin-bottom:10px;

	@media (max-width: 767px){
		font-size: 1.2rem;
		line-height: 1.7rem;
	}
`

const Text = styled.p`
	font-family: var(--font-lexend);
	color: var(--white);
	font-size: 1rem;

	@media (min-width: 1700px){
		font-size: 1rem;
		line-height: 1.4rem;
	}
	@media (max-width: 768px){
		font-size: 1rem;
	};
`

// eslint-disable-next-line
const CardSecond = forwardRef((props, ref) => {
	const { poster_path, title, release_date, description, id } = props;

	return (
		<CardWrapper ref={ref}>
			<Figure>
				<ImageEl src={poster_path ? poster_path : error} alt={title} fill sizes="100%" />
			</Figure>
			<Body>
				<TitleEl>{title}</TitleEl>
				<Text>{description} </Text>
			</Body>
		</CardWrapper>
	)
})

const MCardSecond = motion(CardSecond);

export { CardSecond, MCardSecond }