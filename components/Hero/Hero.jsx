import styled from 'styled-components';
import { memo, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { motion, useMotionValue, useScroll } from 'framer-motion';
import { Title } from '../Title';
import { MButton } from '../Button';
import { animationContent } from '../../helpers/Animations';
import poster from '../../public/car-1.avif';

const HeroWrapper = styled.section`
	position: relative;
	overflow: hidden;
	width: 100%;
	// min-height: calc(100vh - 44px);
	min-height: 100vh;
	height: 600px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: var(--bg-dark);
	@media (max-width: 500px){
		min-height: unset;
	}
`;

const Content = styled(motion.div)`
	position: relative;
	z-index: 3;
	padding: 110px 20px;
	max-width: 1400px;
	margin: 0 auto;
	text-align: center;
	@media (max-width: 500px){
		padding: 200px 20px 100px 20px;
	}
`;

const Actions = styled.div`
	display: flex;
	justify-content: center;
	gap: 20px;

	@media (max-width: 500px){
		flex-direction:column;
	}
`;

const Text = styled(motion.p)`
	font-family: var(--font-lexend);
	font-size: calc(clamp(1.5em,2.5vw,5em) * .775);
	font-style: italic;
	color: var(--color-text);
	line-height: 2.6rem;
	font-weight: var(--fw-light);
	max-width: 1000px;
	margin: 0 auto 30px;

	@media (max-width: 767px){
		font-size: 1.3rem;
		line-height: 1.6rem;
	}
`;
const Notice = styled(motion.p)`
	font-family: var(--font-lexend);
	font-size: calc(clamp(1.5em,2.5vw,5em) * .775);
	color: var(--color-blue-hover);
	line-height: 2.6rem;
	font-weight: var(--fw-light);
	max-width: 1000px;
	margin: 0px auto 30px;

	@media (max-width: 767px){
		font-size: 1.3rem;
		line-height: 1.6rem;
	}
`;
const HeroImageWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
`;

const HeroImage = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 120%; /* Чуть больше, чтобы избежать белых полос */
	
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	&::before {
		content: "";
		background-color: rgba(0, 0, 0, 0.4);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
	}
`;

const Hero = () => {
	const router = useRouter();
	const { scrollY } = useScroll();
	const yMotion = useMotionValue(0); // Начальное значение

	useEffect(() => {
		const updateY = () => {
			const scrollValue = scrollY.get();
			yMotion.set(Math.max(0, scrollValue * 0.2)); // Двигаем вниз, но не вверх
		};

		const unsubscribe = scrollY.on("change", updateY);
		return () => unsubscribe();
	}, [scrollY, yMotion]);

	return (
		<HeroWrapper>
			<HeroImageWrapper>
				<HeroImage style={{ y: yMotion }}>
					<Image src={poster} fill priority alt="Hero Image" />
				</HeroImage>
			</HeroImageWrapper>

			<Content>
				<Title light marginBottom="2vh !important" variants={animationContent} custom={1}>
					Responsible Mechanics at Oleh
				</Title>
				<Text variants={animationContent} custom={4}>
					We provide quality car repair services and roadside assistance.
				</Text>
				<Notice variants={animationContent} custom={7}>
					Your car must be in the garage — it's a requirement for the call.
				</Notice>
				<Actions>
					<MButton borderRadius="25px" onClick={() => router.push('/service-and-repair')} blue magnetic variants={animationContent} custom={5}>
						Our Services
					</MButton>
					<MButton borderRadius="25px" onClick={() => router.push('/contact-us')} light button magnetic variants={animationContent} custom={6}>
						Contact Us
					</MButton>
				</Actions>

			</Content>
		</HeroWrapper>
	);
}

export default memo(Hero);
