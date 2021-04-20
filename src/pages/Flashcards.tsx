import Generic from "./Generic"
import Carousel from "./components/Carousel"
import data from "./lesson_1.json"
import styled from 'styled-components'
import {useState} from 'react'

//make this more generic so the Lessons page can
//pass in which lesson it is via props

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: min(100vh, 100vw, 100%);
  width: min(90vh, 105vw, 100%);
  max-width: 600px;
  max-height: 570px;
  padding:20px;`

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
  justify-content: left;
  align-items: center;
  width: 100%;
  height: 20px;
  font-size: 15px;
  color: #545454;
  padding-bottom:5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;`

const MyCarousel = styled(Carousel)`
  width:100%;
  height: 100%;`

const Flashcards = () => {

  return (
    <Generic>
      <Outer>
      <Container>
        <ChapterTitle>Lesson 1</ChapterTitle>
        <ChapterDetails>A demonstration of flipcard mechanics</ChapterDetails>
        <MyCarousel cards_info={data}/>
      </Container>
      </Outer>
    </Generic>
  );
}

export default Flashcards;