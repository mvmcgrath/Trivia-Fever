import styled from 'styled-components'

const Home = () => {
  const BodyContainer = styled.div`
    display: flex;
    background-color: #A67DB8;
    flex-direction: column;
    justify-content: flex-start;
    padding: 10% 0px;
    color: white;
    row-gap: 5em;
  `

  const BottomContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 10%;
    background-color: red;

    @media (max-width: 800px) {
      flex-direction: column;
    }
  `

  const TextHeading = styled.h1`
    font-size: 10vw;
    margin: 0px;
  `

  const TextBlurb = styled.p`
    font-size: 2vw;
  `

  const Header = styled.header`
    font-size: 3em;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin: 0px;
  `

  const BottomSection = styled.div`
    flex-basis: 100%;
    font-size: 1vw;
    justify-content: center;
  `

  const BottomHeader = styled.h2`
    font-size: 2vw;
  `

  //Make trivia fever image for title page and navigation bar

  return(
    <BodyContainer>
      <Header>
        <TextHeading>Trivia Fever</TextHeading>
        <TextBlurb>The web browser trivia game anyone can play</TextBlurb>
      </Header>
      <BottomContainer>
        <BottomSection>
          <div>
            <BottomHeader>Features</BottomHeader>
          </div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td>Play games of trivia with thousands of possible questions!</td>
                </tr>
                <tr>
                  <td>See detailed information about questions, including their percieved difficulty and category!</td>
                </tr>
                <tr>
                  <td>Create your own questions and games, that you can share with friends</td>
                </tr>
                <tr>
                  <td>Keep track of your trivia statistics, and see how you rank overall!</td>
                </tr>
                <tr>
                  <td>Become the best trivia player ever!</td>
                </tr>
              </tbody>
            </table>
          </div>
        </BottomSection>
        <BottomSection>
          <div>
            <BottomHeader>Question of the Day</BottomHeader>
            <p>What is a good placeholder?</p>
          </div>
        </BottomSection>
        <BottomSection>
          <div>
            <BottomHeader>About</BottomHeader>
          </div>
        </BottomSection>
      </BottomContainer>
    </BodyContainer>
  )
}

export default Home