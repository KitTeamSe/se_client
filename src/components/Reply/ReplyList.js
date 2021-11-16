import React from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import Reply from './Reply';
import ReplyChildAddContainer from '../../containers/Reply/ReplyChildAddContainer';

const ReplyListWrapper = styled.div`
  width: 100%;
`;

const ReplyHeaderWrapper = styled.div`
  padding: 1rem;
`;

const CommentWrapper = styled.div`
  padding: 1rem;
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
  const { data, loading, handleAddReplyChild, onUpdate, replyReportHandle } =
    props;

  return !loading && data
    ? data.map((reply, idx) => (
        <React.Fragment key={reply.replyId}>
          <Reply
            reply={reply}
            replyIndex={idx}
            handleAddReplyChild={handleAddReplyChild}
            onUpdate={onUpdate}
            replyReportHandle={replyReportHandle}
          />
          {reply.child && reply.child.length
            ? reply.child.map((childReply, childIdx) => (
                <Reply
                  reply={childReply}
                  replyIndex={childIdx}
                  parentId={reply.replyId}
                  parentIndex={idx}
                  handleAddReplyChild={handleAddReplyChild}
                  onUpdate={onUpdate}
                  replyReportHandle={replyReportHandle}
                />
              ))
            : null}
          <ReplyChildAddContainer parentId={reply.replyId} />
        </React.Fragment>
      ))
    : null;
};

const ReplyList = props => {
  const {
    data,
    totalData,
    loading,
    error,
    handleAddReplyChild,
    onUpdate,
    replyReportHandle,
    children
  } = props;

  return (
    <ReplyListWrapper>
      <ReplyHeader totalData={totalData} />
      {children}
      <ReplyEntries
        data={data}
        loading={loading}
        handleAddReplyChild={handleAddReplyChild}
        onUpdate={onUpdate}
        replyReportHandle={replyReportHandle}
      />
      <ReplyMessage data={data} loading={loading} error={error} />
    </ReplyListWrapper>
  );
};
export default ReplyList;
