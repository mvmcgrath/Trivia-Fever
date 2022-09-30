import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import GameSelect from './GameSelect'
import { BrowserRouter as Router } from 'react-router-dom'

describe('<GameSelect />', () => {
  beforeEach(() => {
    render(
      <Router>
        <GameSelect />
      </Router>
    )
  })

  test('Renders header and two options', async () => {
    await screen.findByText('Select Game Type')
    await screen.findByText('Normal Questions')
    await screen.findByText('User Questions')
  })
})