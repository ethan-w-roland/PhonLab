import Generic from "./Generic";
import PerfToggle from "./components/PerfToggle";
import React from 'react';
import card_data from "./book_1.json";
import styled from 'styled-components'

//TODO
//fix 1 item quiz bug

const Dropdown = styled.select`
  text-align-last:center;
  background-color: white;
  width: 90px;
  height: 25px;
  border-radius: 8px;
  border: solid gray 1px;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);`

const LaunchButton = styled.button`
  color: black;
  width: 140px;
  height: 40px;
  background-color: ${(props:any) => props.enable ? "white": "lightgray"};
  border-radius: 8px;
  cursor: ${(props:any) => props.enable ? "pointer": "default"};
  border: solid gray 1px;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
  &:hover {
    background-color: ${(props:any) => props.enable ? "#4075c9": "lightgray"};
    color: ${(props:any) => props.enable ? "white": "black"};
  }`

//container for toggle elements
const ToggleBox = styled.div`
  width: 30px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;`

//CLASS------------------------------------------------------

class Vocab extends React.Component {

  data:any = {};
  constructor(props:any) {
    super(props);
    this.load_data();
    this.calc_stats();
    this.save_data();
  }

  set_sel = (val:string) => {
    switch(val) {
      case 'chapter':
        this.data.good_state = true;
        this.data.bad_state = true;
        this.data.untest_state = true;
        var chp:any = document.getElementById('chp');
        this.data.chapter = chp.value;
        this.calc_stats();
        break;

      case 'category':
        this.data.good_state = true;
        this.data.bad_state = true;
        this.data.untest_state = true;
        var ctg:any = document.getElementById('ctg');
        this.data.category = ctg.value;
        this.calc_stats();
        break;

      case 'good':
        this.data.good_state = !this.data.good_state;
        break;

      case 'bad':
        this.data.bad_state = !this.data.bad_state;
        break;

      case 'untest':
        this.data.untest_state = !this.data.untest_state;
        break;
    }
    this.forceUpdate();
    this.save_data();
  }

  load_data = () => {
    try {
      //load existing data
      this.data = JSON.parse(localStorage.data);
    } catch(err) {
      //set default data
      this.data = {
        good:[],
        bad:[],
        chapter:'1',
        category:'n',
        good_state:true,
        bad_state:true,
        untest_state:true
  }}}

  save_data = () => {
    localStorage.data = JSON.stringify(this.data)
  }

  //parse cookie and data to calculate stats
  calc_stats = () => {

    //clear existing
    this.data.num_good = 0;
    this.data.num_bad = 0;
    this.data.num_untest = 0;
    this.data.num_total = 0;

    //from all cards: make arr of all relevant cards
    var key = this.data.chapter + ':' + this.data.category;
    if (!(key in card_data)) { return }
    var temp = card_data[key];

    //make good-bad sets
    var good = null;
    var bad = null;
    try {
      good = new Set(this.data.good);
      bad = new Set(this.data.bad);
    } catch (err) {
      good = new Set();
      bad = new Set();
    }

    //calculate stats
    for (var card of temp) {
      this.data.num_total += 1;
      if (good.has(card.id)) {
        this.data.num_good += 1;
      } else if (bad.has(card.id)) {
        this.data.num_bad += 1;
      } else {
        this.data.num_untest += 1;
    }}
  }

  build_query = () => {
    var g = this.data.good_state ? '1':'0';
    var b = this.data.bad_state ? '1':'0';
    var u = this.data.untest_state ? '1':'0';
    var chp = this.data.chapter;
    var ctg = this.data.category;
    return chp+':'+ctg + '-' + g+b+u
  }

  //redir to /Flashcards
  load_flashcards = () => {
    if (this.button_enable()) {
      var query = this.build_query();
      window.location.href = "/Flashcards?"+query;
  }}

  //redir to /Quiz
  load_quiz = () => {
    if (this.button_enable()) {
      var query = this.build_query();
      window.location.href = "/Quiz?"+query;
  }}

  button_enable = () => {
    var num = 0;
    if (this.data.good_state) {num += this.data.num_good}
    if (this.data.bad_state) {num += this.data.num_bad}
    if (this.data.untest_state) {num += this.data.num_untest}
    return num !== 0
  }

  render() {
    return (
      <Generic>
      <p>Select Chapter</p>
      <Dropdown value={this.data.chapter} onChange={()=>this.set_sel('chapter')} id="chp">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
        <option>11</option>
        <option>12</option>
      </Dropdown>
      <p>Select Category</p>
      <Dropdown value={this.data.category} onChange={()=>this.set_sel('category')} id="ctg">
        <option value='n'>noun</option>
        <option value='v'>verb</option>
        <option value='s'>sentence</option>
      </Dropdown>
      <br/>
      Correct: {this.data.num_good}
      <ToggleBox>
      <PerfToggle enable={this.data.num_good !== 0 &&
                      this.data.num_good !== this.data.num_total}
              state={this.data.good_state}
              callback={()=>this.set_sel('good')}
              a_color ={'lightblue'}
              b_color = {'gray'}/>
      </ToggleBox>
      <br/>
      Incorrect: {this.data.num_bad}
      <ToggleBox>
      <PerfToggle enable={this.data.num_bad !== 0 &&
                      this.data.num_bad !== this.data.num_total}
              state={this.data.bad_state}
              callback={()=>this.set_sel('bad')}
              a_color ={'lightblue'}
              b_color = {'gray'}/>
      </ToggleBox>
      <br/>
      Untested: {this.data.num_untest}
      <ToggleBox>
      <PerfToggle enable={this.data.num_untest !== 0 &&
                      this.data.num_untest !== this.data.num_total}
              state={this.data.untest_state}
              callback={()=>this.set_sel('untest')}
              a_color ={'lightblue'}
              b_color = {'gray'}/>
      </ToggleBox>
      <br/>
      <LaunchButton enable={this.button_enable()} onClick={this.load_flashcards}>Launch Flashcards</LaunchButton>
      <br/>
      <LaunchButton enable={this.button_enable()} onClick={this.load_quiz}>Launch Quiz</LaunchButton>
    </Generic>
  )}
}

export default Vocab;