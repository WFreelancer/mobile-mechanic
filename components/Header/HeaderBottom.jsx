import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BurgerFixed, Burger } from '../Button';
import { FixedMenu } from '../Menu';
import { Logo } from '../Logo';
import { Container } from '../Container';

const HeaderBottomWrapper = styled.div`
	margin: 0 auto;
	min-height: 74px;
	display: flex;
	align-items: center;

	@media (min-width: 1800px){
		min-height: 108px;
	}

	@media (max-width: 1024px){
		min-height: 56px;
	}

	@media (max-width: 450px){
		padding: 15px 0;
	}
`;

const HeaderContent = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const MenuEl = styled.ul`
	display: flex;
	white-space: nowrap;
	overflow-x: scroll;
	max-width: max-content;
	-webkit-font-smoothing: antialiased;
	scrollbar-width: none;

	li {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		color: var(--white);
	}

	::-webkit-scrollbar {
		display: none;
	}

	-scrollbar {
		display: none;
	}

	@media (max-width: 1100px){
		display: none;
	}
`;

const MenuLink = styled.a`
	font-family: var(--font-lexend);
	color: ${({ isActive }) => (isActive ? '#000' : 'var(--white)')};
	font-size: 13px;
	font-weight: 600;
	text-transform: uppercase;
	padding: 10px 20px;
	cursor: pointer;
	transition: var(--transition-sm);
	z-index: 2;

	@media (min-width: 1800px){
		font-size: 18px;
		padding: 15px 30px;
	}

	@media (any-hover: hover){
		:hover {
			color: var(--color-blue);
		}
	}
`;

const AnimBackground = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: var(--white);
	border-radius: 30px;
	z-index: 1;
`;

const links = [
	{ title: "Home", href: "/" },
	{ title: "About Us", href: "/about" },
	// { title: "Service & Repairs", href: "/service-and-repair" },
	{ title: "Locations", href: "/location" },
	{ title: "Contact Us", href: "/contact-us" },
	{ title: "Gallery", href: "/gallery" },
];

const HeaderBottom = () => {
	const router = useRouter();
	const initialIndex = links.findIndex(link => link.href === router.pathname);
	const [activeLink, setActiveLink] = useState(initialIndex !== -1 ? initialIndex : 0);

	useEffect(() => {
		const currentIndex = links.findIndex(link => link.href === router.pathname);
		setActiveLink(currentIndex !== -1 && currentIndex);
	}, [router.pathname]);

	return (
		<HeaderBottomWrapper>
			<Container>
				<HeaderContent>
					<Logo />
					<MenuEl>
						{links.map((link, index) => (
							<motion.li
								key={index}
								onClick={() => setActiveLink(index)}
								style={{ position: "relative" }}
							>
								{activeLink === index && (
									<AnimBackground
										layoutId="active-bg"
										transition={{
											type: 'spring',
											stiffness: 300,
											damping: 30
										}}
									/>
								)}
								<Link href={link.href} legacyBehavior>
									<MenuLink isActive={activeLink === index}>{link.title}</MenuLink>
								</Link>
							</motion.li>
						))}
					</MenuEl>
					<Burger />
					<FixedMenu links={links} />
					<BurgerFixed />
				</HeaderContent>
			</Container>
		</HeaderBottomWrapper>
	);
};

export { HeaderBottom };
