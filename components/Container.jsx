import { forwardRef } from 'react'
import styled from 'styled-components';
import { motion } from 'framer-motion'

const ContainerEl = styled(motion.div)`
	max-width: 1400px;
	width: 100%;
	padding: 0 20px;
	margin: 0 auto;
	border-bottom: ${({ border }) => border && border};

	@media (min-width: 1700px){
		max-width: 1600px;
	}
`;

const ContainerElSm = styled.div`
	max-width: 1000px;
	width: 100%;
	padding: 0 20px;
	margin: 0 auto;
	border-bottom: ${({ border }) => border && border};

	@media (min-width: 1700px){
		max-width: 1200px;
	}
`;
// eslint-disable-next-line
const Container = forwardRef(({ border, type, children }, ref) => {
	switch (type) {
		case 'main':
			return <ContainerEl ref={ref} border={border}>{children}</ContainerEl>
		case 'small':
			return <ContainerElSm ref={ref} border={border}>{children}</ContainerElSm>
		default:
			return <ContainerEl ref={ref} border={border}>{children}</ContainerEl>
	}
})
const MContainer = motion(Container);
export { Container, MContainer };