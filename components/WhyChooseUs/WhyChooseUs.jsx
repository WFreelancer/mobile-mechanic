import { useRef, memo } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import {
	motion,
	useMotionTemplate,
	useMotionValue,
	useSpring,
} from "framer-motion";
import { Container } from '../Container';
import { MButton } from '../Button';
import { Parallax } from '../../hooks/Parallax';
import { HeightEl } from '../../hooks/HeightEl';
import cardImage from '../../public/icons/1.png';
import cardImage2 from '../../public/icons/2.png';
import cardImage3 from '../../public/icons/3.png';
import error from '../../public/image-not-found.png';

import { Title } from '../Title';
import Image from 'next/image';

const CardsBody = styled(motion.div)`
	position: relative;
	grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
	grid-gap: 10px;
	display: grid;
	margin-bottom: 70px;

	@media (max-width: 1024px){
		margin-bottom: 50px;
	}
	@media (max-width: 400px){
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	}
`

const CardsWrapper = styled.section`
padding-top: 10vh;
background-color: var(--white);
`
const CardsContent = styled.div`
	text-align:center;
	padding-bottom: 10vh;
`
const CardsContentFooter = styled.div`
	height: clamp(9em, 12vw, 11em);
`

const RoundedWrap = styled.div`
	width: 100%;
	position: relative;
	height: 0;
	display: block;
	z-index: 2;
`

const RoundedParent = styled(motion.div)`
	transform: translateY(-1px);
	will-change: height;
	width: 100%;
	top: 0;
	position: relative;
	overflow: hidden;
	height: 70px;

	@media (max-width: 768px){
		height: 50px;
	}
`
const RoundedChild = styled.div`
	width: 150%;
	display: block;
	position: absolute;
	background: #fff;
	height: 750%;
	left: 50%;
	border-radius: 50%;
	transform: translate(-50%, -86.666%);
	z-index: 1;
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
	left: 0px;
	top: 0;
	object-fit: contain;
	transition: transform .4s linear;
	@media (max-width: 768px){
		top: 20px !important;
	}
`
const Body = styled.div`
	padding: 30px;
	display: flex;
	flex-direction: column;
	justify-content: center;
`

const CardWrapper = styled.div`
	transform: translateZ(75px);
	transformStyle: preserve-3d;
	background: #1C1D20;
	height: 100%;
	width: 100%;
	padding: 10px;
	display: flex;
	border-radius: .75rem;
	@media (max-width: 768px){
		flex-direction:column;
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
const cards = [
	{ poster_path: cardImage, title: 'Transparent Pricing', description: 'No hidden surprises – just fair pricing. We provide quotes only after a thorough inspection and diagnosis of the issue.', id: '1' },
	{ poster_path: cardImage2, title: 'Convenience & Punctuality', description: 'Choose the time and place that work best for you – we’ll take care of the rest.', id: '2' },
	{ poster_path: cardImage3, title: 'Guaranteed Quality', description: 'In addition to repairs, we offer mobile car services, ensuring top-quality maintenance and professional care for your vehicle.', id: '3' },

]

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;
const WhyChooseUs = () => {
	const router = useRouter();
	const ref = useRef(null);
	const round = useRef(null);
	const payload = { cards };
	const x = Parallax(ref, payload);
	const height = HeightEl(round, payload);


	const refCards = useRef([]);

	const motionValues = useRef(
		cards.map(() => ({
			refCardX: useMotionValue(0),
			refCardY: useMotionValue(0),
		}))
	).current;


	const handleMouseMove = (e, index) => {
		const refCard = refCards.current[index];
		if (!refCard) return;

		const rect = refCard.getBoundingClientRect();
		const width = rect.width;
		const height = rect.height;

		const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
		const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

		const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
		const rY = mouseX / width - HALF_ROTATION_RANGE;

		motionValues[index].refCardX.set(rX);
		motionValues[index].refCardY.set(rY);
	};

	const handleMouseLeave = (index) => {
		motionValues[index].refCardX.set(0);
		motionValues[index].refCardY.set(0);
	};



	return (
		<CardsWrapper>
			<Container>
				<Title marginBottom="9vh">Why Choose Us</Title>
				<CardsContent>
					<CardsBody>
						{/* {cards.map((card) => {
							return <MCardSecond
								layout
								key={card.id}
								{...card}
								variants={animationCard}
								initial="hidden"
								exit={{ opactiy: 0 }}
								whileInView="visible"
								viewport={{ once: true }}
							/>
						})} */}
						{cards.map((card, index) => {
							const xSpring = useSpring(motionValues[index].refCardX);
							const ySpring = useSpring(motionValues[index].refCardY);

							const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;
							return <motion.div
								key={card.id}
								ref={(el) => (refCards.current[index] = el)}
								onMouseMove={(e) => handleMouseMove(e, index)}
								onMouseLeave={() => handleMouseLeave(index)}
								style={{
									transformStyle: "preserve-3d",
									transform,
									background: 'radial-gradient(black, transparent)',
									padding: '10px',
									position: 'relative',
									borderRadius: '.75rem'
								}}
							>
								<CardWrapper>
									<Figure
										style={{
											transform: "translateZ(75px)",
										}}
									>
										<ImageEl src={card.poster_path ? card.poster_path : error} alt={card.title} fill sizes="100%" />
									</Figure>
									<Body style={{
										transform: "translateZ(50px)",
										color: '#fff'
									}}>
										<TitleEl>{card.title}</TitleEl>
										<Text>{card.description} </Text>
									</Body>
								</CardWrapper>
							</motion.div>
						})}
					</CardsBody>
					<CardsContentFooter>
						<MButton
							ref={ref}
							button
							magnetic
							circle="true"
							blue
							onClick={() => router.push('/contact-us')}
							style={{ x }}
						>
							Get in Touch
						</MButton>
					</CardsContentFooter>
				</CardsContent>
			</Container>
			<RoundedWrap>
				<RoundedParent
					ref={round}
					style={{ height }}
				>
					<RoundedChild></RoundedChild>
				</RoundedParent>
			</RoundedWrap>
		</CardsWrapper>
	)
}

export default memo(WhyChooseUs);

