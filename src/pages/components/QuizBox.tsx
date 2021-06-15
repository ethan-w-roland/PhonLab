import React from 'react';
import styled, {keyframes, css} from 'styled-components';
import QuizCard from './QuizCard';
import EndQuizCard from './EndQuizCard';
import GenderToggle from "./GenderToggle";
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import all_cards from "./../book_1.json"

const OuterContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;`

const ScoreBar = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;`

const ScoreSegment = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-family: Arial;
  font-size: 18px;
  color: #2b2b2b;`

const ScoreLabel = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 5px;
  font-weight: 700;`

const ScoreValue = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 5px;
  font-weight: 500;`

const SoundBar = styled.div`
  width: 100%;
  height: 40px;
  margin-bottom:3px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;`

const ToggleBox = styled.div`
  width: 40px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;`

const Sound = styled.div`
  height: 100%;
  width: 25px;
  cursor: ${(props:any) => props.enable ? "pointer": "default"};
  display:flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
  color: ${(props:any) => props.enable ? "black": "gray"};
  &:hover {
    color: ${(props:any) => props.enable ? "orange": "gray"};
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

const animations = {
 "show":      css`opacity: 1; z-index: 100`,
 "hide":      css`opacity: 0; z-index: 1`,
 "in_left":   css`animation: ${in_left} 0.2s ease both`,
 "out_left":  css`animation: ${out_left} 0.2s ease both`
}

const Item = styled.div`
  background-color: transparent;
  height: 100%;
  width: 100%;
  position: absolute;
  ${(props) => animations[props.animation]};`

type QuizProps = {
  cards_info:any,
  className:string
}
type QuizState = {}
class QuizBox extends React.Component<QuizProps, QuizState> {

  //atributes
  cards = {good:new Set(), bad: new Set()}
  stats = {good:0, bad:0, untest:0}
  num_page = 0
  ind = 0
  m_audio = null
  f_audio = null
  is_male = false
  all_poss_cards = []

  //initialisation
  constructor(props:any) {

    //setup
    super(props);
    this.num_page = props.cards_info.length;

    //load all possible cards
    for (var key in all_cards) {
      this.all_poss_cards = this.all_poss_cards.concat(all_cards[key])
    }

    //load localStorage & init "cards"
    try {
      var temp = JSON.parse(localStorage.data);
      this.cards.good = new Set(temp.good)
      this.cards.bad = new Set(temp.bad)
    } catch (err) {
      //pass
    }
    this.calc_stats();

    //load first audios
    this.m_audio = new Audio(props.cards_info[0].m_audio);
    this.f_audio = new Audio(props.cards_info[0].f_audio);
  }

  //calculate agregate statistics
  calc_stats = () => {
    this.stats = {good:0, bad:0, untest:0};
    for (var el of this.props.cards_info) {
      if (this.cards.good.has(el.id)) {
        this.stats.good += 1;
      } else if (this.cards.bad.has(el.id)) {
        this.stats.bad += 1;
      } else {
        this.stats.untest += 1;
  }}}

  //save updated local storage
  save_cards = () => {
    var temp:any = {}
    try {
      temp = JSON.parse(localStorage.data);
    } catch(err) {/*pass*/}
    temp.good = Array.from(this.cards.good);
    temp.bad = Array.from(this.cards.bad);
    localStorage.data = JSON.stringify(temp);}

  //play audio file on click
  play_audio = () => {
    if (this.ind !== this.num_page) {
      if (this.is_male) {
        this.m_audio.currentTime = 0;
        this.m_audio.play();
      } else {
        this.f_audio.currentTime = 0;
        this.f_audio.play();
  }}}

  //change audio gender
  flip_gender = () => {
    this.is_male = !(this.is_male);}

  //quiz card callback
  finished = (id:string, res:boolean) => {
    setTimeout( ()=>{

      //manage cards
      if (res === true) {
        this.cards.bad.delete(id)
        this.cards.good.add(id)
      } else {
        this.cards.good.delete(id)
        this.cards.bad.add(id)
      }
      this.calc_stats()
      this.save_cards()

      //manage audio
      this.ind += 1;
      if (this.ind !== this.num_page) {
        this.m_audio = new Audio(this.props.cards_info[this.ind].m_audio);
        this.f_audio = new Audio(this.props.cards_info[this.ind].f_audio);
      }

      //render
      this.forceUpdate();
    }, 900)
  }

  make_cards() {

    var info = this.props.cards_info;
    var items = [];
    //create item object(s) & add to list
    for (var i=this.ind-1; i<=this.ind+1; i++) {

      //caclulate correct animation based on ind
      var ani = 'hide'
      if (i === this.ind-1) {
        ani = 'out_left'
      } else if (i === this.ind) {
        if (this.ind === 0) {
          ani = 'show'
        } else {
          ani = 'in_left'
        }
      } else {
        ani = 'hide'
      }

      //handle final card
      if (i === this.num_page) {
        items.push(
          <Item id={i} key={i} animation={ani}>
          <EndQuizCard/>
          </Item>
      )}

      //handle normal cards
      else if (i >= 0 && i < this.num_page) {

        //generate random options
        var cor_ind = Math.floor(Math.random() * 4);
        var vocabs = ['','','','']
        vocabs[cor_ind] = info[i].vocab

        for (var j=0; j < 4; j++){
          if (j !== cor_ind) {
            var rand_voc = null
            while (rand_voc === null || rand_voc === info[i].vocab) {
              var rand_ind = Math.floor(Math.random() * this.all_poss_cards.length);
              rand_voc = this.all_poss_cards[rand_ind].vocab;
            }
            vocabs[j] = rand_voc;
        }}

        //push item to list
        items.push(
          <Item id={i} key={i} animation={ani}>
          <QuizCard
            good={this.cards.good.has(info[i].id)}
            bad={this.cards.bad.has(info[i].id)}
            id={info[i].id}
            image={info[i].image}
            a={vocabs[0]}
            b={vocabs[1]}
            c={vocabs[2]}
            d={vocabs[3]}
            cor={cor_ind}
            fin={this.finished}/>
          </Item>
    )}}

    //return list of items
    return (
      <Container>
      {items}
      </Container>
    );
  }

  render() {
    return (

      <div className={this.props.className}>
      <OuterContainer>
        <ScoreBar>
          <ScoreSegment>
            <ScoreLabel>
              Correct:
            </ScoreLabel>
            <ScoreValue>
              {this.stats.good}/{this.num_page}
            </ScoreValue>
          </ScoreSegment>
          <ScoreSegment>
            <ScoreLabel>
              Incorrect:
            </ScoreLabel>
            <ScoreValue>
              {this.stats.bad}/{this.num_page}
            </ScoreValue>
          </ScoreSegment>
        </ScoreBar>
        <SoundBar>
          <ToggleBox>
            <GenderToggle callback={this.flip_gender}/>
          </ToggleBox>
          <Sound onClick={this.play_audio} enable={this.ind !== this.num_page}>
            <VolumeUpIcon fontSize="small"/>
          </Sound>
        </SoundBar>
        {this.make_cards()}
      </OuterContainer>
    </div>
)}}

export default QuizBox;