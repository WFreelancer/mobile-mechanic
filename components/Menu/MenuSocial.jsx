import styled from 'styled-components';
import { FaInstagram, FaFacebookF, FaPhoneAlt } from "react-icons/fa";
import { forwardRef } from "react";
const MenuBody = styled.nav`
	display: flex;
	align-items: center;
	transition: var(--transition-sm);
`

const SocialList = styled.div`
	display: flex;
	flex-wrap: wrap;
	position: relative;
`
const LinkIcon = styled.a`
	display: inline-flex;
	align-items: center;
	justify-content: center; 
	cursor: pointer;
	width: 35px;
	height: 35px;
	background-color: #f1f1f1;
	margin-right: 15px;
	border-radius: 30%;
	box-shadow: 0 5px 15px -5px #ffffff70;
	position: relative;
	overflow: hidden;

	&:last-child{
		margin-right: 0;
	}
	svg{
		color: var(--color-blue);
		font-size: 16px;
		transition: all 0.2s;
	}

	&:before{
		content: '';
		position: absolute;
		width: 120%;
		height: 120%;
		background-color: var(--color-blue);
		left: -110%;
		top: 90%;
		transform: rotate(45deg);
	}

	@keyframes animation {
		0%{
			left: -110%;
			top: 90%;
		}
		50%{
			left: 15%;
			top: -30%;
		}
		100%{
			left: -10%;
			top: -10%;
		}
	}

	&:hover{
		svg{
			color: #f1f1f1;
			transform: scale(1.2);
		}
		&:before{
			animation: animation 0.7s 1 forwards;
		}
	}

`
const LinkIconBig = styled.a`
	display: inline-flex;
	align-items: center;
	justify-content: center; 
	cursor: pointer;
	width: 45px;
	height: 45px;
	background-color: #f1f1f1;
	margin-right: 15px;
	border-radius: 30%;
	box-shadow: 0 5px 15px -5px #ffffff70;
	position: relative;
	overflow: hidden;

	&:last-child{
		margin-right: 0;
	}
	svg{
		color: var(--color-blue);
		font-size: 18px;
		transition: all 0.2s;
	}

	&:before{
		content: '';
		position: absolute;
		width: 120%;
		height: 120%;
		background-color: var(--grey-dark);
		left: -110%;
		top: 90%;
		transform: rotate(45deg);
	}

	@keyframes animation {
		0%{
			left: -110%;
			top: 90%;
		}
		50%{
			left: 15%;
			top: -30%;
		}
		100%{
			left: -10%;
			top: -10%;
		}
	}

	&:hover{
		svg{
			color: #f1f1f1;
			transform: scale(1.2);
		}
		&:before{
			animation: animation 0.7s 1 forwards;
		}
	}

`
const links = [
	{ href: "tel:+16725580350", icon: <FaPhoneAlt /> },
	{ href: "https://www.facebook.com/profile.php?id=100051005363163", icon: <FaFacebookF /> },
	{ href: "https://www.instagram.com/tatarinov2245/?igsh=MWY5NHhmaXFnM3B1Ng%3D%3D&utm_source=qr#", icon: <FaInstagram /> },
]

const MenuSocial = forwardRef(({ children, type, ...props }, ref) => {
	switch (type) {
		case 'main':
			return <MenuBody>
				<SocialList>
					{links.map((link, index) =>
						<LinkIcon key={index} href={link.href} legacyBehavior>
							{link.icon}
						</LinkIcon>
					)}
				</SocialList>
			</MenuBody >
		case 'big':
			return <MenuBody>
				<SocialList>
					{links.map((link, index) => <LinkIconBig key={index} href={link.href} legacyBehavior>
						{link.icon}
					</LinkIconBig>
					)}
				</SocialList>
			</MenuBody >
		default:
			return <MenuBody>
				<SocialList>
					{links.map((link, index) => <LinkIcon key={index} href={link.href} legacyBehavior>
						{link.icon}
					</LinkIcon>)}
				</SocialList>
			</MenuBody >
	}
})

export { MenuSocial };


