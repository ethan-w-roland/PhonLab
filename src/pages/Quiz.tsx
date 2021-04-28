import Generic from "./Generic"
import QuizBox from "./components/QuizBox"
import data from "./lesson_1.json"
import styled from 'styled-components'

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: hidden;`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: min(100vh, 150vw, 100%);
  width: min(65vh, 100vw, 100%);
  max-width: 500px;
  max-height: 700px;
  padding:20px;
  padding-bottom:50px;`

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
  height: 100%;`

const Quiz = () => {
  return (
    <Generic>
      <Outer>
      <Container>
        <ChapterTitle>Lesson 1</ChapterTitle>
        <ChapterDetails>Getting Started with Korean</ChapterDetails>
        <MyQuizBox cards_info={data}/>
      </Container>
      </Outer>
    </Generic>
  );
}

export default Quiz;