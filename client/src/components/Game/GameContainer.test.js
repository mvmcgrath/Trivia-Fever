import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import GameContainer from './GameContainer'
import userEvent from '@testing-library/user-event'

describe('<GameContainer />', () => {
  let handleAnswer

  beforeEach(() => {
    handleAnswer = jest.fn()

    const question = {
      question: 'Does this test work?',
      correct_answer: 'Yes',
      incorrect_answers: [
        'No',
        'Maybe',
        'Possibly'
      ]
    }

    render(
      <GameContainer question={question} handleAnswer={handleAnswer} />
    )
  })

  test('Renders question and answers', async () => {
    await screen.findByText('Does this test work?')
    await screen.findByText('Yes')
    await screen.findByText('No')
    await screen.findByText('Maybe')
    await screen.findByText('Possibly')
  })

  test('Correct answer is handled', async () => {
    const user = userEvent.setup()
    const button = await screen.getByText('Yes')

    await user.click(button)

    expect(handleAnswer.mock.calls).toHaveLength(1)
    expect(handleAnswer.mock.calls[0][0]).toBe('Yes')
  })

  test('Incorrect answer is handled', async () => {
    const user = userEvent.setup()
    const button = await screen.getByText('No')

    await user.click(button)

    expect(handleAnswer.mock.calls).toHaveLength(1)
    expect(handleAnswer.mock.calls[0][0]).toBe('')
  })
})