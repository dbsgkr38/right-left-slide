import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import SLIDES from './../SliderData';

const Slider = () => {

    // 이미지 개수 설정 : 실제 개수보다 1개 적게

    const TOTAL_SLIDES = 2;
    const delay = 3000;
    const [currentSlide, setCurrentSlide] = useState(0)
    const slideRef = useRef()
    const timeoutRef = useRef()


    const nextSlide = () => {
        if(currentSlide >= TOTAL_SLIDES) {
            setCurrentSlide(0);
        } else {
            setCurrentSlide(currentSlide + 1)
        }
    }

    const prevSlide = () => {
        if(currentSlide === 0){
            setCurrentSlide(0)
        } else {
            setCurrentSlide(currentSlide - 1)
        }
    }

    // useRef
    const resetTimeout = () => {
        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
    }

    // 렌더링 되기 이전의 코드 제작할 때 useEffect로
    useEffect (() => {
        // 자동시작
        resetTimeout();
        timeoutRef.current = setTimeout(
            () => 
            setCurrentSlide((prevIndex) => 
            prevIndex === TOTAL_SLIDES ? 0 : prevIndex + 1,
            ),
            delay,
            );
            
            // 자동 끝
            slideRef.current.style.transition = 'ease 1000ms'
            slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;

            // cleanup 함수
            return () => {
                // 리소스 잡기 때문에 항상 써준다
                resetTimeout();
            };

        }, [currentSlide]);

    return (
        <SliderWrapper>
        {/* 이미지 */}
            <ContainerWrapper ref={slideRef}>
                {SLIDES.map((slide) => (
                    <img key={slide.id} src={slide.url} alt='slide' />
                ))}
            </ContainerWrapper>

            {/* 좌우버튼 */}
            <ButtonWrapper>
                <Button onClick={nextSlide}><ArrowLeft /></Button>
                <Button onClick={prevSlide}><ArrowRight /></Button>
            </ButtonWrapper>

            {/* 닷메뉴 */}
            <DotWrapper>
                {SLIDES.map((dot) => (
                    <DotButton 
                        key={dot.id}
                        className={currentSlide === dot.id ? 'active' : ''}
                        onClick={() => {
                            setCurrentSlide(dot.id);
                        }}
                    />
                ))}                                                                          
            </DotWrapper>
        </SliderWrapper>
    );
};

const SliderWrapper = styled.section`
    width: 100%;
    overflow: hidden;
    position: relative;
    background: yellow;
`;

const ContainerWrapper = styled.div`
    width: 100%;
    display: flex;
    img{
        width: 100%;
    }
`;

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 45%;
`;

const Button = styled.button`
    all: unset;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    /* react-icons를 꾸밀 때 사용  */
    svg{
        font-size: 64px;
    }
    &:hover{
        background: skyblue;
        color: #fff;
        transition: all .3s ease-in-out;
    }
`;

// react-icon을 styled-components로 꾸밀 때

const ArrowLeft = styled(MdKeyboardArrowLeft)`
    color: #fff;
`

const ArrowRight = styled(MdKeyboardArrowRight )`
    color: #fff;
`


const DotWrapper = styled.div`
    background-color: blue;
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
`;

const DotButton = styled.span`
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ccc;
    margin: 15px 5px;
    cursor: pointer;
    &:active {
        background: red;
    }
`;



export default Slider;