import styled from 'styled-components';
import { memo } from 'react';
import { useRouter } from 'next/router';
import { HeaderTopBar } from './HeaderTopBar'
import { HeaderBottom } from './HeaderBottom'


const HeaderWrapper = styled.header`
	position: ${({ isHome }) => (isHome ? 'absolute' : 'relative')};
	top: 0;
	left: 0;
	width: 100%;
	user-select: none;
	z-index: 10000;
	background-color: ${({ isHome }) => (isHome ? 'transparent' : '#000')};
	padding-bottom: 10px;
`;

const Header = () => {
	const router = useRouter();
	const isHome = router.pathname === '/';

	return (
		<HeaderWrapper isHome={isHome}>
			<HeaderTopBar />
			<HeaderBottom />
		</HeaderWrapper>
	)
}

export default memo(Header);