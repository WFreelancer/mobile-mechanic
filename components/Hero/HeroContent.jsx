import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import styled from 'styled-components';
import { Title } from '../../components/Title';

const Wrapper = styled(motion.div)`
background: #000;`
const Overlay = styled(motion.div)`
background-color: hsla(0, 0%, 4%, .7);
position: absolute;
inset: 0;
`

const BackgroundWrapper = styled(motion.div)`
   overflow: hidden;
	margin: 0 -10px;
`
const OverlayBlock = styled(motion.div)`
--tw-text-opacity: 1;
	color: rgb(255 255 255 / var(--tw-text-opacity));
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: 100vh;
	display: flex;
	top: 0;
	left: 0;
	position: absolute;

`
const HeroContent = ({ image, title, subtitle }) => {
	return (
		<Wrapper>
			<TextParallaxContent
				imgUrl={image}
				subheading={title}
				heading={subtitle}
			/>
		</Wrapper>
	);
};

const IMG_PADDING = 0;

const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
	return (
		<div
			style={{
				paddingLeft: IMG_PADDING,
				paddingRight: IMG_PADDING,
			}}
		>
			<StickyImage imgUrl={imgUrl} />
			<OverlayCopy heading={heading} subheading={subheading} />
			{children}
		</div>
	);
};

const StickyImage = ({ imgUrl }) => {
	const targetRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ["end end", "end start"],
	});

	const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
	const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

	return (
		<BackgroundWrapper
			style={{
				backgroundImage: `url(${imgUrl})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				height: `80vh`,
				width: 'calc(100% + 15px)',
				top: IMG_PADDING,
				scale,
			}}
			ref={targetRef}
		>
			<Overlay
				style={{
					opacity,
				}}
			/>
		</BackgroundWrapper>
	);
};

const OverlayCopy = ({ subheading, heading }) => {
	const targetRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ["start end", "end start"],
	});

	const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
	const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

	return (
		<OverlayBlock
			style={{
				y,
				opacity,
			}}
			ref={targetRef}
		>
			<Title marginBottom="10px">{subheading}</Title>
			{heading && <Title type="h3">{heading}</Title>}
		</OverlayBlock>
	);
};

export default HeroContent;