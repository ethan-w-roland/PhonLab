import styled from 'styled-components';

const Container = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 3px 0 rgba(0,0,0,0.3);`

const Desc = styled.div`
  font-family: Arial;
  font-size: 18px;
  color: #2b2b2b;
  font-weight: 700;
  margin-bottom: 60px;`

const Link = styled.div`
  cursor: pointer;
  width: 60%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 3px 0 rgba(0,0,0,0.3);
  background-color: #4257b2;
  color: #fafbff;
  border-radius: 2px;
  &:hover {
    background-color: #5272ff;
  };`

const TopLink = styled(Link)`
  margin-bottom: 20px;`

const EndQuizCard = () => {

  function redir(addr) {
    window.location.href = addr;
  }

  function refresh() {
    window.location.reload();
  }

  return (
    <Container>
      <Desc>
        Quiz Complete
      </Desc>
      <TopLink onClick={()=>{refresh()}}>
        Restart Quiz
      </TopLink>
      <Link onClick={()=>{redir('/Vocab')}}>
        New Selection
      </Link>
    </Container>
  )
}

export default EndQuizCard