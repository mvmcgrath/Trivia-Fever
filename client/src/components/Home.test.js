import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Home from './Home'

describe('<Home />', () => {
  beforeEach(() => {
    render(
      <Home />
    )
  })

  test('Renders title and blurb', async () => {
    await screen.findByText('Trivia Fever')
    await screen.findByText('The web browser trivia game anyone can play!')
  })

  test('Renders features', async () => {
    await screen.findByText('Features')
    await screen.findByText('Play games of trivia with thousands of possible questions!')
    await screen.findByText('See detailed information about questions!')
    await screen.findByText('Create your own questions!')
    await screen.findByText('Keep track of your trivia statistics and rank overall!')
    await screen.findByText('Become the best trivia player ever!')
  })
})