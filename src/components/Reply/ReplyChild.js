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
    reply,
    replyIndex,
    parentId,
    parentIndex,
    handleAddReplyChild,
    onUpdate,
    replyReportHandle
  } = props;

  const replyInfoProps = {
    accountId: reply.accountId,
    anonymousNickname: reply.anonymousNickname,
    createAt: reply.createAt
  };

  const replyContentProps = {
    reply,
    parentId,
    parentIndex,
    replyIndex,
    handleAddReplyChild,
    onUpdate,
    replyReportHandle
  };

  return (
    <ChildWrapper isDelete={reply.isDelete}>
      <ReplyInfo {...replyInfoProps} />
      <ReplyContent {...replyContentProps} />
    </ChildWrapper>
  );
};

export default ChildReply;
