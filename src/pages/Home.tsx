import Generic from './Generic';
import styled from 'styled-components';

var Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;`

var Segment = styled.div`
  height: 250px;
  width: 200px;
  display:flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-left: min(80px, 10%);
  padding-right: min(80px, 10%)`

var Title = styled.div`
  height: 50px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial;
  font-weight: 100;
  font-size: 21px;
  color: #2b2b2b;`

var Icon = styled.img`
  box-sizing: border-box;
  height: 200px;
  width: 200px;
  padding: 20px;
  border: 3px solid #4257b2;
  border-radius: 10px;
  background-color: white;
  box-shadow: 1px 1px 3px 1px rgba(0,0,0,0.5);
  cursor: pointer;
  &:hover {
    border: 3px solid #e38100;
  }`

const Home = () => {
  const redir = (addr) => {
    window.location.href = addr;
  }
  return (
    <Generic>
      <Container>
        <Segment>
          <Icon alt={"Pronunciation Icon"} onClick={()=>{redir('/Phonology')}} style={{padding:"28px"}} src='phon_icon.svg'></Icon>
          <Title>Pronunciation</Title>
        </Segment>
        <Segment>
          <Icon alt={"Vocabulary Icon"} onClick={()=>{redir('/Vocab')}} style={{padding:"15px"}} src='book_icon.svg'></Icon>
          <Title>Vocabulary</Title>
        </Segment>
      </Container>
    </Generic>
  );
}

export default Home;

//<a href="/Phonology">Phonology Demo</a>
//<a href="/Vocab">Vocab Demo</a>