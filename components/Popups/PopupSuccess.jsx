import styled from 'styled-components';
import { Overlay } from '../Overlay';
import { Button } from '../Button';
import { IoCloseSharp } from "react-icons/io5";
import Confetti from 'react-confetti';
import { useSelector, useDispatch } from 'react-redux';
import { openPopupSuccess } from '../../store/popup/actions-popup';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { motion } from 'framer-motion';
import { useEffect } from 'react';
const Popup = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	opacity: 0;
	visibility: hidden;
	overflow-y: auto;
	overflow-x: hidden;
	transition: var(--transition-md);
	pointer-events: none;
	z-index: 100000;

	::-webkit-scrollbar {
		display: none;
	}
	-scrollbar {
		display: none;
	}

	${({ openPopup }) => openPopup && `
			pointer-events: all;
			opacity: 1;
			visibility: visible;
		`
	}
`

const PopupBody = styled.div`
	min-height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 30px 20px;
	transition: var(--transition-md);
	position: relative;
	z-index: 11;

`

const PopupContent = styled.div`
overflow:hidden;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: var(--white);
	color: var(--bg-dark);
	max-width: 600px;
	border-radius: 20px;
	width: 100%;
	padding: 30px;
	position: relative;
	transition: var(--transition-md);
	transform: scale(0.8);
	background-image: linear-gradient(to bottom right, #7c3aed, #4f46e5);


	${({ openPopup }) => openPopup && `
			transform: scale(1);
		`
	}
`
const DecorIcon = styled(motion(IoCheckmarkCircleOutline))`
position: absolute;
top: -70px;
left: -70px;
cursor: pointer;
width: 240px;
height: 240px;
opacity: 0.1;
transform: rotate(25deg);
`;

const PopupClose = styled.div`
	position: absolute;
	top: 10px;
	right: 10px;
	cursor: pointer;
	width: 40px;
	height: 40px;

	@media (min-width: 1800px){
		width: 60px;
		height: 60px;
	}
`
const PopupTitle = styled.h4`
	text-transform: uppercase;
	text-align:center;
	font-size: 1.7rem;
	line-height: 2.2rem;
	font-family: var(--font-oswald);
	margin-bottom: 10px;
	font-weight: 700;
	color: #fff;

	@media (min-width: 1800px){
		font-size: 3rem;
		margin-bottom: 20px;
	}
`

const PopupText = styled.p`
	font-family: var(--font-oswald);
	font-size: 1.4rem;
	margin-bottom: 20px;
	color: #fff;
	text-align: center;
	@media (min-width: 1800px){
		font-size: 1.5rem;
		margin-bottom: 30px;
	}
`



const PopupSuccess = () => {
	const messageSuccess = useSelector(state => state.popup.messageSuccess);
	const dispatch = useDispatch();

	useEffect(() => {
		if (messageSuccess) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [messageSuccess]);

	return (
		<Popup openPopup={messageSuccess} onClick={() => dispatch(openPopupSuccess(!messageSuccess))}>
			<PopupBody>
				<PopupContent openPopup={messageSuccess} onClick={(e) => e.stopPropagation()}>
					<PopupClose onClick={() => dispatch(openPopupSuccess(!messageSuccess))}>
						<IoCloseSharp size="100%" color="#fff" />
					</PopupClose>
					<DecorIcon size="80px" color="#fff" />

					<IoIosCheckmarkCircle size="80px" color="#fff" style={{ marginBottom: '15px' }} />

					<PopupTitle>Request Submitted Successfully!</PopupTitle>
					<PopupText>We will contact you soon to discuss your vehicle's service requirements.</PopupText>
					<div onClick={() => dispatch(openPopupSuccess(!messageSuccess))}>
						<Button magnetic button light>
							Understood!
						</Button>
					</div>
				</PopupContent>
			</PopupBody>
			<Overlay active={messageSuccess} />
			{messageSuccess && <Confetti />}
		</Popup>
	)
}

export { PopupSuccess };