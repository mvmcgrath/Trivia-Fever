import styled from 'styled-components'
import { useState, useEffect } from 'react'
import questionService from '../../services/question'
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
    questionService.getAllPersonal().then(returnedQuestions => {
      setQuestions(returnedQuestions)
    })
  }, [])

  const loadQuestion = (question) => {
    setEditQuestion(question)
  }

  const deleteQuestion = async (question) => {
    try {
      await questionService.deleteQuestion(question.id)
      setMessage('You have deleted a question!')
      setQuestions(questions.filter(q => q.id !== question.id))
    } catch (exception) {
      setMessage(exception.response.data.error)
    }
  }

  const addQuestion = async (question, newQuestion) => {
    try {
      if (question.id === -1) {
        const returnedQuestion = await questionService.create(newQuestion)
        setMessage('A new question has been created!')
        setQuestions(questions.concat(returnedQuestion))
      } else {
        await questionService.update(question.id, newQuestion)
        setMessage('You have successfully updated the question!')
        newQuestion = { ...newQuestion, id: question.id }
        setQuestions(questions.filter(q => q.id !== question.id).concat(newQuestion))
      }
    } catch (exception) {
      setMessage(exception.response.data.error)
    }
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