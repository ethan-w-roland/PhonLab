import styled from 'styled-components'

const Container = styled.div`
  height: 100%;  
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #f5f5f5;`

const Header = styled.div`
  height: 40px;
  width: 100%;
  flex-shrink:0;
  background-color: #4257b2;
  box-sizing: border-box;
  display:flex;
  flex-direction: row;
  align-items:center;
  justify-content: left;`

const Logo = styled.a`
  margin-left:10px;
  text-decoration: none;
  color: #fafbff;
  font-weight: bold;
  font-size: 15px;`

const Body = styled.div`
  height: 100%;
  flex-shrink:1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;`

const Generic = (props:any) => {
  return (
    <Container>
      <Header>
        <Logo href="/">GT Korean</Logo>
      </Header>
      <Body>
        {props.children}
      </Body>
    </Container>
  );
}

export default Generic;