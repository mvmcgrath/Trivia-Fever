import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Stats from './Stats'

describe('<Stats/>', () => {
  beforeEach(() => {
    render(
      <Stats />
    )
  })

  test('Renders table title and headers', async () => {
    await screen.findByText('High Scores')
    await screen.findByText('User')
    await screen.findByText('Games Played')
    await screen.findByText('Correct Answers')
  })
})