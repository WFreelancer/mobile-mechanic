import styled from 'styled-components';
import { motion } from 'framer-motion';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const Wrapper = styled.div`
	min-height: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	background-color: var(--bg-dark);
`
const Main = styled(motion.main)`
	flex: 1 1 auto;
	display: flex;
	flex-direction: column;
`

const Layout = ({ children }) => {
	return (
		<>
			<Wrapper>
				<Header />
				<Main
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					viewport={{ once: true }}
				>
					{children}
				</Main>
				<Footer />
			</Wrapper>
		</>
	)
}

export const withLayout = (Component) => {
	return function withLayoutComponent(props) {
		return (
			<Layout>
				<Component {...props} />
			</Layout>
		)
	}
}