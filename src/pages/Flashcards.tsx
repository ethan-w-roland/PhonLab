import Generic from "./Generic"
import Carousel from "./components/Carousel"
import data from "./lesson_1.json"
import styled from 'styled-components'
import {useState} from 'react'

//make this more generic so the Lessons page can
//pass in which lesson it is via props

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;`

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height:auto;
  max-height:100%;
  max-width: 600px;
  width:90%;
  aspect-ratio:1.0;
  margin-top:30px;`

const ChapterTitle = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  height: 30px;
  font-weight: bold;
  font-size: 20px;
  color: #383838;`

const ChapterDetails = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  height: 20px;
  font-size: 15px;
  color: #545454;
  margin-bottom:5px;`

const MyCarousel = styled(Carousel)`
  width: 100%;
  height: 100%;`

const Flashcards = () => {

  return (
    <Generic>
      <Container>
        <Inner>
          <ChapterTitle>Lesson 1</ChapterTitle>
          <ChapterDetails>A demonstration of flipcard mechanics</ChapterDetails>
          <MyCarousel cards_info={data}/>
        </Inner>
      </Container>
    </Generic>
  );
}

export default Flashcards;