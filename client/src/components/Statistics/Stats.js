import styled from 'styled-components'
import { Container } from '../StyleHelper'
import { useState, useEffect } from 'react'
import userService from '../../services/user'
import TableRow from './TableRow'

const Table = styled.table`
  font-size: 1.6rem;
  table-layout: auto;
  border-collapse: collapse;
  white-space: nowrap;
  text-align: center;
  background-color: #4b5054;
`

const TableHeader = styled.th`
  padding: 20px;
  border: 3px solid white;
`

const TableContainer = styled.span`
  padding: 50px 300px 50px;
  background-color: #393E41;
  border-radius: 25px;
  text-align: center;
  font-size: 2rem;
  border: 3px solid white;
`

const Stats = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(users => {
      setUsers( users )
    })
  }, [])

  return(
    <div>
      <Container>
        <TableContainer>
          <h1>High Scores</h1>
          <Table>
            <thead>
              <tr>
                <TableHeader>User</TableHeader>
                <TableHeader>Games Played</TableHeader>
                <TableHeader>Correct Answers</TableHeader>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <TableRow key={user._id} user={user} />
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  )
}

export default Stats