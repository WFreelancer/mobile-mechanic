import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { withLayout } from "../layout/Layout";
import { Container } from '../components/Container';
import { MTitle } from '../components/Title';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { MButton } from '../components/Button';
import { Parallax } from '../hooks/Parallax';
import dynamic from 'next/dynamic';
import location from '../public/location.png';
import { animationContent, animationImagePageMovie } from '../helpers/Animations';
import { SiGooglemaps } from 'react-icons/si';
import { FaApple } from 'react-icons/fa';

import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// If you want you can use SCSS instead of css
import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

const Wrapper = styled(motion.div)`
	background-color: var(--bg-dark);
	padding: 9vh 0;
	width: 100%;
	color: var(--white);
	@media (max-width: 400px){
		padding: 50px 0 20px 0;
	}
`;

const MapWrapper = styled(motion.div)`
	height: 400px;
	width: 100%;
	border-radius: 10px;
	overflow: hidden;
	margin-bottom: 50px;
`;

const Columns = styled(motion.div)`
	grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
	grid-gap: 30px;
	display: grid;

	@media (max-width: 400px){
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	}
	p {
		max-width: 600px;
		margin-bottom:20px;
	}

	span {
		display: flex;
		align-items: center;
	}
`;

const Column = styled(motion.div)`
`;

const ColumnSecond = styled(motion.div)`
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	grid-gap: 20px;
	display: grid;
	
	.lg-react-element {
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-gap: 20px;
		display: grid;
	 }
  
	 /* Дополнительные стили для изображений внутри lightGallery */
	 .lg-react-element a {
		display: block;
		width: 100%;
		// height: 100%;
		overflow: hidden;
	 }
  
	 .lg-react-element img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 10px;
	 }
`;

const CardsContentFooter = styled.div`
	max-width: 600px;
	margin: 40px auto 0 auto;
	display: flex;
	justify-content: center;
`;

const ImageWrapper = styled(motion.a)`
	position: relative;
	width: 100%;
	height: 60%;
	
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

`;

const Information = styled(motion.div)``;



// Специфичные компоненты для Google и Apple Maps с кастомными цветами


const Map = dynamic(() => import('../components/CustomMap'), { ssr: false });

const Location = () => {
	const ref = useRef(null);
	const x = Parallax(ref);
	const router = useRouter();

	const onInit = () => {
		console.log('lightGallery has been initialized');
	};


	return (
		<>
			<Head>
				<title>Our Location</title>
				<meta
					name="description"
					content="We are dedicated to providing top-quality mobile auto repair services right at your location"
				/>
			</Head>
			<Wrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
				<Container>
					<BreadCrumbs light>Our Location</BreadCrumbs>
				</Container>
				<Container>
					<Information initial="hidden" whileInView="visible" viewport={{ once: true }}>
						<MTitle marginBottom="9vh" variants={animationContent} custom={2}>
							Our Location
						</MTitle>
						<MapWrapper
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							variants={animationImagePageMovie}
						>
							<Map />
						</MapWrapper>
						<Columns>
							<Column variants={animationContent} custom={3}>
								<p>
									<strong>Our Address:</strong>
								</p>
								<p>Vancouver, BC, 3058 E 18th Ave (Backyard entrance)</p>
								<p>
									<strong>View on Maps:</strong>
								</p>

								<MButton
									href="https://maps.app.goo.gl/fyKcG8aL4RwW7dRx8"
									borderRadius="25px"
									dark
									magnetic
									variants={animationContent}
									custom={6}
								>
									<SiGooglemaps size={24} />
									<strong>Google Maps</strong>
								</MButton>
								<br />

								<MButton
									href="https://maps.apple.com/?address=3058%20E%2018th%20Ave,%20Ванкувер%20BC%20V5M%202P3,%20Канада&ll=49.255900,-123.036300&q=3058%20E%2018th%20Ave&t=m"
									borderRadius="25px"
									dark
									magnetic
									variants={animationContent}
									custom={6}
								>
									<FaApple size={24} />
									<strong>Apple Maps</strong>
								</MButton>

							</Column>
							<ColumnSecond>
								<LightGallery
									onInit={onInit}
									speed={500}
									plugins={[lgThumbnail, lgZoom]}
								>
									<ImageWrapper href="/me.jpg">
										<img alt="" src="/me.jpg" />
									</ImageWrapper>
									<ImageWrapper href="/me2.jpg">
										<img alt="" src="/me2.jpg" />
									</ImageWrapper>
									{/* <ImageWrapper href="/location.png">
										<img alt="Inside view" src="/location.png" />
									</ImageWrapper> */}
								</LightGallery>
							</ColumnSecond>
						</Columns>
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
								Contact Us
							</MButton>
						</CardsContentFooter>
					</Information>
				</Container>
			</Wrapper>
		</>
	);
};

export default withLayout(Location);
