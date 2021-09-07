import React from 'react';

import styled from 'styled-components';
import { ReplyContent, ReplyWrapper } from './Reply';

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
    handleAddReplyChild
  } = props;

  return (
    <ChildWrapper isDelete={isDelete}>
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
      />
    </ChildWrapper>
  );
};

export default ChildReply;
