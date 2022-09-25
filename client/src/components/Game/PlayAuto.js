import { Container } from '../StyleHelper'
import TimerBar from './TimerBar'
import GameContainer from './GameContainer'
//import { useState, useEffect } from 'react'
import styled from 'styled-components'

const VerticalContainer = styled(Container)`
  flex-direction: column;
  padding: 50px 0px 0px;
`

const PlayAuto = () => {
  //const [questions, setQuestions] = useState([])

  const question = {
    content: 'What is the capital of France?',
    a: 'Paris',
    b: 'Berlin',
    c: 'London',
    d: 'Tokyo',
    difficulty: 'Medium',
    category: 'Geography',
    id: 2
  }

  const handleAnswer = () => {
    console.log('Handled')
  }

  return(
    <VerticalContainer>
      <TimerBar />
      <GameContainer handleAnswer={handleAnswer} question={question} />
    </VerticalContainer>
  )
}

export default PlayAuto