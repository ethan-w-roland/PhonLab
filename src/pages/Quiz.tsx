import Generic from "./Generic"
import QuizBox from "./components/QuizBox"
import data from "./book_1.json"
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

// const ChapterTitle = styled.div`
//   display: flex;
//   justify-content: left;
//   align-items: center;
//   width: 100%;
//   height: 30px;
//   font-weight: bold;
//   font-size: 20px;
//   color: #383838;`

// const ChapterDetails = styled.div`
//   box-sizing: border-box;
//   display: flex;
//   justify-content: left;
//   align-items: center;
//   width: 100%;
//   height: 20px;
//   font-size: 15px;
//   color: #545454;
//   margin-bottom:5px;`

const MyQuizBox = styled(QuizBox)`
  width: 100%;
  height: 100%;`

function filter(limit, list) {

  //error check
  if (limit===''){
    alert('error: no selections')
    return list}

  //parse restrictions
  limit = limit.slice(1);
  limit = limit.split('-');
  var keys = limit[0];
  var perfs = limit[1];
  keys = keys.split(',');

  //load cookie
  var good = null;
  var bad = null;
  try {
    var doc = JSON.parse(localStorage.data)
    good = new Set(doc.good)
    bad = new Set(doc.bad)
  } catch (err) {
    good = new Set()
    bad = new Set()
  }

  //apply restrictions
  //1st - only chapter and content category
  var temp = []
  for (var key of keys) {
    temp = temp.concat(list[key])
  }

  //2nd - only performance categories
  var output = []
  for (var card of temp) {
    if (good.has(card.id)) {
      if (perfs[0] === '1') {
        output.push(card)
      }
    } else if (bad.has(card.id)) {
      if (perfs[1] === '1') {
        output.push(card)
      }
    } else {
      if (perfs[2] === '1') {
        output.push(card)
  }}}

  //error check
  if (output.length === 0) {
    alert('error: no applicable vocab')
    return list}

  //shuffle order
  for (let i = output.length-1; i>0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [output[i],output[j]] = [output[j],output[i]];
  }
  return output;
}

const Quiz = (props:any) => {

  var query = props.location.search
  var cards_info = filter(query, data);

  return (
    <Generic>
      <Outer>
      <Container>
        <MyQuizBox location={query} cards_info={cards_info}/>
      </Container>
      </Outer>
    </Generic>
  );
}

export default Quiz;

//<ChapterTitle>Vocabulary Quiz</ChapterTitle>
//<ChapterDetails>Test your knowledge</ChapterDetails>