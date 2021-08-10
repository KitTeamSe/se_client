import React from 'react';
import styled from 'styled-components';
import { Pagination as Paginations } from '@material-ui/lab';

const PaginationStyled = styled(Paginations)`
  & ul {
    justify-content: center;
    padding: 10px;
  }
`;

const Board = props => {
  const { totalPage, page, onChange } = props;
  return (
    <PaginationStyled
      component="div"
      count={totalPage}
      page={parseInt(page, 10)}
      onChange={onChange}
      showFirstButton
      showLastButton
    />
  );
};

export default Board;
