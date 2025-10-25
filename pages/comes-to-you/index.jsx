import Head from 'next/head';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { withLayout } from "../../layout/Layout";
import { MContainer } from '../../components/Container';
import React, { useRef } from "react";
import { motion } from "framer-motion";
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

export async function getServerSideProps(context) {
	const host = context.req.headers.host; // Получаем домен

	return {
		props: {
			domain: `https://${host}`,
		},
	};
}
const ComesToYou = () => {
	const ref = useRef(null);
	const x = Parallax(ref);
	const router = useRouter();
	return (
		<>
			<Head>
				<title>A mobile auto mechanic who comes to you!</title>
				<meta name="description" content="Get professional auto repair services directly at your location. We offer high-quality spare parts and on-site repairs." />
				<meta name="keywords" content="mobile auto mechanic, car repair, on-site car service, brake repair, engine diagnostics" />

				<meta property="og:type" content="website" />
				<meta property="og:title" content="A Mobile Auto Mechanic Who Comes to You!" />
				<meta property="og:description" content="We offer professional auto repair services directly at your location. Save time and get quality service!" />
				{/* <meta property="og:image" content={`${domain}/card-change-1.jpeg`} />
				<meta property="og:url" content={`${domain}/comes-to-you`} /> */}
			</Head>
			<HeroContent image={'/card-change-1.jpeg'} title="A Mobile Auto Mechanic" subtitle="Who Comes to You!" />
			<Wrapper
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				<MContainer initial="hidden" whileInView="visible" viewport={{ once: true }}>
					<MovieContent>
						<MovieInformation>
							<Text variants={animationContent} custom={1}>
								<strong>1. No Need to Drive to Us and Waste Your Time:</strong><br />
								You don’t have to drive to us, saving you time and effort.<br /><br />

								<strong>2. Professional Vehicle Inspection:</strong><br />
								We will conduct a professional inspection of your car.<br /><br />

								<strong>3. Many Repairs Can Be Done On-Site:</strong><br />
								Many issues can be resolved directly at your location.<br /><br />

								<strong>4. High-Quality Spare Parts:</strong><br />
								We offer spare parts from the best manufacturers.<br /><br />

								<strong>5. Engine, Suspension, Brake System, Steering, and Electrical Repairs:</strong><br />
								We provide repairs for your engine, suspension, brake system, steering, and electrical equipment. We also offer regular maintenance services.<br />
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

export default withLayout(ComesToYou);