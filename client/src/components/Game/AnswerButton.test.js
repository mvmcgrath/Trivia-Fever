import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AnswerButton from './AnswerButton'

describe('<AnswerButton /> when status is null', () => {
  let handleAnswer

  beforeEach(() => {
    handleAnswer = jest.fn()
    const answer = 'Yes'
    const letter = 'c'
    const status = null

    render(
      <AnswerButton handleAnswer={handleAnswer}  answer={answer} letter={letter} status={status} />
    )
  })

  test('Answer is displayed and color is correct', async () => {
    const button = await screen.getByText('Yes')
    expect(button).toHaveStyle('border: 3px solid white')
  })

  test('Answer button functions on click', async () => {
    const user = userEvent.setup()
    const button = await screen.getByText('Yes')

    await user.click(button)

    expect(handleAnswer.mock.calls).toHaveLength(1)
    expect(handleAnswer.mock.calls[0][0]).toBe('c')
  })
})

describe('<AnswerButton /> when status is correct', () => {
  let handleAnswer

  beforeEach(() => {
    handleAnswer = jest.fn()
    const answer = 'Yes'
    const letter = 'c'
    const status = 'Correct'

    render(
      <AnswerButton handleAnswer={handleAnswer}  answer={answer} letter={letter} status={status} />
    )
  })

  test('Answer is displayed and color is correct', async () => {
    const button = await screen.getByText('Yes')
    expect(button).toHaveStyle('border: 3px solid green')
  })

  test('Answer button functions on click', async () => {
    const user = userEvent.setup()
    const button = await screen.getByText('Yes')

    await user.click(button)

    expect(handleAnswer.mock.calls).toHaveLength(1)
    expect(handleAnswer.mock.calls[0][0]).toBe('c')
  })
})

describe('<AnswerButton /> when status is correct', () => {
  let handleAnswer

  beforeEach(() => {
    handleAnswer = jest.fn()
    const answer = 'Yes'
    const letter = 'c'
    const status = 'Wrong'

    render(
      <AnswerButton handleAnswer={handleAnswer}  answer={answer} letter={letter} status={status} />
    )
  })

  test('Answer is displayed and color is correct', async () => {
    const button = await screen.getByText('Yes')
    expect(button).toHaveStyle('border: 3px solid red')
  })

  test('Answer button functions on click', async () => {
    const user = userEvent.setup()
    const button = await screen.getByText('Yes')

    await user.click(button)

    expect(handleAnswer.mock.calls).toHaveLength(1)
    expect(handleAnswer.mock.calls[0][0]).toBe('c')
  })
})