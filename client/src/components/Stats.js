import styled from 'styled-components'
import { Container } from './StyleHelper'

const Table = styled.table`
  font-size: 2rem;
  table-layout: auto;
  border-collapse: collapse;
  white-space: nowrap;
  text-align: center;
`

const TableHeader = styled.th`
  padding: 20px;
  border: 3px solid white;
`

const TableContainer = styled.span`
  padding: 50px 300px 50px;
  background-color: #393E41;
  border-radius: 25px;
`

const Stats = () => {
  return(
    <div>
      <Container>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <TableHeader>User</TableHeader>
                <TableHeader>Games Played</TableHeader>
                <TableHeader>Correct Answers</TableHeader>
              </tr>
            </thead>
            <tbody>
              <tr>
                <TableHeader as="td">Betsy</TableHeader>
                <TableHeader as="td">3</TableHeader>
                <TableHeader as="td">7</TableHeader>
              </tr>
            </tbody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  )
}

export default Stats