import styled from 'styled-components'
import AnswerButton from './AnswerButton'
import { useEffect, useState } from 'react'
import he from 'he'

const Container = styled.div`
  padding: 50px;
  background-color: #393E41;
  border-radius: 10px;
  height: 400px;
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
  text-align: center;
`

const GameContainer = ( { handleAnswer, question }) => {
  const [answerAStatus, setAnswerAStatus] = useState('')
  const [answerBStatus, setAnswerBStatus] = useState('')
  const [answerCStatus, setAnswerCStatus] = useState('')
  const [answerDStatus, setAnswerDStatus] = useState('')
  const [answerA, setAnswerA] = useState('')
  const [answerB, setAnswerB] = useState('')
  const [answerC, setAnswerC] = useState('')
  const [answerD, setAnswerD] = useState('')
  const [correct, setCorrect] = useState('')
  const [lock, setLock] = useState(false)

  let timeoutID

  const answerDict = {
    0: setAnswerA,
    1: setAnswerB,
    2: setAnswerC,
    3: setAnswerD
  }

  const statusDict = {
    a: setAnswerAStatus,
    b: setAnswerBStatus,
    c: setAnswerCStatus,
    d: setAnswerDStatus
  }

  const letterDict = {
    0: 'a',
    1: 'b',
    2: 'c',
    3: 'd',
  }

  // Resets colors and lock once there is a new question
  useEffect(() => {
    setAnswerAStatus('')
    setAnswerBStatus('')
    setAnswerCStatus('')
    setAnswerDStatus('')
    setAnswerA('')
    setAnswerB('')
    setAnswerC('')
    setAnswerD('')
    setLock(false)
    const index = Math.floor(Math.random() * 4)
    const newArray = question.incorrect_answers.slice(0)

    newArray.splice(index, 0, question.correct_answer)
    setCorrect(letterDict[index])
    newArray.forEach((ans, i) => answerDict[i](ans))
  }, [question])

  const noAnswerSelected = () => {
    setLock(true)
    statusDict[correct]('Correct')
    handleAnswer('e')
  }

  if (correct in statusDict) {
    timeoutID = setTimeout(() => {
      if (lock !== true) {
        noAnswerSelected()
      }
    }, 20000)
  }

  const handleClick = (letter) => {
    if (lock) {
      return
    }

    clearTimeout(timeoutID)

    statusDict[correct]('Correct')
    setLock(true)

    if (letter !== correct) {
      statusDict[letter]('Wrong')
      handleAnswer('')
    } else {
      handleAnswer(question.correct_answer)
    }
  }

  return(
    <Container>
      <Header>{he.decode(question.question)}</Header>
      <AnswerBox>
        <AnswerContainer>
          <AnswerButton handleAnswer={handleClick} answer={he.decode(answerA)} letter='a' status={answerAStatus} />
          <AnswerButton handleAnswer={handleClick} answer={he.decode(answerB)} letter='b' status={answerBStatus} />
        </AnswerContainer>
        <AnswerContainer>
          <AnswerButton handleAnswer={handleClick} answer={he.decode(answerC)} letter='c' status={answerCStatus} />
          <AnswerButton handleAnswer={handleClick} answer={he.decode(answerD)} letter='d' status={answerDStatus} />
        </AnswerContainer>
      </AnswerBox>
    </Container>
  )
}

export default GameContainer