import { useRef, useState, memo } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import useMouse from "@react-hook/mouse-position";

import { withLayout } from "../layout/Layout";
import { Container } from '../components/Container';
import { animationContent } from '../helpers/Animations';
import { MTitle } from '../components/Title';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { MButton } from '../components/Button';
import { Parallax } from '../hooks/Parallax';
// import { AiOutlinePlayCircle as IconPlay } from "react-icons/ai";
import { MdOutlinePlayCircleFilled as IconPlay } from "react-icons/md";

import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-video.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";


const Wrapper = styled(motion.div)`
background-color: var(--bg-dark);
padding: 9vh 0;
width: 100%;
color:var(--white);
@media (max-width: 400px){
	padding: 50px 0 20px 0;
}
`

const Information = styled(motion.div)`
	width: 100%;
`
const Content = styled(motion.div)`
.lg-react-element {
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 20px;
	display: grid;
 }
 @media (max-width: 767px){
	.lg-react-element {
		grid-template-columns: repeat(1, 1fr);
	 }
	}

 /* Дополнительные стили для изображений внутри lightGallery */
 .lg-react-element a {
	display: block;
	width: 100%;
	height: 100%;
	overflow: hidden;
 }
 .lg-react-element a:nth-child(1){
	grid-column: span 2;
	grid-row: span 2;
	@media (max-width: 767px){
		grid-column: span 1;
		grid-row: span 1;
	}
 }

 .lg-react-element img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: 10px;
 }
`
const ImageWrapper = styled(motion.a)`
	position: relative;
	width: 100%;
	height: 100%;
	
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

const CardsContentFooter = styled(motion.div)`
max-width: 600px;
margin: 40px auto 0 auto;
display: flex;
justify-content:center;
`

const StyledIconPlay = styled(IconPlay)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 150px;

    @media (max-width: 767px) {
        font-size: 70px;
    }
`;

const Gallery = () => {
	const ref = useRef(null);
	const x = Parallax(ref);
	const router = useRouter();

	const isInitialized = useRef(false);

	const onInit = () => {
		if (!isInitialized.current) {
			console.log('lightGallery has been initialized');
			isInitialized.current = true;
		}
	};


	return (
		<>
			<Head>
				<title>Gallery</title>
				<meta name="description" content="Gallery" />
			</Head>
			<Wrapper
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				<Container>
					<BreadCrumbs light={true}>Gallery</BreadCrumbs>

					<Information initial="hidden" whileInView="visible" viewport={{ once: true }}>
						<MTitle marginBottom="9vh" variants={animationContent} custom={2} light={true}>
							Gallery
						</MTitle>
						<Content variants={animationContent} custom={4}>
							<LightGallery
								onInit={onInit}
								speed={500}
								plugins={[lgThumbnail, lgZoom, lgVideo]}

							>
								<ImageWrapper
									href={`https//www.youtube.com/watch?v=pBFJzdy2U50`}
									data-lg-size="1280-720"
									data-src={`https//www.youtube.com/watch?v=pBFJzdy2U50`}
									data-poster={`https://img.youtube.com/vi/pBFJzdy2U50/maxresdefault.jpg`}

								>
									<img
										alt="My story"
										width="300"
										height="100"
										className="img-responsive"
										src={`https://img.youtube.com/vi/pBFJzdy2U50/maxresdefault.jpg`}
									/>
									<StyledIconPlay color='#fff' />
								</ImageWrapper>
								<ImageWrapper
									href={`https//www.youtube.com/watch?v=tGphsFtl6Ro`}
									data-lg-size="1280-720"
									data-src={`https//www.youtube.com/watch?v=tGphsFtl6Ro`}
									data-poster="/gallery-2.jpg"
								>
									<img
										alt="Rebuilding power rack"
										width="300"
										height="100"
										className="img-responsive"
										src={`/gallery-2.jpg`}
									/>
									<IconPlay color='#fff' style={{
										position: 'absolute',
										top: '50%',
										left: '50%',
										transform: 'translate(-50%, -50%)',
										fontSize: '90px',

									}} />
								</ImageWrapper>
								<ImageWrapper
									href={`https//www.youtube.com/watch?v=sz6GroQstAA`}
									data-lg-size="1280-720"
									data-src={`https//www.youtube.com/watch?v=sz6GroQstAA`}
									data-poster="/gallery-3.jpg"
								>
									<img
										alt="Heater Blowing Cold"
										width="300"
										height="100"
										className="img-responsive"
										src="/gallery-3.jpg"
									/>
									<IconPlay color='#fff' style={{
										position: 'absolute',
										top: '50%',
										left: '50%',
										transform: 'translate(-50%, -50%)',
										fontSize: '90px'
									}} />
								</ImageWrapper>
							</LightGallery>
						</Content>
						<CardsContentFooter variants={animationContent} custom={6}>
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


export default memo(withLayout(Gallery));
