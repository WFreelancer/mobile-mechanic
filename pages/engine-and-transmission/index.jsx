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

const Engine = () => {
	const ref = useRef(null);
	const x = Parallax(ref);
	const router = useRouter();
	return (
		<>
			<Head>
				<title>Advanced Engine & Transmission Repairs</title>
				<meta name="description" content="Advanced Engine & Transmission Repairs" />
			</Head>
			<HeroContent image={'/card-change-3.jpg'} title={
				<>
					Advanced Engine & <br />
					Transmission Repairs
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
								<strong>Complex Engine Repair</strong><br />
								Clutch and Transmission Repair<br /><br />

								<strong>1. Scanning and Detecting Faults:</strong><br />
								We perform a thorough diagnostic to identify any issues with your engine and transmission.<br /><br />

								<strong>2. Eliminating Oil and Coolant Leaks:</strong><br />
								Our team will address any leaks, ensuring optimal fluid levels and preventing further damage.<br /><br />

								<strong>3. Replacing Damaged Gaskets:</strong><br />
								We replace worn-out or damaged gaskets to ensure a tight seal and efficient engine performance.<br /><br />

								<strong>4. Valve Mechanism Repair:</strong><br />
								We repair and fine-tune your engine's valve mechanism to restore optimal functionality.<br /><br />

								<strong>5. Clutch Replacement and Adjustment:</strong><br />
								Your clutch system will be replaced and adjusted for smoother shifts and better control.<br /><br />

								<strong>6. Identifying Transmission Problems:</strong><br />
								We diagnose and address any issues with your transmission to ensure seamless performance.
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

export default withLayout(Engine);