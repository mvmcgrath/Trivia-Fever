import styled from 'styled-components'
import AnswerButton from './AnswerButton'

const Container = styled.div`
  padding: 50px;
  background-color: #393E41;
  border-radius: 10px;
  height: 300px;
  width: 800px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  border: 3px solid white;
`

const AnswerBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 10px;
  height: 70%;
  margin-top: 20px;
  width: 90%;
`

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

const Header = styled.h1`
  background-color: #4b5054;
  padding: 25px;
  border-radius: 10px;
  border: 3px solid white;
`

const GameContainer = ( { handleAnswer, question }) => {
  return(
    <Container>
      <Header>{question.content}</Header>
      <AnswerBox>
        <AnswerContainer>
          <AnswerButton handleAnswer={handleAnswer} answer={question.a} letter='a'/>
          <AnswerButton handleAnswer={handleAnswer} answer={question.b} letter='b'/>
        </AnswerContainer>
        <AnswerContainer>
          <AnswerButton handleAnswer={handleAnswer} answer={question.c} letter='c'/>
          <AnswerButton handleAnswer={handleAnswer} answer={question.d} letter='d'/>
        </AnswerContainer>
      </AnswerBox>
    </Container>
  )
}

export default GameContainer