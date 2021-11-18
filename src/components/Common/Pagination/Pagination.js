import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Pagination as MuiPagination, PaginationItem } from '@mui/material';

const PaginationStyled = styled(MuiPagination)`
  & ul {
    justify-content: center;
    padding: 10px;
    & li {
      padding: 4px;
    }
  }
`;

const Pagination = props => {
  const { page, totalPage, qsMaker } = props;

  return (
    <PaginationStyled
      component="div"
      size="small"
      showFirstButton
      showLastButton
      count={parseInt(totalPage, 10)}
      page={page ? parseInt(page, 10) : 1}
      renderItem={item => (
        <PaginationItem component={Link} to={`?${qsMaker(item)}`} {...item} />
      )}
    />
  );
};

export default Pagination;
