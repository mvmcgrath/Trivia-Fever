import styled from 'styled-components'

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 100px;
  color: white;
  row-gap: 5rem;
`

const BottomContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  padding: 0px 100px;
  background-color: #393E41;
  border: 3px solid white;

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
  }
`

const TextHeading = styled.h1`
  font-size: 10rem;
  margin: 0px;
`

const TextBlurb = styled.p`
  font-size: 2rem;
`

const Header = styled.header`
  font-size: 3rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 0px;
`

const BottomSection = styled.div`
  font-size: 1.4rem;
  text-align: center;
  flex: 1;
`

const BottomHeader = styled.h2`
  font-size: 3rem;
`

const LeftList = styled.ul`
  text-align: left;
`

const StyledLink = styled.a`
  color: white;
`


const Home = () => {
  //Make trivia fever image for title page and navigation bar

  return(
    <BodyContainer>
      <Header>
        <TextHeading>Trivia Fever</TextHeading>
        <TextBlurb>The web browser trivia game anyone can play!</TextBlurb>
      </Header>
      <BottomContainer>
        <BottomSection>
          <div>
            <BottomHeader>Features</BottomHeader>
          </div>
          <div>
            <LeftList>
              <li>Play games of trivia with thousands of possible questions!</li>
              <li>See detailed information about questions!</li>
              <li>Create your own questions!</li>
              <li>Keep track of your trivia statistics and rank overall!</li>
              <li>Become the best trivia player ever!</li>
            </LeftList>
          </div>
        </BottomSection>
        <BottomSection>
          <div>
            <BottomHeader>Get Started</BottomHeader>
            <span>Login to track your trivia statistics and to create trivia questions, or click on play to play a game of trivia!</span>
          </div>
        </BottomSection>
        <BottomSection>
          <div>
            <BottomHeader>About</BottomHeader>
            <span>Created and maintained </span>
            <StyledLink rel="noreferrer" href="https://github.com/mvmcgrath/Trivia-Fever/" target="_blank">here</StyledLink>
          </div>
        </BottomSection>
      </BottomContainer>
    </BodyContainer>
  )
}

export default Home