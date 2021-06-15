import Generic from "./Generic"
import Carousel from "./components/Carousel"
import styled from 'styled-components'
import data from "./book_1.json"

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

const Flashcards = (props:any) => {

  var query = props.location.search
  var cards_info = filter(query, data); 

  return (
    <Generic>
      <Outer>
      <Container>
        <ChapterTitle>Vocabulary Flashcards</ChapterTitle>
        <ChapterDetails>Review Korean vocabulary</ChapterDetails>
        <MyCarousel cards_info={cards_info}/>
      </Container>
      </Outer>
    </Generic>
  );
}

export default Flashcards;