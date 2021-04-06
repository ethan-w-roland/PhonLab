import Generic from "./Generic"
import QuizBox from "./components/QuizBox"
import data from "./lesson_1.json"
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 20px;`

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height:100%;
  width:auto;
  max-width:90vw;
  max-height:88vh;
  aspect-ratio:0.72;`

const ChapterTitle = styled.div`
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

const MyQuizBox = styled(QuizBox)`
  width: 100%;
  height: 100%;
  flex: 1 1 auto;`

const Quiz = () => {
  return (
    <Generic>
      <Container>
      <Inner>
        <ChapterTitle>Lesson 1</ChapterTitle>
        <ChapterDetails>A demonstration of quiz mechanics</ChapterDetails>
        <MyQuizBox cards_info={data}/>
      </Inner>
      </Container>
    </Generic>
  );
}

export default Quiz;