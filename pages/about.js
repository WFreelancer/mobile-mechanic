import { useRef } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { withLayout } from "../layout/Layout";
import { Container } from '../components/Container';
import { animationContent } from '../helpers/Animations';
import { MTitle } from '../components/Title';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { MButton } from '../components/Button';
import { Parallax } from '../hooks/Parallax';

const Wrapper = styled(motion.div)`
	background-color: var(--white);
	padding: 10vh 0 15vh 0;
`

const Information = styled(motion.div)`
	flex-grow: 1;
`
const Li = styled(motion.li)`
font-size: 1.1rem !important;
	margin-bottom: 20px;
`
const Text = styled(motion.p)`
	font-size: 1.1rem !important;
	margin-bottom: 20px;
	@media (min-width: 1700px){
		font-size: 1.5rem;
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
const About = () => {
	const ref = useRef(null);
	const x = Parallax(ref);
	const router = useRouter();
	return (
		<>
			<Head>
				<title>About Us</title>
				<meta name="description" content="We are dedicated to providing top-quality mobile auto repair services right at your location" />
			</Head>
			<Wrapper
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				<Container type="small">
					<BreadCrumbs>About Us</BreadCrumbs>

					<Information initial="hidden" whileInView="visible" viewport={{ once: true }}>
						<MTitle marginBottom="9vh" variants={animationContent} custom={2}>
							About Us
						</MTitle>
						<Text variants={animationContent} custom={3}>
							<strong>At Responsible Mechanics at Oleh, we bring the repair shop to you!</strong>
							<br />Our team of experienced mechanics ensures that your vehicle gets expert care **without the hassle of towing**.
						</Text>

						<Text variants={animationContent} custom={4}>
							<strong>Why Choose Us?</strong>
						</Text>
						<ul>
							<Li variants={animationContent} custom={5}>
								<strong>🚗 Convenience:</strong> We come to you. (Your car must be in the garage — it's a requirement for the call.)
							</Li>
							<Li variants={animationContent} custom={6}>
								<strong>🔍 Expert Diagnostics:</strong> We quickly identify and fix issues to keep your car running smoothly.
							</Li>
							<Li variants={animationContent} custom={7}>
								<strong>🛠️ Quality Repairs:</strong> Using only high-quality parts, we ensure long-lasting performance.
							</Li>
							<Li variants={animationContent} custom={8}>
								<strong>💯 Customer Satisfaction:</strong> We prioritize **honest pricing, reliability, and excellent service**.
							</Li>
						</ul>

						<Text variants={animationContent} custom={9}>
							Car troubles shouldn’t disrupt your day. That’s why we provide **hassle-free, on-site repairs** to save you time and stress.
						</Text>

						<Text variants={animationContent} custom={10}>
							<strong>Got a problem with your car? <br /> Contact us today and let us take care of it! 🚘</strong>
						</Text>
						<CardsContentFooter variants={animationContent} custom={11}>
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
					</Information>
				</Container>
			</Wrapper>
		</>
	);
};


export default withLayout(About);