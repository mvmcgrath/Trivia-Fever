import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import TableRow from './TableRow'

describe('<TableRow />', () => {
  beforeEach(() => {
    const user = {
      username: 'Test',
      correctAnswers: 3,
      gamesPlayed: 6
    }

    render(
      <table>
        <tbody>
          <TableRow user={user} />
        </tbody>
      </table>
    )
  })

  test('Renders individual user statistics', async () => {
    await screen.findByText('Test')
    await screen.findByText('3')
    await screen.findByText('6')
  })
})