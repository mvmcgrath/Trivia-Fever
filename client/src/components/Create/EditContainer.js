import styled from 'styled-components'
import { useState, useEffect } from 'react'

const Container = styled.div`
  padding: 50px;
  background-color: #393E41;
  text-align: center;
  font-size: 2rem;
  flex: 2;
  margin: 0px 100px;
  border-radius: 25px;
  height: 600px;
  width: 900px;
  max-height: 600px;
  max-width: 900px;
  border: 3px solid white;
`

const PropertyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

const Answer = styled.input`
  font-size: 2rem;
  width: 300px;
  border-radius: 10px;
  background-color: #4b5054;
  color: white;
  text-align: center;
`

const StyledLabel = styled.label`
  display: block;
`

const StyledSelect = styled.select`
  font-size: 1.5rem;
  background-color: #4b5054;
  color: white;
  margin-bottom: 20px;
  text-align: center;
  max-width: 300px;
`

const Header = styled(Answer)`
  min-width: 800px;
  margin-bottom: 40px;
`

const CreateFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 25px;
  border-radius: 25px;
`

const ButtonFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 80px;
`
const StyledButton = styled.button`
  font-size: 1.5rem;
  border: 3px solid white;
  border-radius: 10px;
  background-color: #4b5054;
  padding: 10px;
  color: white;
  width: 340px;
  cursor: pointer;
  margin-bottom: 10px;
`


const EditContainer = ({ question, deleteQuestion, addQuestion, setMessage }) => {
  // Needs to be refactored
  const [content, setContent] = useState(question.content ? question.content : '')
  const [answerA, setAnswerA] = useState(question.a ? question.a : '')
  const [answerB, setAnswerB] = useState(question.b ? question.b : '')
  const [answerC, setAnswerC] = useState(question.c ? question.c : '')
  const [answerD, setAnswerD] = useState(question.d ? question.d : '')
  const [category, setCategory] = useState(question.category ? question.category : 'General Knowledge')
  const [difficulty, setDifficulty] = useState(question.difficulty ? question.difficulty : 'Easy')
  const [correct, setCorrect] = useState(question.correct ? question.correct : 'a')

  useEffect(() => {
    setContent(question.content ? question.content : '')
    setAnswerA(question.a ? question.a : '')
    setAnswerB(question.b ? question.b : '')
    setAnswerC(question.c ? question.c : '')
    setAnswerD(question.d ? question.d : '')
    setCategory(question.category ? question.category : 'General Knowledge')
    setDifficulty(question.difficulty ? question.difficulty : 'Easy')
    setCorrect(question.correct ? question.correct : 'a')
  }, [question])

  const difficulties = ['Easy', 'Medium', 'Hard']
  const categories = ['General Knowledge','Entertainment: Books','Entertainment: Film','Entertainment: Music','Entertainment: Musicals & Theatres','Entertainment: Television',
    'Entertainment: Video Games', 'Entertainment: Board Games','Science & Nature','Science: Computers','Science: Mathematics','Mythology','Sports','Geography',
    'History','Politics','Art', 'Celebrities','Animals','Vehicles','Entertainment: Comics','Science: Gadgets','Entertainment: Japanese Anime & Manga',
    'Entertainment: Cartoon & Animations']
  const answerValues = ['a', 'b', 'c', 'd']


  const handleDelete = (event) => {
    event.preventDefault()
    deleteQuestion(question)
    setContent('')
    setAnswerA('')
    setAnswerB('')
    setAnswerC('')
    setAnswerD('')
    setCategory('General Knowledge')
    setDifficulty('Easy')
    setCorrect('a')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const newQuestion = {
      content,
      'a': answerA,
      'b': answerB,
      'c': answerC,
      'd': answerD,
      category,
      difficulty,
      correct
    }

    try {
      await addQuestion(question, newQuestion)
    } catch (exception) {
      setMessage('Something bad happened! Oopsie!')
    }
  }

  return(
    <Container>
      <form onSubmit={handleSubmit}>
        <StyledLabel>{question.id === -1 ? 'New Question' : 'Update Question'}</StyledLabel>
        <Header type="text" value={content} name="Content" id="content" onChange={({ target }) => setContent(target.value)} />
        <PropertyContainer>
          <CreateFlex>
            <div>
              <StyledLabel>a</StyledLabel>
              <Answer type="text" value={answerA} name="AnswerA" id="answerA" onChange={({ target }) => setAnswerA(target.value)} />
            </div>
            <div>
              <StyledLabel>b</StyledLabel>
              <Answer type="text" value={answerB} name="AnswerB" id="answerB" onChange={({ target }) => setAnswerB(target.value)} />
            </div>
            <div>
              <StyledLabel>c</StyledLabel>
              <Answer type="text" value={answerC} name="AnswerC" id="answerC" onChange={({ target }) => setAnswerC(target.value)} />
            </div>
            <div>
              <StyledLabel>d</StyledLabel>
              <Answer type="text" value={answerD} name="AnswerD" id="answerD" onChange={({ target }) => setAnswerD(target.value)} />
            </div>
          </CreateFlex>
          <CreateFlex>
            <div>
              <StyledLabel>Difficulty</StyledLabel>
              <StyledSelect name="difficulty" id="difficulty" value={difficulty === null ? 'Easy' : difficulty} onChange={({ target }) => setDifficulty(target.value)}>
                {difficulties.map((dif, i) =>
                  <option key={i} value={dif}>{dif}</option>
                )}
              </StyledSelect>
            </div>
            <div>
              <StyledLabel>Category</StyledLabel>
              <StyledSelect name="category" id="category" value={category === null ? 'General Knowledge' : category} onChange={({ target }) => setCategory(target.value)}>
                {categories.map((cat, i) =>
                  <option key={i} value={cat}>{cat}</option>
                )}
              </StyledSelect>
            </div>
            <div>
              <StyledLabel>Correct Answer</StyledLabel>
              <StyledSelect name="correct" id="correct" value={correct === null ? 'a' : correct} onChange={({ target }) => setCorrect(target.value)}>
                {answerValues.map((ans, i) =>
                  <option key={i} value={ans}>{ans}</option>
                )}
              </StyledSelect>
            </div>
          </CreateFlex>
        </PropertyContainer>
        <ButtonFlex>
          <StyledButton type="submit" id="add-button">{question.id === -1 ? 'Add' : 'Update'}</StyledButton>
          <StyledButton onClick={handleDelete} id="delete-button">Delete</StyledButton>
        </ButtonFlex>
      </form>
    </Container>
  )
}

export default EditContainer