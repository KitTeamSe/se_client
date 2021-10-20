import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CircularProgress, Pagination, PaginationItem } from '@mui/material';
import qs from 'qs';
import { MainWrapper } from '../Wrapper/Wrapper';
import BoardTable from './BoardTable';
import BoardHead from './BoardHead';

const LoadingCircle = styled(CircularProgress)`
  position: absolute;
  bottom: 50vh;
`;

const NoBoardBox = styled.div`
  width: 100%;
  height: 100%;
  font-size: 2rem;
  text-align: center;
  margin: 96px 0 96px 0;
`;

const PaginationStyled = styled(Pagination)`
  & ul {
    justify-content: center;
    padding: 10px;
    & li {
      padding: 4px;
    }
  }
`;

const Paginations = props => {
  const { res, boardPage, location } = props;
  const totalPage = res.postListItem.totalPages;

  function qsMaker(item) {
    const { secret, replyPage } = qs.parse(location.search, {
      ignoreQueryPrefix: true
    });
    const { page } = item;
    const qsResult = qs.stringify({ secret, page, replyPage });
    return qsResult;
  }

  return (
    <PaginationStyled
      component="div"
      size="small"
      count={totalPage || 1}
      page={boardPage ? parseInt(boardPage, 10) : 1}
      renderItem={item => (
        <PaginationItem component={Link} to={`?${qsMaker(item)}`} {...item} />
      )}
    />
  );
};

const ErrorBoard = props => {
  const { error } = props;
  return <NoBoardBox>{error.message}</NoBoardBox>;
};

const Board = props => {
  const {
    onSearchChange,
    data,
    loading,
    error,
    NoticeData,
    NoticeLoading,
    NoticeError,
    keyword,
    onSearch,
    onPostSearchTypeChange,
    onWritePost,
    postSearchType,
    boardNameEng,
    boardPage,
    boardDescription,
    location,
    onSelectOpen,
    onSelectClose
  } = props;

  if (error) {
    return <ErrorBoard error={error} />;
  }

  if (NoticeError) {
    return <ErrorBoard error={NoticeError} />;
  }

  if (data === null || loading) {
    return <LoadingCircle />;
  }

  if (NoticeData === null || NoticeLoading) {
    return <LoadingCircle />;
  }

  const res = data.data;
  const notice = NoticeData.data;
  return (
    <MainWrapper>
      <BoardHead
        boardDescription={boardDescription}
        postSearchType={postSearchType}
        onPostSearchTypeChange={onPostSearchTypeChange}
        keyword={keyword}
        onSearch={onSearch}
        onSearchChange={onSearchChange}
        onWritePost={onWritePost}
        onSelectOpen={onSelectOpen}
        onSelectClose={onSelectClose}
      />
      <BoardTable
        res={res}
        notice={notice}
        boardNameEng={boardNameEng}
        boardPage={boardPage}
      />
      <Paginations
        res={res}
        boardNameEng={boardNameEng}
        boardPage={boardPage}
        location={location}
      />
    </MainWrapper>
  );
};

export default Board;
