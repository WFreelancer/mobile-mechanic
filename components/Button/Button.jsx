import { forwardRef } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { mouseMoveAnim, mouseEnterAnim, mouseLeaveAnim } from './ButtonAnimation'

const CustomLinkWrapper = styled.div`
	max-width: 100%;
	width: ${({ stretch }) => stretch ? `100%` : `auto`};
`

const CustomLink = styled.div`
font-family: var(--font-lexend);
	position: relative;
	z-index: 5;
	border: 0;
	outline: 0;
	background: transparent;
	width: ${({ stretch }) => stretch ? `100%` : `auto`};
	${(props) => props.dark && `
		background-color: var(--bg-dark);
	`}
`
const LinkEl = styled.a`
font-family: var(--font-lexend);
	position: relative;
	min-width: 220px;
	height: 100%;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-radius: ${props => props.borderRadius ? props.borderRadius : `unset`};
	padding: 1.05em 0;
	cursor: pointer;
	user-select: none;
    text-decoration: none;
    will-change: transform;
    outline: 0;
    transform: translateZ(0) rotate(0.001deg);
	color: var(--white);
	overflow: hidden;
	font-family: var(--font-lexend);

	width: ${({ stretch }) => stretch ? `100%` : `auto`};

	@media (min-width: 1700px){
		font-size: 1.1rem;
	}

	

	span{
		z-index: 2;
		position: relative;
		transform: rotate(0.001deg);
		pointer-events: none;
		will-change: transform, color;
		transition: color .3s linear .1s;
	}


	${(props) => props.light && `
		background-color: transparent;
		border: 1px solid var(--white);

		:hover{
			span{
				color: var(--bg-dark);
			}
		}
	`}
	${(props) => props.dark && `
		background-color: var(--bg-dark);
		border: 1px solid #fff;
		padding-left: 30px;
		padding-right: 30px;
		padding-bottom: .95em;
	`}

	${(props) => props.blue && `
		background-color: var(--color-blue);

		:hover{
			span{
				color: var(--white);
			}
		}
	`}

`
const CustomButtonWrapper = styled(motion.button)`
font-family: var(--font-lexend);
	position: relative;
	z-index: 5;
	border: 0;
	outline: 0;
	background: transparent;
	max-width: 100%;
	width: ${({ stretch }) => stretch ? `100%` : `auto`};

	@media (max-width: 450px){
		width: 100%;
	}

	${({ circle }) => circle && `
		left: 150px;
		font-size: 18px;
		border-radius:50%;
		@media (max-width: 767px){
			left: 0px;
		};
	`}
`
const CustomButton = styled.div`
font-family: var(--font-lexend);
	position: relative;
	min-width: 220px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-radius: ${({ borderRadius }) => borderRadius ? borderRadius : `unset`};
	padding: 1.05em 0;
	cursor: pointer;
	user-select: none;
    text-decoration: none;
    will-change: transform;
    outline: 0;
    transform: translateZ(0) rotate(0.001deg);
	color: var(--white);
	overflow: hidden;
	width: ${({ stretch }) => stretch ? `100%` : `auto`};
	@media (min-width: 1700px){
		font-size: 1.1rem;
	}

	@media (max-width: 450px){
		width: 100%;
	}


	span{
		z-index: 2;
		font-family: var(--font-lexend);
		color: var(--color-dark);
		position: relative;
		transform: rotate(0.001deg);
		pointer-events: none;
		will-change: transform, color;
		transition: color .3s linear .1s;
	}

	${({ circle }) => circle && `
		min-width: unset;
		width: clamp(9em, 12vw, 11em) !important;
		height: clamp(9em, 12vw, 11em);
		border-radius: 50%;
		
		@media (min-width: 1700px){
			min-width: unset;
		}
	`}


	${({ light }) => light && `
		background-color: transparent;
		border: 1px solid var(--white);
		width: auto !important;
		:before{
			content: "";
			background-color: rgba(0, 0, 0, 0.4);
			position: absolute;
			top:0;
			right: 0;
			width: 100%;
			height: 100%;

		}

		@media (any-hover: hover){
			:hover{
				span{
					color: var(--bg-dark);
					transition-delay: .2s;
				}
			}
		}
	`}

	${({ dark }) => dark && `
		background-color: var(--bg-dark);
	`}

	${({ blue }) => blue && `
		background-color: var(--color-blue);

		@media (any-hover: hover){
			:hover{
				span{
					color: var(--white);
				}
			}
		}
	`}
`
const HoverEl = styled.div`
	position: absolute;
	width: 150%;
	height: 200%;
	border-radius: 50%;
	top: -50%;
	left: -25%;
	transform: translate3d(0,-76%,0);
    will-change: transform;
    transition: background-color ease-in-out .25s;

	${({ light }) => light && `
		background-color: var(--white);
	`}

	${({ dark }) => dark && `
		background-color: var(--color-blue);
	`}

	${({ blue }) => blue && `
		background-color: var(--color-blue-hover); 
	`}

`

// eslint-disable-next-line
const Button = forwardRef((props, ref) => {
	const { children, onClick, button, magnetic = false, href = '', blue, light, dark, variants, circle, custom, borderRadius, stretch } = props;

	return (
		<>
			{button ?
				<CustomButtonWrapper
					ref={ref}
					onClick={onClick}
					variants={variants}
					custom={custom}
					stretch={stretch}
					circle={circle}
				>
					<CustomButton
						onMouseEnter={(event) => mouseEnterAnim(event)}
						onMouseMove={(event) => mouseMoveAnim(event)}
						onMouseLeave={(event) => mouseLeaveAnim(event)}
						data-magnetic={magnetic}
						data-strength="30"
						data-strength-text="35"
						data-spead="0.3"
						dark={dark}
						light={light}
						blue={blue}
						borderRadius={borderRadius}
						stretch={stretch}
						circle={circle}
					>
						<HoverEl dark={dark} light={light} blue={blue} data-hover-fill></HoverEl>
						<div data-magnetic-child>
							<div data-magnetic-text>
								<span>{children}</span>
							</div>
						</div>
					</CustomButton>
				</CustomButtonWrapper>
				:
				<CustomLinkWrapper
					ref={ref}
					variants={variants}
					custom={custom}
					stretch={stretch}
				>
					<CustomLink href={href} legacyBehavior stretch={stretch} >
						<LinkEl
							onMouseEnter={(event) => mouseEnterAnim(event)}
							onMouseMove={(event) => mouseMoveAnim(event)}
							onMouseLeave={(event) => mouseLeaveAnim(event)}
							data-magnetic={magnetic}
							data-strength="25"
							data-strength-text="25"
							data-spead="0.3"
							dark={dark}
							light={light}
							blue={blue}
							href={href}
							borderRadius={borderRadius}
							stretch={stretch}
						>
							<HoverEl dark={dark} light={light} blue={blue} data-hover-fill></HoverEl>
							<div data-magnetic-child>
								<div data-magnetic-text>
									<span>{children}</span>
								</div>
							</div>
						</LinkEl>
					</CustomLink>
				</CustomLinkWrapper>
			}
		</>
	)
});

const MButton = motion(Button);

export { Button, MButton };