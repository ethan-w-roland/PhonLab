import {useState} from 'react';
import styled, {keyframes, css} from 'styled-components';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import FlipCard from "./FlipCard";
import GenderToggle from "./GenderToggle";
import VolumeUpIcon from '@material-ui/icons/VolumeUp';


const Container = styled.div`
  width: 100%;
  height: 100%;`

const SoundBar = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-bottom:3px;`

const ToggleBox = styled.div`
  width: 40px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;`

const Sound = styled.div`
  width: 25px;
  height: 100%;
  cursor: pointer;
  display:flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
  &:hover {
    color : orange;
  }`

const Contents = styled.div`
  width: 100%;
  height: 70%;
  position: relative;`

const in_left = keyframes`
   0% { transform: translateX(1em);
        opacity: 1;
        z-index: 100;}
 100% { transform: translateX(0);
        opacity: 1;
        z-index: 100;}`

const out_left = keyframes`
   0% { transform: translateX(0);
        opacity: 1;
        z-index: 1;}
 100% { transform: translateX(-.5em);
        opacity: 0;
        z-index: 1}`

const in_right = keyframes`
   0% { transform: translateX(-1em);
        opacity: 1;
        z-index: 100;}
 100% { transform: translateX(0);
        opacity: 1;
        z-index: 100;}`

const out_right = keyframes`
   0% { transform: translateX(0);
        opacity: 1;
        z-index: 1;}
 100% { transform: translateX(.5em);
        opacity: 0;
        z-index: 1}`

const animations = {
  "show":      css`opacity: 1; z-index: 100`,
  "hide":      css`opacity: 0; z-index: 1`,
  "in_left":   css`animation: ${in_left} 0.3s ease both`,
  "out_left":  css`animation: ${out_left} 0.2s ease both`,
  "in_right":  css`animation: ${in_right} 0.3s ease both`,
  "out_right": css`animation: ${out_right} 0.2s ease both`
}

const Item = styled.div`
  background-color: transparent;
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  ${(props) => animations[props.animation]};`

const Controls = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;`

const Arrow = styled.div`
  -webkit-tap-highlight-color: transparent;
  display:flex;
  justify-content: center;
  align-items: center;
  height: 80%;
  width: 10%;
  transition: color 0.1s ease-in-out;
  color: ${ (props:any) => props.enabled ? "black" : "slategray"};
  cursor: ${ (props:any) => props.enabled ? "pointer" : "default" };
  &:hover {
    color : ${ (props:any) => props.enabled ? "orange" : "slategray"};
  }`

const Count = styled.div`
  justify-content: center;
  align-items: center;
  height: 80%;
  display: flex;
  width: 25%;
  font-family: system-ui;
  font-size: 100%;
  font-weight: 550;
  user-select: none;`

var state = {
  init: true,
  ind: 0,
  left: false,
  right: true,
  m_audio: null,
  f_audio: null,
  is_male: false,
  anis: []
}
type CarouselProps = {cards_info : any, className?:any}
const Carousel = ({cards_info, className=null}:CarouselProps) => {

  const num_page = cards_info.length;
  var [cur, set_cur] = useState(false)
  function render(){
    set_cur(!cur);
  };

  state.left = state.ind !== 0;
  state.right = state.ind !== num_page-1;

  if (state.init) {
    for (var x = 0; x < num_page; x++) { state.anis.push('hide') }
    state.anis[0] = 'show';
    state.init = false;
    state.m_audio = new Audio(cards_info[0].m_audio);
    state.f_audio = new Audio(cards_info[0].f_audio);
  }

  function update() {
    state.m_audio = new Audio(cards_info[state.ind].m_audio);
    state.f_audio = new Audio(cards_info[state.ind].f_audio);
    render();
  }

  const left_click = () => {
    if (state.ind > 0) {
      var i = state.ind - 1;
      if (i+2 <= num_page-1) {state.anis[i+2] = 'hide'}
      state.anis[i+1] = 'out_right';
      state.anis[i] = 'in_right';
      state.ind = i;
      update();
  }}

  const right_click = () => {
    if (state.ind < num_page-1) {
      var i = state.ind + 1;
      if (i-2 >= 0) {state.anis[i-2] = 'hide'}
      state.anis[i-1] = 'out_left';
      state.anis[i] = 'in_left';
      state.ind = i;
      update();
  }}

  const play_audio = () => {
    if (state.is_male) {
      state.m_audio.currentTime = 0;
      state.m_audio.play();
    } else {
      state.f_audio.currentTime = 0;
      state.f_audio.play();
    }
  }

  const flip_gender = () => {
    state.is_male = !(state.is_male);
  }

  //generate carousel items
  var Items = []
  for (var i=state.ind-1; i<state.ind+2; i++) {
    if (i >= 0 && i <= num_page-1) {
      Items.push(
        <Item id={i} key={i} animation={state.anis[i]}>
        <FlipCard front={cards_info[i].image} back={cards_info[i].vocab} enabled={i===state.ind}/>
        </Item>
  )}}

  return (
    <Container className={className}>
      <SoundBar>
        <ToggleBox>
          <GenderToggle callback={flip_gender}/>
        </ToggleBox>
        <Sound onClick={play_audio}>
          <VolumeUpIcon fontSize="small"/>
        </Sound>
      </SoundBar>
      <Contents>
        {Items}
      </Contents>
      <Controls>
        <Arrow enabled={state.left} onClick={left_click}>
          <ArrowBackIcon fontSize="small"/>
        </Arrow>
        <Count>
        {state.ind+1} / {num_page}
        </Count>
        <Arrow enabled={state.right} onClick={right_click}>
          <ArrowForwardIcon fontSize="small"/>
        </Arrow>
      </Controls>
    </Container>
  );
}

export default Carousel