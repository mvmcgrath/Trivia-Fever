import { Container } from '../StyleHelper'
import { useState, useEffect } from 'react'
//import questionService from '../../services/question'
import ListContainer from './ListContainer'
import EditContainer from './EditContainer'

const Create = () => {
  const [questions, setQuestions] = useState([])
  const [editQuestion, setEditQuestion] = useState(null)

  useEffect(() => {
    //const returnedQuestions = await questionService.getAll()

    const returnedQuestions = [
      {
        content: 'What is the capital of France?',
        a: 'Paris',
        b: 'Berlin',
        c: 'London',
        d: 'Tokyo',
        difficulty: 'Medium',
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
    console.log(question)
    console.log(newQuestion)
  }

  return (
    <Container>
      <ListContainer questions={questions} loadQuestion={loadQuestion} />
      <EditContainer question={editQuestion} deleteQuestion={deleteQuestion} addQuestion={addQuestion} />
    </Container>
  )
}

export default Create