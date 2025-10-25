import Link from 'next/link'
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { animationContent } from '../helpers/Animations';

const BreadCrumbsWrapper = styled(motion.div)`
	margin-bottom: 40px;
	color: ${({ light }) => light ? 'var(--white)' : `var(--light-dark)`};
	font-weight: 700;

	@media (min-width: 1700px){
		font-size: 1.1rem !important;
		font-size: 1.4rem;
	};

	a{
		font-size: inherit;
		line-height: inherit;
		transition: var(--transition-sm);
		color: ${({ light }) => light ? 'var(--white)' : `var(--light-dark)`};
		@media (any-hover: hover){
			:hover{
				color: var(--color-blue);
			}
		}
	}
`
const BreadCrumbs = ({ children, ...props }) => {
	return (
		<BreadCrumbsWrapper
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true }}
			variants={animationContent} custom={1}
			{...props}
		>
			<Link href="/">Home</Link> / {children}
		</BreadCrumbsWrapper>
	)
}

export { BreadCrumbs };