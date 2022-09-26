import styled from 'styled-components'

const TableElement = styled.td`
  padding: 20px;
  border: 3px solid white;
`

const TableRow = ({ user }) => {
  return(
    <tr>
      <TableElement>{user.username}</TableElement>
      <TableElement>{user.gamesPlayed}</TableElement>
      <TableElement>{user.correctAnswers}</TableElement>
    </tr>
  )
}

export default TableRow