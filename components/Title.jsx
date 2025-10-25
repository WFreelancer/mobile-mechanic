import { forwardRef } from "react";
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion'

const TitleBig = styled.h1`
	font-family: var(--font-oswald);
	z-index: 1;
	position: relative;
	text-align: ${({ textAlign }) => textAlign ? textAlign : `center`};
	font-weight: var(--fw-regular);
	margin-bottom: ${({ marginBottom }) => marginBottom ? marginBottom : `4vh`};
	color: ${({ light }) => light ? 'var(--white)' : `inherit`};

	font-size: calc(clamp(3.25em, 7vw, 8em) * .875);


	@media (max-width: 768px){
		font-size: 50px;
		margin-bottom: 40px;
	}
`;
const TitleMiddle = styled.h2`
	font-family: var(--font-lexend);
	z-index: 1;
	position: relative;
	text-align: ${({ textAlign }) => textAlign ? textAlign : `center`};
	font-weight: var(--fw-regular);
	margin-bottom: ${({ marginBottom }) => marginBottom ? marginBottom : `4vh`};
	color: ${({ light }) => light ? 'var(--white)' : `inherit`};
	font-size: calc(clamp(1.5em,5vw,5em) * .775);

	@media (max-width: 768px){
		font-size: 30px;
	}
`;
const TitleSmall = styled.h3`
	z-index: 1;
	position: relative;
	text-align: ${({ textAlign }) => textAlign ? textAlign : `center`};
	font-weight: var(--fw-regular);
	margin-bottom: ${({ marginBottom }) => marginBottom ? marginBottom : `4vh`};
	color: ${({ light }) => light ? 'var(--white)' : `inherit`};
	font-size: calc(clamp(2em, 5vw, 6em) * .675);
`;

// eslint-disable-next-line
const Title = forwardRef(({ children, type, ...props }, ref) => {
	switch (type) {
		case 'h1':
			return <TitleBig ref={ref} {...props}>{children}</TitleBig>
		case 'h2':
			return <TitleMiddle ref={ref} {...props}>{children}</TitleMiddle>
		case 'h3':
			return <TitleSmall ref={ref} {...props}>{children}</TitleSmall>
		default:
			return <TitleBig ref={ref} {...props}>{children}</TitleBig>
	}
})

const MTitle = motion(Title);

export { Title, MTitle };