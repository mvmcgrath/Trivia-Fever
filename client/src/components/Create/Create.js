import styled from 'styled-components'
import { useState, useEffect } from 'react'
//import questionService from '../../services/question'
import ListContainer from './ListContainer'
import EditContainer from './EditContainer'
import Message from './Message'

const Container = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`

const Create = () => {
  const [questions, setQuestions] = useState([])
  const [editQuestion, setEditQuestion] = useState({ id: -1 })
  const [message, setMessage] = useState('')

  useEffect(() => {
    //const returnedQuestions = await questionService.getAll()

    const returnedQuestions = [
      {
        question: 'What is the capital of France?',
        correct_answer: 'Paris',
        incorrect_answers: [
          'Tokyo',
          'Berlin',
          'London'
        ],
        difficulty: 'medium',
        category: 'Geography',
        id: 2
      },
    ]

    setQuestions(returnedQuestions)
  }, [])

  const loadQuestion = (question) => {
    setEditQuestion(question)
  }

  const deleteQuestion = (question) => {
    console.log('Delete!')
    console.log(question)
  }

  const addQuestion = (question, newQuestion) => {
    console.log('Add!')
    setMessage('Oh hi')
    console.log(question)
    console.log(newQuestion)
  }

  return (
    <div>
      <Message message={message} />
      <Container>
        <ListContainer questions={questions} loadQuestion={loadQuestion} />
        <EditContainer question={editQuestion} deleteQuestion={deleteQuestion} addQuestion={addQuestion} setMessage={setMessage} />
      </Container>
    </div>
  )
}

export default Create