import {useState} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;`

const Image = styled.img`
  height: 50%;
  width: 100%;
  max-width:100%;
  min-width:50%;
  aspect-ratio:0.67;
  background-color:white;
  box-shadow: 0 0 3px 0 rgba(0,0,0,0.3);
  border-radius: 2px;
  box-sizing: border-box;
  padding: 20px;
  object-fit: contain;`

const Options = styled.div`
  height: 50%;
  width: 100%;
  padding-top: 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;`

const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20%;
  font-size: 120%;
  overflow-wrap: anywhere;
  background-color:${(props:any) => {
    if (props.enabled) {
      return "white"
    } else if (props.correct) {
      return "#57ff97"
    } else if (props.wrong) {
      return "#ff7a75"
    } else {
      return "#d1d1d1"
    }}};
  box-shadow: 0 0 3px 0 rgba(0,0,0,0.3);
  border-radius: 2px;
  box-sizing: border-box;
  cursor: ${(props:any) => props.enabled ? "pointer" : "default" };
  ${(props:any) => props.enabled ? "&:hover {background-color: #e8faff" : ""}`

type QuizCardProps = {image:string, a:string, b:string, c:string, d:string, cor:number, fin:Function}
const QuizCard = ({image, a, b, c, d, cor, fin}:QuizCardProps) => {

  var [sel, set_sel] = useState(-1);

  function select(n:number) {
    if (sel<0) {
      set_sel(n);
      fin(n===cor) //callback to parent to activate next card
    }
  }

  return (
    <Container>
      <Image src={image}/>
      <Options>
        <Option enabled={sel<0} correct={cor===0} wrong={sel===0&&cor!==0} onClick={() => select(0)}>{a}</Option>
        <Option enabled={sel<0} correct={cor===1} wrong={sel===1&&cor!==1} onClick={() => select(1)}>{b}</Option>
        <Option enabled={sel<0} correct={cor===2} wrong={sel===2&&cor!==2} onClick={() => select(2)}>{c}</Option>
        <Option enabled={sel<0} correct={cor===3} wrong={sel===3&&cor!==3} onClick={() => select(3)}>{d}</Option>
      </Options>
    </Container>
  )
}

export default QuizCard