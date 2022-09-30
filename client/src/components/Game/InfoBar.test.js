import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import InfoBar from './InfoBar'

describe('<InfoBar />', () => {
  beforeEach(() => {
    const question = {
      difficulty: 'easy',
      category: 'General Knowledge'
    }

    const number = 5
    const correct = 2

    render(
      <InfoBar question={question} number={number} correct={correct}/>
    )
  })

  test('Renders category, difficulty, correct answer gotten, and question number', async () => {
    await screen.findByText('Easy')
    await screen.findByText('General Knowledge')
    await screen.findByText('Question: 5/10')
    await screen.findByText('Correct Answers: 2')
  })
})