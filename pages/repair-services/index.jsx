import Head from 'next/head';
import { useRef } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { withLayout } from "../../layout/Layout";
import { MContainer } from '../../components/Container';
import { animationContent } from '../../helpers/Animations';
import HeroContent from '../../components/Hero/HeroContent';
import { MButton } from '../../components/Button';
import { Parallax } from '../../hooks/Parallax';

const Wrapper = styled(motion.section)`
	position: relative;
	padding: 40px 0 15vh 0;
	overflow: hidden;
	color: var(--white);

	@media (max-width: 767px){
		padding: 7vh 0 10vh 0;
	}
`

const ImageWrapper = styled(motion.div)`
	position: relative;
	margin-bottom: 20px;

	&:before{
		content: '';
		display: block;
		padding-bottom: 152%;
	}

	@media (min-width: 1800px){
		min-height: 350px;
	};

	img{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left:0;
		object-fit: cover;
	}

	@media (max-width: 600px){
		margin-bottom: 30px;
		&:before{
			padding-bottom: 150%;
		}
	}

	@media (max-width: 480px){
		margin-left: -20px;
		margin-right: -20px;
	}
`

const MovieContent = styled.div`
	margin-bottom: 50px;
	display: flex;
	grid-column-gap: 40px;

	@media (max-width: 1024px){
		grid-column-gap: 20px;
	}

	@media (max-width: 600px){
		display: block;
		margin-bottom: 30px;
	}
`
const MovieInformation = styled(motion.div)`
	flex-grow: 1;
`
const Text = styled(motion.p)`
	color: #9f9f9f;
	strong{
		font-size: 1.2rem;
		text-transform: uppercase;
		color: #fff;
	}
	@media (min-width: 1700px){
		font-size: 1.1rem !important;
	};

	@media (max-width: 600px){
		font-size: 1.2rem;
	};
`
const CardsContentFooter = styled(motion.div)`
max-width: 600px;
margin: 40px auto 0 auto;
display: flex;
justify-content:center;
`
const RepairsServices = () => {
	const ref = useRef(null);
	const x = Parallax(ref);
	const router = useRouter();
	return (
		<>
			<Head>
				<title>Repair Services at Our Auto Shop</title>
				<meta name="description" content="Repair Services at Our Auto Shop" />
			</Head>
			<HeroContent image={'/card-change-2.avif'} title={
				<>
					Repair Services at <br />
					Our Auto Shop
				</>
			} />

			<Wrapper
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				<MContainer initial="hidden" whileInView="visible" viewport={{ once: true }}>
					<MovieContent>
						<MovieInformation initial="hidden" whileInView="visible" viewport={{ once: true }}>
							<Text variants={animationContent} custom={1}>
								<strong>1. Accurate Diagnostics of Electronic Systems and Mechanical Components:</strong><br />
								We perform reliable diagnostics on your car’s electronic systems and mechanical components.<br /><br />

								<strong>2. Vehicle Maintenance:</strong><br />
								a) Oil and fluid changes<br />
								b) Timing belt and chain replacement<br /><br />

								<strong>3. Brake System Repair:</strong><br />
								We handle all aspects of brake system repairs to ensure safety and optimal performance.<br /><br />

								<strong>4. Steering System Repair:</strong><br />
								We repair and maintain your steering system for smooth and responsive handling.<br /><br />

								<strong>5. Cooling System Repair:</strong><br />
								We fix issues in your car’s cooling system to prevent overheating and maintain engine performance.<br /><br />

								<strong>6. Transmission and Clutch Repair:</strong><br />
								We repair and maintain your car’s transmission and clutch to keep your vehicle shifting smoothly.<br /><br />

								<strong>7. Electrical Equipment, Starter, and Alternator Repair:</strong><br />
								Our specialists will repair electrical equipment, starters, and alternators to keep your car running efficiently.<br /><br />

								<strong>8. High-Quality Spare Parts:</strong><br />
								We offer spare parts from the best manufacturers to ensure durability and performance.<br />
							</Text>

						</MovieInformation>
					</MovieContent>
					<CardsContentFooter variants={animationContent} custom={2}>
						<MButton
							ref={ref}
							button
							magnetic
							circle="true"
							blue
							onClick={() => router.push('/contact-us')}
							style={{ x }}
						>
							Contact Us
						</MButton>
					</CardsContentFooter>
				</MContainer>
			</Wrapper>
		</>
	)
}

export default withLayout(RepairsServices);