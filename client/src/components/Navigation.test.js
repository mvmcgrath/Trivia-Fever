import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navigation from './Navigation'
import { BrowserRouter as Router } from 'react-router-dom'

describe('<Navigation /> when user is null', () => {
  let handleLogout

  beforeEach(() => {
    handleLogout = jest.fn()

    render(
      <Router>
        <Navigation user={null} handleLogout={handleLogout} />
      </Router>
    )
  })

  test('Site navigation links appear on screen', async () => {
    await screen.findByText('Trivia Fever')
    await screen.findByText('Play')
    await screen.findByText('Create')
    await screen.findByText('Statistics')
    await screen.findByText('Login')
  })
})

describe('<Navigation /> when user exists', () => {
  let handleLogout

  beforeEach(() => {
    handleLogout = jest.fn()

    const user = {
      username: 'lipsum'
    }

    render(
      <Router>
        <Navigation user={user} handleLogout={handleLogout} />
      </Router>
    )
  })

  test('Site navigation links and username appear on screen', async () => {
    await screen.findByText('Trivia Fever')
    await screen.findByText('Play')
    await screen.findByText('Create')
    await screen.findByText('Statistics')
    await screen.findByText('lipsum')
    await screen.findByText('Logout')
  })

  test('Logout button can be clicked', async () => {
    const user = userEvent.setup()
    const button = await screen.getByText('Logout')

    await user.click(button)

    expect(handleLogout.mock.calls).toHaveLength(1)
  })
})