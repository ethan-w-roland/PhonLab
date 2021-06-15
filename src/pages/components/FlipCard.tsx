import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items:center;
  justify-content:center;
  background-color: transparent;
  width: 100%;
  height: 100%;
  perspective: 5000px;`

//todo - rescall inner h/w based on image dims
const Inner = styled.div`
  background-color: transparent;
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.25s ease-in-out;
  transform-style: preserve-3d;
  transform: ${(props) => props.flip ? "rotateX(180deg)" : "rotateX(0deg)"};`

const Side = styled.div`
  box-sizing: border-box;
  padding: 3%;
  width: 100%;
  height: 100%;
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;

  transition-delay: .1s;
  transition: opacity .15s ease-in-out;
  cursor: pointer;
  backface-visibility: hidden;

  box-shadow: 0 0 5px 0 rgba(0,0,0,0.3);
  border-radius: 1%;
  background-color: white;
  color: black;
  -webkit-tap-highlight-color: transparent;`

const Front = styled(Side)`
  opacity: ${(props) => props.flip ? 0:1};
  object-fit: contain;
  user-select: none;`

const Back = styled(Side)`
  opacity: ${(props) => props.flip ? 1:0};
  transform: rotateX(180deg);
  font-size: 300%;
  overflow-wrap: anywhere;`

const StyledImg = styled.img`
  object-fit: contain;
  height: 100%;
  width: 100%`

type FlipCardProps = {front:string, back:string, enabled:boolean}
const FlipCard = ({front, back, enabled}:FlipCardProps) => {

  var [flip, set_flip] = useState(false);

  useEffect(() => {
    if (enabled === false) {
      set_flip(false);
  }}, [enabled]);

  return (
    <Container>
      <Inner flip={flip} onClick={() => set_flip(!flip)}>
        <Front flip={flip}>
          <StyledImg src={front}/>
        </Front>
        <Back flip={flip}>
          {back}
        </Back>
      </Inner>
    </Container>
  )
}

export default FlipCard