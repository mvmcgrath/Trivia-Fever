import { Container } from '../StyleHelper'
import TimerBar from './TimerBar'
//import { useState, useEffect } from 'react'
import styled from 'styled-components'

const VerticalContainer = styled(Container)`
  flex-direction: column;
  padding: 50px 0px 0px;
`

const PlayUser = () => {
  return(
    <VerticalContainer>
      <TimerBar />
    </VerticalContainer>
  )
}

export default PlayUser