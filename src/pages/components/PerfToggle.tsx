import styled from 'styled-components';

const Container = styled.div`
    position: relative;
    width:100%;
    height:100%;
    background-color:${(props:any) => {
        if (props.disable) {
          return "lightgray"
        } else if (props.val) {
          return props.color_a
        } else {
          return props.color_b
        }}};
    transition: background-color 0.1s ease-in-out;
    user-select: none;
    border-radius: 60px;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
    display: flex;
    justify-content: flex-end;
    align-items:center;
    padding: 0 1px 0 1px;
    cursor: ${(props:any) => props.disable ? "default" : "pointer"};
    -webkit-tap-highlight-color: transparent;`

const Side = styled.div`
    width:50%;
    height:100%;
    display:flex;
    justify-content: center;
    font-size: 13px;
    align-items: center;
    box-sizing: border-box;`

const Left = styled(Side)`
    padding-left: 2px;`

const Right = styled(Side)`
    padding-right: 2px;`

const Nub = styled.div`
    transition: transform 0.15s ease-in-out;
    transform: ${(props) => props.val ? "translate(0px)" : "translate(calc(-100% + 2px))"};
    position: absolute;
    width:50%;
    height: calc(100% - 3px);
    border-radius: 50px;
    background-color:#f5f5f5;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
    box-sizing: border-box;
    &:hover {
        border: ${(props:any) => props.disable ? "none" : "1px solid lightgray"};
    }`

const PerfToggle = ({callback=null,
                 enable=true,
                 state=true,
                 a_color='lightpink',
                 b_color='lightblue'}:any) => {

    const handle_click = () => {if (enable) {callback();}}

    return (
        <Container disable={!enable}
                   val={state}
                   onClick={handle_click}
                   color_a = {a_color}
                   color_b = {b_color}>
            <Left/>
            <Right/>
            <Nub disable={!enable} val={state}/>
        </Container>
    );
}

export default PerfToggle