import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { actionOpenMenu } from '../../store/menu/actions-menu';
import { Overlay } from '../Overlay';
import { MenuSocial } from '../Menu';
const FixedNav = styled.nav`
	position: fixed;
	right: 0;
	top: 0;
	height: 100vh;
	background: var(--bg-dark);
	z-index: 100;
	transform: translate(calc(100% + 6vw),0) rotate(0.001deg);
	transition: transform .8s cubic-bezier(.7, 0, .2, 1);
	will-change: transform;

	${({ menuOpen }) => menuOpen && `
			transform: translate(0,0) rotate(0.001deg);
		`
	}

	@media (max-width: 550px){
		transform: translate(calc(100% + 20vw), 0px) rotate(0.001deg);
		width: 100%;
		${({ menuOpen }) => menuOpen && `
			transform: translate(0,0) rotate(0.001deg);
		`
	}
	}

	::-webkit-scrollbar {
		display: none;
	}

	::-scrollbar {
		display: none;
	}
`

const FixedNavContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
	padding: 10vh 7.5vw 9vh 7.5vw;
	position: relative;
	transform: translate(0,0) rotate(0.001deg);
	transition: all .6s cubic-bezier(.7, 0, .2, 1);
	will-change: transform;
	z-index: 2;
	overflow: auto;

	@media (max-width: 1024px){
		padding: 15vh 9.5vw 7vh 9.5vw;
	}

	@media (max-width: 550px){
		padding: 15vh 6vw 7vh 6vw;
	}


	${({ menuOpen }) => menuOpen && `
			transform: translate(0,0) rotate(0.001deg);
		`
	}
`
const Nav = styled.div``

const FixedNavHeader = styled.div`
	border-bottom: 1px solid var(--color-border-light);

	h5{
		margin-bottom: 2em;
		text-transform: uppercase;
		color: var(--white);
		@media (min-width: 1700px){
			font-size: 0.8rem;
		}
	}
`

const FixedList = styled.ul`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 30px 0;
	margin: 0 -20px;

	li{
		transform: translate(15vw,0) rotate(0.001deg);
		transition: all .8s cubic-bezier(.7, 0, .2, 1);
		transition-delay: 0s;
		will-change: transform;
		overflow: hidden;
		padding: 0 20px;

		:nth-child(3){
			transition-delay: .03s;
		}
		:nth-child(3){
			transition-delay: .06s;
		}
		:nth-child(4){
			transition-delay: .09s;
		}

		:nth-child(4){
			transition-delay: .09s;
		}

		:nth-child(5){
			transition-delay: .12s;
		}

		${({ menuOpen }) => menuOpen && `
				transform: translate(0,0) rotate(0.001deg);
			`
	}
		:last-child{
			margin-bottom: 0px;
		}
	}
`

const FixedLink = styled.a`
	display: inline-block;
	position: relative;
	cursor: pointer;
	line-height: 1.4;
	font-size: calc(clamp(3.25em, 5vw, 4em) * .875);
	color: transparent;
	padding: 5px;
	font-family: var(--font-oswald);


	@media (min-width: 1700px){
		font-size: 3.5em;
	} 

	&:before{
		content: attr(data-text);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		color: var(--white);
		transition: color 0.2s ease, transform 0.5s;
		clip-path: polygon(0 0, 100% 0, 100% 41%, 0 48%);
	}

	&:after{
		content: attr(data-text);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		color: var(--white);
		transition: color 0.2s ease, transform 0.5s;
		clip-path: polygon(0 100%, 100% 100%, 100% 41%, 0 48%);
	}
	
	@media (any-hover: hover){
		:hover{
			&:before{
				color: var(--color-blue-hover);
				transform: translate(10px, -3px);
			}
			&:after{
				color: var(--color-blue-hover);
				transform: translate(-10px, 3px);
			}
		}
	}

	@media (max-width: 1000px){
		font-size: calc(clamp(3.25em, 5vw, 4em) * .775);
	}

	@media (max-width: 550px){
		line-height: unset;
	}

	@media (max-width: 380px){
		font-size: calc(clamp(3.25em, 5vw, 4em) * .6);
	}
	
	${({ activeLink }) => activeLink && `
		&:before{
			color: var(--white);
			transform: none;
		}
		&:after{
			color: var(--white);
			transform: none;
		}
	`}
`

const Social = styled.div`
	h5{
		margin-bottom: 3vh;
		text-transform: uppercase;
		color: var(--white);

		@media (min-width: 1700px){
			font-size: 0.8rem;
		}
	}

	@media (max-width: 1024px){
		padding-top: 20px;
		border-top: 1px solid var(--color-border-light);
	}
`
const SocialList = styled.div`
	display: flex;
	flex-wrap: wrap;
	position: relative;
	min-width: 310px;
	@media (max-width: 480px){
		min-width: unset;
	};
`

const FixedRoundedWrapper = styled.div`
	position: absolute;
	left: 1px;
	transform: translateX(-100%);
	height: 100%;
	top: 0;
`

const FixedRoundedBody = styled.div`
	width: 6vw;
	height: 100%;
	transition: var(--animation-slow);
	transition: all .85s cubic-bezier(.7, 0, .2, 1);
	will-change: width;
	top: 0;
	position: relative;
	overflow: hidden;

	@media (max-width: 550px){
		width: 20vw;
		${({ menuOpen }) => menuOpen && `
			width: 0vw;
		`
	}
	}

	${({ menuOpen }) => menuOpen && `
			width: 0vw;
		`
	}
`

const RoundedDiv = styled.div`
	background: var(--bg-dark);
	height: 150%;
	display: block;
	position: absolute;
	width: 775%;
	top: 50%;
	border-radius: 50%;
	transform: translate(-6.5%, -50%);
	left: 50%;
	z-index: 1;
`



const FixedMenu = (({ links }) => {
	const router = useRouter();
	const menuOpen = useSelector(state => state.menu.menuOpen);
	const dispatch = useDispatch();

	useEffect(() => {
		if (menuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [menuOpen]);

	return (
		<>
			<FixedNav menuOpen={menuOpen} onClick={(e) => e.stopPropagation()} data-menu-fixed>
				<FixedRoundedWrapper>
					<FixedRoundedBody menuOpen={menuOpen}>
						<RoundedDiv></RoundedDiv>
					</FixedRoundedBody>
				</FixedRoundedWrapper>
				<FixedNavContent>
					<Nav>
						<FixedNavHeader>
							<h5>Navigation</h5>
						</FixedNavHeader>
						<FixedList menuOpen={menuOpen}>
							{links.map((link, index) => (
								<li className='header-menu' key={index} onClick={() => dispatch(actionOpenMenu(!menuOpen))}>
									<Link href={link.href} legacyBehavior>
										<FixedLink data-text={link.title} activeLink={router.pathname === link.href ? true : false}>
											{link.title}
										</FixedLink>
									</Link>
								</li>
							)
							)}
						</FixedList>
					</Nav>
					<Social>
						<h5>Social</h5>
						<SocialList>
							<MenuSocial type="big" />
						</SocialList>
					</Social>
				</FixedNavContent>
			</FixedNav>
			<Overlay active={menuOpen} toggle={() => dispatch(actionOpenMenu())} />
		</>
	)
})

export { FixedMenu }