import styled from 'styled-components';
import { memo } from 'react';
import { Container } from '../Container'
import { Logo } from "../Logo";
import { MenuSocial } from '../Menu';
import Link from 'next/link'
const FooterWrapper = styled.footer`
	background-color: var(--bg-dark);
	padding: 7vh 0;

	@media (max-width: 480px){
		padding: 40px 0;
	}
`
const FooterMenu = styled.div`
margin-bottom: 40px;
@media (max-width: 768px){
	display: flex;
	flex-direction:column;
}
`
const FooterMenuList = styled.ul`
	border-top: 1px #999 solid;
	border-bottom: 1px #999 solid;
	display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 20px 0;
    margin: 20px 0;
	 column-gap:10px;
	 @media (max-width: 768px){
		flex-direction:column;
		border: unset;
		align-items:center;
		row-gap:15px;
		order:1;
	}
`
const FooterMenuListLi = styled.li`
	color: #ccc;
	font-size: 18px;
	font-family: var(--font-oswald);
	text-transform: uppercase;
	:hover{
		color: #fff;
	}
`
const Row = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media (max-width: 480px){
		flex-direction: column;
	}
`

const Info = styled.span`
	color: var(--white);
	font-family: var(--font-oswald);
	text-transform: uppercase;

	@media (min-width: 1700px){
		font-size: 1.2rem;
	}
	@media (max-width: 480px){
		margin-top: 15px;
	}
`
const FooterSocial = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	@media (max-width: 768px){
		justify-content: center;
		order:2;
	}
`;
const links = [
	{ title: "Home", href: "/" },
	{ title: "About Us", href: "/about" },
	// { title: "Service & Repairs", href: "/service-and-repair" },
	{ title: "Locations", href: "/location" },
	{ title: "Contact Us", href: "/contact-us" },
]
const Footer = () => {
	return (
		<FooterWrapper>
			<Container>
				<FooterMenu>
					<FooterSocial>
						<MenuSocial />
					</FooterSocial>
					<FooterMenuList>
						{links.length > 0 &&
							links.map((link, index) => (
								<FooterMenuListLi key={index}><Link href={link.href}>{link.title}</Link></FooterMenuListLi>
							))
						}
					</FooterMenuList>
				</FooterMenu>
				<Row>
					<Logo />
					<Info>Copyright © {new Date().getFullYear()}</Info>
				</Row>
			</Container>
		</FooterWrapper>
	)
}

export default memo(Footer);