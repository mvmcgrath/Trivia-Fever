import styled from 'styled-components'
import { Container } from '../StyleHelper'
import QuestionButton from './QuestionButton'

const CreateContainer = styled.div`
  padding: 50px;
  background-color: #393E41;
  border-radius: 25px;
  text-align: center;
  font-size: 2rem;
  flex: 2;
  margin: 0px 100px;
`

const ListContainer = styled.div`
  padding: 50px;
  background-color: #393E41;
  text-align: center;
  font-size: 2rem;
  flex: 1;
  margin: 0px 100px;
  border-radius: 25px;
`

const QuestionFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 25px;
  border-radius: 25px;
`

const QuestionContainer = styled.div`
  padding: 0px 25px;
  overflow-y: auto;
  height: 500px;
`

const Header = styled.h2`
  font-size: 2rem;
  margin: 20px 0px;
`

const Create = () => {
  const loadQuestion = (id) => {
    console.log(id)
  }

  return (
    <Container>
      <ListContainer>
        <Header>Questions</Header>
        <QuestionFlex>
          <QuestionContainer>
            <QuestionButton id={0} text="What is the capital of France?" loadQuestion={loadQuestion} />
          </QuestionContainer>
        </QuestionFlex>
      </ListContainer>
      <CreateContainer>
        <Header>Select a Question</Header>
      </CreateContainer>
    </Container>
  )
}

export default Create