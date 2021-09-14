import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { Pagination, PaginationItem } from '@material-ui/lab';
import Reply from './Reply';
import ReplyChild from './ReplyChild';
import ReplyAddContainer from '../../containers/Reply/ReplyAddContainer';

const PaginationStyled = styled(Pagination)`
  & ul {
    justify-content: center;
    padding: 10px;
  }
`;

const ReplyHeaderWrapper = styled.div`
  border-top: 1px solid #ddd;
  padding: 10px;
`;

const CommentWrapper = styled.div`
  padding: 10px;
`;

const ReplyHeader = props => {
  const { totalData } = props;
  return (
    <ReplyHeaderWrapper>
      {totalData > -1 ? (
        <Typography variant="h6">{totalData} 개의 댓글</Typography>
      ) : (
        <Typography variant="h6">댓글 없음</Typography>
      )}
    </ReplyHeaderWrapper>
  );
};

const ReplyPagination = props => {
  const { totalPage, page, baseUrl } = props;

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
          to={`${baseUrl}?replyPage=${item.page}`}
          {...item}
        />
      )}
    />
  );
};

const ReplyEmpty = props => {
  const { data } = props;
  return (
    data &&
    !data.length && <CommentWrapper>작성된 댓글이 없습니다.</CommentWrapper>
  );
};

const ReplyLoading = props => {
  const { loading } = props;
  return (
    loading && <CommentWrapper>데이터를 불러오는 중입니다.</CommentWrapper>
  );
};

const ReplyError = props => {
  const { loading, error } = props;
  return !loading && error ? (
    <CommentWrapper>
      데이터를 불러올 수 없습니다. 새로고침을 하거나 관리자에게 문의하세요.
    </CommentWrapper>
  ) : null;
};

const ReplyMessage = props => {
  const { data, loading, error } = props;
  return (
    <>
      <ReplyEmpty data={data} />
      <ReplyLoading loading={loading} />
      <ReplyError loading={loading} error={error} />
    </>
  );
};

const ReplyEntries = props => {
  const { loading, data, handleAddReplyChild, onUpdate, replyReportHandle } =
    props;
  console.log(data);

  return !loading && data
    ? data.map((reply, idx) => (
        <Reply
          replyId={reply.replyId}
          replyIndex={idx}
          accountId={reply.accountId}
          anonymousNickname={reply.anonymousNickname}
          content={reply.text}
          createAt={reply.createAt}
          isSecret={reply.isSecret}
          isDelete={reply.isDelete}
          handleAddReplyChild={handleAddReplyChild}
          onUpdate={onUpdate}
          replyReportHandle={replyReportHandle}
        >
          {reply.child && reply.child.length
            ? reply.child.map((childReply, childIdx) => (
                <ReplyChild
                  parentId={reply.replyId}
                  parentIndex={idx}
                  replyId={childReply.replyId}
                  replyIndex={childIdx}
                  accountId={childReply.accountId}
                  anonymousNickname={childReply.anonymousNickname}
                  content={childReply.text}
                  createAt={childReply.createAt}
                  isSecret={childReply.isSecret}
                  isDelete={childReply.isDelete}
                  handleAddReplyChild={handleAddReplyChild}
                  onUpdate={onUpdate}
                  replyReportHandle={replyReportHandle}
                />
              ))
            : null}
        </Reply>
      ))
    : null;
};

const ReplyList = props => {
  const {
    data,
    totalPage,
    totalData,
    loading,
    error,
    page,
    baseUrl,
    handleAddReplyChild,
    onUpdate,
    replyReportHandle
  } = props;

  return (
    <>
      <ReplyHeader totalData={totalData} />
      <ReplyAddContainer />
      <ReplyEntries
        loading={loading}
        data={data}
        handleAddReplyChild={handleAddReplyChild}
        onUpdate={onUpdate}
        replyReportHandle={replyReportHandle}
      />
      <ReplyMessage data={data} loading={loading} error={error} />
      <ReplyPagination totalPage={totalPage} page={page} baseUrl={baseUrl} />
    </>
  );
};
export default ReplyList;
