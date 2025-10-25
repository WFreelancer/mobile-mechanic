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
import Subscribe from '../components/Form/Subscribe';
import cardImage3 from '../public/author.jpg';
import Image from 'next/image';
const Wrapper = styled(motion.div)`
background-color: var(--bg-dark);
	padding: 9vh 0;
	width: 100%;
	color:var(--white);
	@media (max-width: 400px){
		padding: 50px 0 20px 0;
	}

`

const Columns = styled(motion.div)`
grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
grid-gap: 30px;
display: grid;

@media (max-width: 400px){
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
p{
	max-width: 600px;
	margin-bottom:20px;
}
a{
	margin-bottom:8px;
}
span{
	display: flex;
	margin-bottom:8px;
}
`
const CardsContentFooter = styled.div`
max-width: 600px;
margin: 40px auto 0 auto;
display: flex;
justify-content:center;
`

const Figure = styled.figure`
	height:100px;
	flex: 0 0 100px;
	position: relative;
	margin-right: 20px;
	border-radius:50%;
	overflow:hidden;
	@media (max-width: 768px){
		height:80px;
	flex: 0 0 80px;
	}

`

const ImageEl = styled(Image)`
	position: absolute;
	width: 100%;
	height: 100%;
	object-fit: cover;
`
const Column = styled(motion.div)``

const HeaderTitle = styled(motion.div)`
display: flex;
margin-bottom: 4vh;
align-items: center;
`

const Contact = () => {
	const ref = useRef(null);
	const x = Parallax(ref);
	const router = useRouter();
	return (
		<>
			<Head>
				<title>Contact Us</title>
				<meta name="description" content="We’d love to hear from you! Whether you need assistance with your vehicle, have questions about our on-site repair services, or just want to share your experience, we’re here to help." />
			</Head>
			<Wrapper
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				<Container>
					<BreadCrumbs light>Contact Us</BreadCrumbs>
				</Container>
				<Subscribe padding="8vh 0 10vh 0" />
				<Container>
					<HeaderTitle>
						<Figure>
							<ImageEl src={cardImage3} alt="author" />
						</Figure>
						<MTitle marginBottom="0 !important" textAlign="left" type="h1" light style={{ display: 'flex' }}>
							Let’s work
							together</MTitle>
					</HeaderTitle>
					<Columns>
						<Column>
							<p>We’d love to hear from you! Whether you need assistance with your vehicle, have questions about our on-site repair services, or just want to share your experience, we’re here to help.</p>

							<p><strong>Get in touch with us:</strong></p>
							<span>8am – 5pm PST</span>
							<span>Monday–Friday</span>
						</Column>
						<Column>
							<MButton href="mailto:oleg18051978@gmail.com" borderRadius="25px" dark magnetic variants={animationContent} custom={6}>
								oleg18051978@gmail.com
							</MButton>
							<br />
							<MButton href="tel:16725580350" borderRadius="25px" dark magnetic variants={animationContent} custom={6}>
								+1 (672) 558 0350
							</MButton>
						</Column>
					</Columns>
					<CardsContentFooter>
						<MButton
							ref={ref}
							button
							magnetic
							circle="true"
							blue
							onClick={() => router.push('/location')}
							style={{ x }}
						>
							Our Location
						</MButton>
					</CardsContentFooter>
				</Container>
			</Wrapper>
		</>
	);
};


export default withLayout(Contact);