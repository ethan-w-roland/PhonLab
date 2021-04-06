import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #f5f5f5;
  height: 100vh;
  overflow:hidden;`

const Header = styled.div`
  box-sizing: border-box;
  display:flex;
  flex-direction: row;
  height: 40px;
  flex-shrink:0;
  width: 100%;
  background-color: #4257b2;
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
  flex: 1 1 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;`

const Generic = (props:any) => {
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  return (
    <Container height={vh}>
      <Header>
        <Logo href="/">Sejong Korean</Logo>
      </Header>
      <Body height={String(vh-50)+"px"}>
        {props.children}
      </Body>
    </Container>
  );
}

export default Generic;