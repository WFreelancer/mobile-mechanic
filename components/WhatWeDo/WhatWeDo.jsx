import { useRef, useState, memo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { PreloaderIcon } from '../Preloader';
import { Container } from '../Container';
import { MButton } from '../Button';
import { Parallax } from '../../hooks/Parallax';
import { HeightEl } from '../../hooks/HeightEl';
import { useSelector, useDispatch } from "react-redux";
import { writeMoviesFiltered, changeCountLoadMore } from '../../store/movies/actions-movies';
import { getMovie } from '../../config';
import { animationCard } from '../../helpers/Animations';
import { Title } from '../Title';



const CardsWrapper = styled.section`
padding-top: 10vh;
background-color: var(--bg-dark);
`
const CardsContent = styled.div`
	text-align:center;
	padding-bottom: 10vh;
`
const SwitcherColSubtitle = styled.div`
    animation-delay: 0.1s;
    text-shadow: 1px 1px 1px rgba(17, 17, 17, 0.5);
    opacity: 1;
    max-height: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: all 0.15s ease;
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 2px;
    font-weight: 400;
    line-height: 1.4;
`

const SwitcherColTitle = styled.div`
    font-family: var(--font-oswald);
    line-height:2.5rem;
    animation-delay: 0.2s;
    text-transform: uppercase;
    font-size: 1.875rem;
    margin-bottom: 5px;
    letter-spacing: 1px;
    transition: all 0.15s ease;
    text-shadow: 1px 1px 1px rgba(17, 17, 17, 0.5);

    @media (max-width: 1200px){
      font-size: 1.5rem;
      line-height:2rem;
    }
`

const SwitcherColCloak = styled.div`
    animation-delay: 0.2s;
    margin-bottom: 5px;
    letter-spacing: 1px;
    transition: all 0.15s ease;
    text-shadow: 1px 1px 1px rgba(17, 17, 17, 0.5);
    display: flex;
    flex-direction: column;

    @media (min-width: 1200px) {
        overflow: hidden;
        height: 0;
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
`
const SwitcherColText = styled.div`
    font-family: var(--font-oswald);
    line-height:1.8rem;
    animation-delay: 0.3s;
    font-size:1.4rem;
    margin-bottom: 30px;
    text-shadow: 1px 1px 1px rgba(17, 17, 17, 0.5);
    li{
      font-size:1.2rem;
      
    }
    @media (max-width: 1200px){
      font-size: 1.2rem;
      line-height:1.5rem;
      li{
        font-size:1.1rem;
      }
    }
`
const Btn = styled.a`
    font-family: var(--font-oswald);
    line-height:1.5rem;
    animation-delay: 0.5s;
    font-size:1.2rem;
    position: relative;
    min-width: 220px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: max-content;
    margin: 0 auto;
    background-color: var(--white);
    padding: 10px 20px;
    overflow: hidden;
    text-shadow: none;
    span{
      z-index: 2;
      color: var(--bg-dark);
      position: relative;
      transform: rotate(0.001deg);
      pointer-events: none;
      will-change: transform, color;
      transition: color .3s linear .1s;
    }
    :before{
      content: '';
      position: absolute;
      width: 150%;
      height: 200%;
      background-color: var(--color-blue);
      border-radius: 50%;
      top: 200%;
      left: -25%;
      will-change: transform;
      transition: all ease-in-out .3s;

    }

		@media (any-hover: hover){
			:hover{
				span{
					color: var(--white);
				}
        :before{
          top: 0;
          transform: translate3d(0,-26%,0);
        }
			}
		}
    
    @media (max-width: 400px){
      min-width: 150px;
    };
`

const SwitcherCol = styled.div`
  position: relative;
  &:before{
    content: "";
    display: block;
    padding-top: 120%;
  }
  @media (min-width: 1200px) {
    &:hover ${SwitcherColSubtitle} {
      max-height: 0;
    }
    &:hover ${SwitcherColCloak} {
      height: 280px;
    }
    &:hover ${SwitcherColCloak} > * {
        opacity: 0;
        animation-name: fadeInUpGrow;
        animation-duration: 0.25s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
    }
  }
  @media (max-width: 450px){
		min-height:450px;
	}
`

const SwitcherColBg = styled.div`
width: 100%;
position: absolute;
right: 0;
top: 0;
height: 100%;
z-index: 1;
background-color: transparent;
overflow: hidden;
background-size: 100%;
background-position: left center;
background-repeat: no-repeat;
margin: auto;
transition: all 0.4s ease;
display: flex;
flex-direction: column;
&:before{
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #000;
  opacity: 0.5;
  transition: all 0.3s ease;
  top: 0;
  left: 0;
  z-index: 2
}
`

const SwitcherColBgChange = styled.div`
    content: "";
    width: 100%;
    position: absolute;
    height: 100%;
    -webkit-transform: translateX(-105%);
    -ms-transform: translateX(-105%);
    transform: translateX(-105%);
    background-color: #333107;
    background-size: cover;
    transition: all 0.3s ease;
    
`
const SwitcherColContent = styled.div`
position: relative;
z-index: 2;
color: #fff;
height: 100%;
padding: 10px 20px;
width: calc(100% - 8px);
display: flex;
flex-direction: column;
justify-content: center;
text-align: center;
@media (max-width: 450px){
  padding: 10px;
}
`
const CardsBody = styled(motion.div)`
	position: relative;
	grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
	grid-gap: 10px;
	display: grid;
	margin-bottom: 70px;

	@media (max-width: 1024px){
		margin-bottom: 50px;
	}
  @media (min-width: 1200px) {
    &:hover ${SwitcherColBgChange} {
      transform: translateX(0);
    }
    &:hover ${SwitcherColBg}{
        background-size: 90%;
    }
  }
  @media (max-width: 450px){
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
	}
  ${SwitcherCol}:nth-child(1) ${SwitcherColBgChange}, 
  ${SwitcherCol}:nth-child(4) ${SwitcherColBgChange} {
    background-position: left center;
  }

  ${SwitcherCol}:nth-child(2) ${SwitcherColBgChange}, 
  ${SwitcherCol}:nth-child(5) ${SwitcherColBgChange} {
    background-position: 50% center;
  }

  ${SwitcherCol}:nth-child(3) ${SwitcherColBgChange}, 
  ${SwitcherCol}:nth-child(6) ${SwitcherColBgChange} {
    background-position: right center;
  }
`


const cards = [
  {
    poster_path: 'main-card-1.avif', data: 'Monday - Friday', time: '8am - 5pm', poster_change: 'card-change-1.jpeg', title: 'A mobile auto mechanic who comes to you!', description: [
      'Comprehensive diagnostics to identify issues.',
      'On-site repairs—no need to tow your car.',
      'High-quality parts for reliable performance.'
    ], id: '1', path: 'comes-to-you'
  },
  { poster_path: 'main-card-2.avif', data: 'Monday - Friday', time: '8am - 5pm', poster_change: 'card-change-2.avif', title: 'Repair Services at Our Auto Shop', description: 'At our auto shop, we provide professional repair and maintenance services to keep your vehicle in top condition.', id: '2', path: 'repair-services' },
  { poster_path: 'main-card-3.avif', data: 'Monday - Friday', time: '8am - 5pm', poster_change: 'card-change-3.jpg', title: 'Advanced Engine & Transmission Repairs', description: 'We specialize in complex engine and transmission repairs to ensure your vehicle runs smoothly and efficiently.', id: '3', path: 'engine-and-transmission' },

]

const WhatWeDo = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const ref = useRef(null);
  const round = useRef(null);
  const payload = { cards, loading };
  const x = Parallax(ref, payload);
  const height = HeightEl(round, payload);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredCardIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredCardIndex(null);
  };



  return (
    <CardsWrapper>
      <Container>
        <Title marginBottom="9vh" light>What We Do</Title>
        <CardsContent>
          <CardsBody>
            {cards.map((card, index) => {
              return <SwitcherCol
                key={card.id}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <SwitcherColBg
                  style={{ backgroundImage: `url(${card.poster_path})` }}
                >
                  <SwitcherColBgChange
                    style={{
                      backgroundImage: `url(${hoveredCardIndex !== null ? cards[hoveredCardIndex].poster_change : card.poster_change})`
                    }}
                  ></SwitcherColBgChange>

                  <SwitcherColContent>
                    <SwitcherColSubtitle>
                      {card.data}<br />
                      {card.time}
                    </SwitcherColSubtitle>
                    <SwitcherColTitle>{card.title}</SwitcherColTitle>

                    <SwitcherColCloak>
                      <SwitcherColText>
                        {Array.isArray(card.description) && card.description.length > 0 ? (
                          <ul>
                            {card.description.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        ) : card.description
                        }
                      </SwitcherColText>

                      <MButton href={`${card.path}`} rel="noopener noreferrer" borderRadius="25px" dark magnetic>
                        <span>More Information</span>
                      </MButton>
                    </SwitcherColCloak>
                  </SwitcherColContent>
                </SwitcherColBg>
              </SwitcherCol>
            })}
          </CardsBody>
        </CardsContent>
      </Container>
    </CardsWrapper>
  )
}

export default memo(WhatWeDo);

