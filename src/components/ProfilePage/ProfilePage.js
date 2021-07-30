import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@material-ui/core';
import styled from 'styled-components';

const InfoTableWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const InfoTable = styled(TableContainer)`
  margin-top: 24px;
  max-width: 540px;
`;

const Welcome = styled.div`
  margin: 24px;
  font-size: 24px;
`;

const PropfilePage = props => {
  const { info } = props;
  const rows = Object.entries(info);

  return (
    <InfoTableWrapper>
      <Welcome>기본정보</Welcome>
      <InfoTable>
        <Table>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row[0]}>
                <TableCell component="th" scope="row">
                  {row[0]}
                </TableCell>
                <TableCell align="right">{row[1]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </InfoTable>
    </InfoTableWrapper>
  );
};

export default PropfilePage;
