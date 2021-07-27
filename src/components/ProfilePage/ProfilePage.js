import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function createData(param, value) {
  return { param, value };
}

const rows = [
  createData('사진', '사진을 추가하여 계정을 맞춤설정할 수 있습니다'),
  createData('이름', '길무짱'),
  createData('생년월일', '생일추가'),
  createData('성별', '남성'),
  createData('비밀번호', 'se75407540')
];

const PropfilePage = props => {
  const { dummyData } = props;
  console.log(dummyData);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <div>기본정보</div>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.param}>
              <TableCell component="th" scope="row">
                {row.param}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PropfilePage;
