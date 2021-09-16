import React from 'react';

import styled from 'styled-components';
import { ReplyInfo, ReplyContent, ReplyWrapper } from './Reply';

const ChildWrapper = styled(ReplyWrapper)`
  padding-left: 30px;
  @media ${props => props.theme.mobile} {
    padding-left: 20px;
  }
`;

const ChildReply = props => {
  const {
    parentId,
    parentIndex,
    replyId,
    replyIndex,
    accountId,
    anonymousNickname,
    content,
    createAt,
    isSecret,
    isDelete,
    handleAddReplyChild,
    replyReportHandle
  } = props;

  return (
    <ChildWrapper isDelete={isDelete}>
      <ReplyInfo
        accountId={accountId}
        anonymousNickname={anonymousNickname}
        createAt={createAt}
      />
      <ReplyContent
        parentId={parentId}
        parentIndex={parentIndex}
        replyId={replyId}
        replyIndex={replyIndex}
        accountId={accountId}
        anonymousNickname={anonymousNickname}
        content={content}
        createAt={createAt}
        isSecret={isSecret}
        isDelete={isDelete}
        handleAddReplyChild={handleAddReplyChild}
        replyReportHandle={replyReportHandle}
      />
    </ChildWrapper>
  );
};

export default ChildReply;
