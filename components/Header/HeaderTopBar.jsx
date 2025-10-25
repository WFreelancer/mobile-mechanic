import styled from 'styled-components';
import { Container } from '../Container';
import { MenuSocial } from '../Menu';


const HeaderContent = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	
`;

const HeaderTopWrapper = styled.div`
	position: relative;
	padding: 10px 0;
	&:before{
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height:100%;
		background-color: #000;
		opacity: 0.4;
	}

	@media (max-width: 767px){
		padding: 15px 0;
	}
	@media (max-width: 450px){
		display: none;
	}
`;


const HeaderTopBar = () => {
	return (
		<HeaderTopWrapper>
			<Container>
				<HeaderContent>
					<MenuSocial />
				</HeaderContent>
			</Container>
		</HeaderTopWrapper>

	)
}

export { HeaderTopBar };