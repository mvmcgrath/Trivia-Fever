import styled from 'styled-components'
import { useState } from 'react'

const Container = styled.div`
  padding: 50px;
  background-color: #393E41;
  text-align: center;
  font-size: 2rem;
  flex: 2;
  margin: 0px 100px;
  border-radius: 25px;
`

const PropertyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  max-height: 468px;
  max-width: 863px;
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
`

// Height is really hacky here, need to fix
const CreateFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 25px;
  border-radius: 25px;
  height: 468px;
`

const ButtonFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
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


const EditContainer = ({ question, deleteQuestion, addQuestion }) => {
  if (question === null) {
    return(
      <Container>
        <h2>Select a Question</h2>
      </Container>
    )
  }

  const [content, setContent] = useState(question.content)
  const [answerA, setAnswerA] = useState(question.a)
  const [answerB, setAnswerB] = useState(question.b)
  const [answerC, setAnswerC] = useState(question.c)
  const [answerD, setAnswerD] = useState(question.d)
  const [category, setCategory] = useState(question.category)
  const [difficulty, setDifficulty] = useState(question.difficulty)

  const difficulties = ['Easy', 'Medium', 'Hard']
  const categories = ['General Knowledge','Entertainment: Books','Entertainment: Film','Entertainment: Music','Entertainment: Musicals & Theatres','Entertainment: Television',
    'Entertainment: Video Games', 'Entertainment: Board Games','Science & Nature','Science: Computers','Science: Mathematics','Mythology','Sports','Geography',
    'History','Politics','Art', 'Celebrities','Animals','Vehicles','Entertainment: Comics','Science: Gadgets','Entertainment: Japanese Anime & Manga',
    'Entertainment: Cartoon & Animations']


  const handleDelete = (event) => {
    event.preventDefault()
    deleteQuestion(question)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addQuestion(question, question)
  }

  return(
    <Container>
      <form onSubmit={handleSubmit}>
        <StyledLabel>{question.id === 0 ? 'New Question' : 'Update Question'}</StyledLabel>
        <Header type="text" value={content} name="Content" id="content" onChange={({ target }) => setContent(target.value)} />
        <PropertyContainer>
          <CreateFlex>
            <div>
              <StyledLabel>A</StyledLabel>
              <Answer type="text" value={answerA} name="AnswerA" id="answerA" onChange={({ target }) => setAnswerA(target.value)} />
            </div>
            <div>
              <StyledLabel>B</StyledLabel>
              <Answer type="text" value={answerB} name="AnswerB" id="answerB" onChange={({ target }) => setAnswerB(target.value)} />
            </div>
            <div>
              <StyledLabel>C</StyledLabel>
              <Answer type="text" value={answerC} name="AnswerC" id="answerC" onChange={({ target }) => setAnswerC(target.value)} />
            </div>
            <div>
              <StyledLabel>D</StyledLabel>
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
          </CreateFlex>
        </PropertyContainer>
        <ButtonFlex>
          <StyledButton type="submit" id="add-button">{question.id === 0 ? 'Add' : 'Update'}</StyledButton>
          <StyledButton onClick={handleDelete} id="delete-button">Delete</StyledButton>
        </ButtonFlex>
      </form>
    </Container>
  )
}

export default EditContainer