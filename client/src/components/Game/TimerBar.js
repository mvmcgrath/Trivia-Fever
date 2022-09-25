import styled, { keyframes } from 'styled-components'

const Container = styled.div`
  height: 30px;
  width: 60%;
  background-color: #393E41;
  margin-bottom: 50px;
  padding 25px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid white;
`

const Timer = styled.div`
  background-color: #4b5054;
  width: 90%;
  height: 35px;
  border-radius: 10px;
`

const deplete = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
`

const Fill = styled.div`
  background-color: #EC4E20;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  animation: ${deplete} 20s linear;
  animation-fill-mode: forwards;
`

const TimerBar = () => {
  return (
    <Container>
      <Timer>
        <Fill></Fill>
      </Timer>
    </Container>
  )
}

export default TimerBar