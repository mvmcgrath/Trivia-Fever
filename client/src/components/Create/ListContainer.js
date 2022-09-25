import styled from 'styled-components'
import QuestionButton from './QuestionButton'

const Container = styled.div`
  padding: 50px;
  background-color: #393E41;
  text-align: center;
  font-size: 2rem;
  flex: 1;
  margin: 0px 100px;
  border-radius: 25px;
  height: 600px;
  width: 900px;
  max-height: 600px;
  max-width: 900px;
`

const QuestionFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 25px;
  border-radius: 10px;
`

const QuestionContainer = styled.div`
  padding: 0px 25px;
  overflow-y: auto;
  height: 400px;
  margin-bottom: 55px;
`

const Header = styled.h2`
  font-size: 2rem;
  margin: 20px 0px;
`

const ListContainer = ({ questions, loadQuestion }) => {
  const dummyQuestion = {
    id: 0,
    content: 'New Question'
  }

  return (
    <Container>
      <Header>Questions</Header>
      <QuestionFlex>
        <QuestionContainer>
          {questions.map(question =>
            <QuestionButton key={question.id} question={question} loadQuestion={loadQuestion} />
          )}
        </QuestionContainer>
        <QuestionButton key={dummyQuestion.id} question={dummyQuestion} loadQuestion={loadQuestion} />
      </QuestionFlex>
    </Container>
  )
}

export default ListContainer