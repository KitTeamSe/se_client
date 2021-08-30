import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { Pagination, PaginationItem } from '@material-ui/lab';
import Reply from './Reply';

const PaginationStyled = styled(Pagination)`
  & ul {
    justify-content: center;
    padding: 10px;
  }
`;

const ReplyHeaderWrapper = styled.div`
  border-top: 1px solid #ddd;
  padding: 10px 10px;
`;

const ReplyHeader = props => {
  const { totalData } = props;
  return (
    <ReplyHeaderWrapper>
      <Typography variant="h6">{totalData} 개의 댓글</Typography>
    </ReplyHeaderWrapper>
  );
};

const ReplyPagination = props => {
  const { totalPage, page, boardId, postId } = props;

  return (
    <PaginationStyled
      component="div"
      shape="rounded"
      size="small"
      variant="outlined"
      showFirstButton
      showLastButton
      count={totalPage}
      page={page ? parseInt(page, 10) : 1}
      renderItem={item => (
        <PaginationItem
          component={Link}
          to={`/board/${boardId}/${postId}?replyPage=${item.page}`}
          {...item}
        />
      )}
    />
  );
};

const ReplyList = props => {
  const {
    data,
    totalPage,
    totalData,
    loading,
    error,
    page,
    boardId,
    postId,
    handleAddReplyChild
  } = props;

  return (
    <>
      <ReplyHeader totalData={totalData} />
      {!loading && data
        ? data.map(e => (
            <Reply
              replyId={e.replyId}
              accountId={e.accountId}
              anonymousNickname={e.anonymousNickname}
              content={e.text}
              createAt={e.createAt}
              child={e.child}
              isDelete={e.isDelete}
              handleAddReplyChild={handleAddReplyChild}
            />
          ))
        : null}
      {data && !data.length && <div>작성된 댓글이 없습니다.</div>}
      {loading && <div>데이터를 불러오는 중입니다.</div>}
      {!loading && error ? (
        <div>
          데이터를 불러올 수 없습니다. 새로고침을 하거나 관리자에게 문의하세요.
        </div>
      ) : null}
      <ReplyPagination
        totalPage={totalPage}
        page={page}
        boardId={boardId}
        postId={postId}
      />
    </>
  );
};
export default ReplyList;
