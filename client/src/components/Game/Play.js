import { Container } from '../StyleHelper'
import TimerBar from './TimerBar'
import GameContainer from './GameContainer'
import InfoBar from './InfoBar'
import questionService from '../../services/question'
import userService from '../../services/user'

import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import styled from 'styled-components'

const VerticalContainer = styled(Container)`
  flex-direction: column;
  padding: 50px 0px 0px;
`

const PlaceHolderGameContainer = styled.div`
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

const PlaceHolderInfoContainer = styled.div`
  height: 30px;
  width: 60%;
  background-color: #393E41;
  margin-bottom: 50px;
  padding 25px;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 3px solid white;
  margin-top: 100px;
`

const Play = ({ gameType, user }) => {
  const [questions, setQuestions] = useState(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [empty, setEmpty] = useState(false)
  const [active, setActive] = useState(true)

  useEffect(() => {
    const fetchQuestions = async () => {
      const retrievedQuestions = await questionService.getAllExternal()
      console.log(retrievedQuestions)
      if (gameType === 'user') {
        const userQuestions = await questionService.getAllUser()

        //Shuffles questions

        for (let i = userQuestions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [userQuestions[j], userQuestions[i]] = [userQuestions[i], userQuestions[j]]
        }

        // Supplements user questions if there isn't enough
        setQuestions(userQuestions.concat(retrievedQuestions.results))
      } else {
        setQuestions(retrievedQuestions.results)
      }
    }

    fetchQuestions()
  }, [])

  const handleAnswer = async (answer) => {
    setEmpty(true)

    if (answer === questions[questionIndex].correct_answer) {
      setCorrectAnswers(correctAnswers + 1)
    }

    // Gives breathing room between questions
    if (questionIndex === 9) {
      if (user) {
        try {
          const updatedUser = {
            ...user,
            correctAnswers: user.correctAnswers + correctAnswers,
            gamesPlayed: user.gamesPlayed + 1
          }

          await userService.update(updatedUser)
        } catch (exception) {
          console.error(exception)
        }
      }

      setTimeout(() => {
        setActive(false)
      }, 5000)
    } else {
      setTimeout(() => {
        setEmpty(false)
        setQuestionIndex(questionIndex + 1)
      }, 3000)
    }
  }

  return(
    <VerticalContainer>
      <TimerBar empty={empty}/>
      {questions ?
        <GameContainer handleAnswer={handleAnswer} question={questions[questionIndex]} /> :
        <PlaceHolderGameContainer></PlaceHolderGameContainer>}
      {questions ?
        <InfoBar question={questions[questionIndex]} number={questionIndex + 1} correct={correctAnswers} /> :
        <PlaceHolderInfoContainer></PlaceHolderInfoContainer>}
      {active === false && <Navigate to="/game" />}
    </VerticalContainer>
  )
}

export default Play