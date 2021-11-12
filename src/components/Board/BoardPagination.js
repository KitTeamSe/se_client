import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem } from '@mui/material';

const PaginationStyled = styled(Pagination)`
  & ul {
    justify-content: center;
    padding: 10px;
    & li {
      padding: 4px;
    }
  }
`;

const BoardPagination = props => {
  const { postData, boardPage, qsMaker } = props;
  const totalPage = postData ? postData.data.postListItem.totalPages : 1;

  return (
    <PaginationStyled
      component="div"
      size="small"
      count={parseInt(totalPage, 10)}
      page={boardPage ? parseInt(boardPage, 10) : 1}
      renderItem={item => (
        <PaginationItem component={Link} to={`?${qsMaker(item)}`} {...item} />
      )}
    />
  );
};

export default BoardPagination;
