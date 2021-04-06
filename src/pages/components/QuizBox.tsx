import {useState} from 'react';
import styled, {keyframes, css} from 'styled-components';
import QuizCard from './QuizCard'
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

const OuterContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;`

const SoundBar = styled.div`
  width: 100%;
  height: 20px;
  margin-bottom:5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;`

const Sound = styled.div`
  height: 100%;
  cursor: pointer;
  display:flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  &:hover {
    color : orange;
  }`

const Container = styled.div`
  height: 100%;
  width: 100%;
  flex: 1 1 auto;
  position: relative;`

const in_left = keyframes`
  0% { transform: translateX(15%);
       opacity: 0.6;
       z-index: 100;}
100% { transform: translateX(0);
       opacity: 1;
       z-index: 100;}`

const out_left = keyframes`
  0% { transform: translateX(0);
       opacity: 0.8;
       z-index: 1;}
100% { transform: translateX(0);
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
 "in_left":   css`animation: ${in_left} 0.2s ease both`,
 "out_left":  css`animation: ${out_left} 0.2s ease both`,
 "in_right":  css`animation: ${in_right} 0.2s ease both`,
 "out_right": css`animation: ${out_right} 0.2s ease both`
}

const Item = styled.div`
  background-color: transparent;
  height: 100%;
  width: 100%;
  position: absolute;
  ${(props) => animations[props.animation]};`

var state = {
  init: true,
  ind: 0,
  audio: null,
  anis: []
}
type QuizBoxProps = {cards_info : any, className?:any}
const QuizBox = ({cards_info, className=null}:QuizBoxProps) => {

  const num_page = cards_info.length;
  var [cur, set_cur] = useState(false)
  function render(){
    set_cur(!cur);
  };

  if (state.init) {
    for (var x = 0; x < num_page; x++) { state.anis.push('hide') }
    state.anis[0] = 'show';
    state.init = false;
    state.audio = new Audio(cards_info[0].audio);
  }

  //card finished callback
  const finished = (res) => {
    setTimeout( ()=>{
      var i = state.ind + 1;
      if (i-2 >= 0) {state.anis[i-2] = 'hide'}
      state.anis[i-1] = 'out_left';
      state.anis[i] = 'in_left';
      state.audio = new Audio(cards_info[i].audio);
      state.ind = i;
      render();
    }, 900)
  }

  //generates quiz items
  var Items = cards_info.map((info, i) => {
    var cor_ind = Math.floor(Math.random() * 4);
    var inds = [0,0,0,0]
    for (var j=0; j < 4; j++){
      if (j !== cor_ind) {
        var rand = i
        while (rand == i) {
          rand = Math.floor(Math.random() * cards_info.length);
        }
        inds[j] = rand;
      } else {
        inds[j] = i;
      }
    }
    return (
      <Item id={i} key={i} animation={state.anis[i]}>
      <QuizCard
        image={info.image}
        a={cards_info[inds[0]].vocab}
        b={cards_info[inds[1]].vocab}
        c={cards_info[inds[2]].vocab}
        d={cards_info[inds[3]].vocab}
        cor={cor_ind}
        fin={finished}/>
      </Item>
    )}
  )

  const playAudio = () => {
    state.audio.currentTime = 0;
    state.audio.play();
  }

  console.log(state)

  return (
    <div className={className}>
      <OuterContainer>
        <SoundBar>
          <Sound onClick={playAudio}>
            <VolumeUpIcon fontSize="small"/>
          </Sound>
        </SoundBar>
        <Container>
          {Items.slice(Math.max(0,state.ind-1),Math.min(num_page, state.ind+2))}
        </Container>
      </OuterContainer>
    </div>
  );
}

export default QuizBox