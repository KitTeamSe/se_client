import React from 'react';
import styled from 'styled-components';

import { Avatar, Typography } from '@mui/material';
import { getEncodeHTML, getFormatMyDate } from '../../utils/format';
import ReplyDeleteContainer from '../../containers/Reply/ReplyDeleteContainer';
import ReplyAnonyDeleteContainer from '../../containers/Reply/ReplyAnonyDeleteContainer';
import SecretReplyContainer from '../../containers/Reply/SecretReplyContainer';
import EditorOutput from '../Editor/EditorOutput';
import ActionButton from './ReplyActionButton';
import Nicknamecontainer from '../../containers/Post/NicknameContainer';
import AttachDownloadList from '../Editor/AttachDownloadList';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ReplyWrapper = styled.div`
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid #e9e9e9;
  background: ${props => props.isDelete === 'DELETED' && '#eeeeee'};
  padding-left: ${props => props.isChild && '30px'};
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    flex-direction: column;
  }
`;

const AvatarWrapper = styled.div`
  width: 40px;
  height: 40px;
  padding-right: 10px;
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    width: 35px;
    height: 35px;
  }
`;

const AnonyAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    width: 35px;
    height: 35px;
  }
`;

const UserAvatar = styled(AnonyAvatar)`
  background: #ff518f;
`;

const ReplyInfoWrapper = styled.div`
  display: flex;
  width: 180px;
  min-width: 180px;
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    width: 180px;
    min-width: 130px;
  }
`;

const UserInfoWrapper = styled.div`
  width: 100%;
`;

const CommentWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const ActionWrapper = styled(CommentWrapper)`
  display: flex;
  justify-content: flex-end;
`;

const AnonyNickName = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.875rem;
`;

const UserNickName = styled(AnonyNickName)`
  font-weight: 600;
  cursor: pointer;
`;

const DateWrapper = styled.div`
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    display: flex;
    margin-bottom: 10px;
  }
`;

const DateText = styled(Typography)`
  font-size: 0.5rem;
  font-weight: 400;
  font-color: #eeeeee;
`;

const TimeText = styled(DateText)`
  font-color: #999999;
`;

const ReplyComment = props => {
  const { content, isDelete, isSecret } = props;
  const handleContent = () => {
    if (isDelete === 'DELETED')
      return { __html: `❌ ${getEncodeHTML(content)}` };
    if (isSecret === 'SECRET')
      return { __html: `🔒 ${getEncodeHTML(content)}` };
    return { __html: getEncodeHTML(content) };
  };

  return (
    <CommentWrapper>
      <EditorOutput content={handleContent()} />
    </CommentWrapper>
  );
};

const ReplyAction = props => {
  const {
    parentId,
    parentIndex,
    accountId,
    replyIndex,
    anonymousNickname,
    replyId,
    isSecret,
    handleAddReplyChild,
    onUpdate,
    replyReportHandle
  } = props;
  const userId = localStorage.getItem('userId');
  const onAddReply = () => handleAddReplyChild(parentId || replyId);
  const onUpdateReply = () => onUpdate(replyId);
  const onReplyReport = () =>
    replyReportHandle(replyId, accountId, anonymousNickname);

  return (
    <ActionWrapper>
      {isSecret === 'SECRET' && (
        <SecretReplyContainer
          replyId={replyId}
          parentIndex={parentIndex}
          replyIndex={replyIndex}
        />
      )}
      <ActionButton onClick={onAddReply}>댓글</ActionButton>
      {userId && accountId ? (
        <>
          <ActionButton onClick={onUpdateReply}>수정</ActionButton>
          <ReplyDeleteContainer replyId={replyId} />
        </>
      ) : null}
      {anonymousNickname ? (
        <>
          <ActionButton onClick={onUpdateReply}>수정</ActionButton>
          <ReplyAnonyDeleteContainer replyId={replyId} />
        </>
      ) : null}
      {userId && userId !== accountId ? (
        <ActionButton onClick={onReplyReport}>신고</ActionButton>
      ) : null}
    </ActionWrapper>
  );
};

const ReplyInfo = props => {
  const { accountId, anonymousNickname, createAt } = props;

  return (
    <ReplyInfoWrapper>
      <AvatarWrapper>
        {accountId ? <UserAvatar /> : <AnonyAvatar />}
      </AvatarWrapper>
      <UserInfoWrapper>
        {accountId ? (
          <UserNickName>
            <Nicknamecontainer
              nickname={accountId}
              accountIdString={accountId}
            />
          </UserNickName>
        ) : (
          <AnonyNickName>{anonymousNickname}</AnonyNickName>
        )}
        <DateWrapper>
          <DateText>{getFormatMyDate(createAt).date}</DateText>
          <TimeText>{getFormatMyDate(createAt).time}</TimeText>
        </DateWrapper>
      </UserInfoWrapper>
    </ReplyInfoWrapper>
  );
};

const ReplyContent = props => {
  const {
    parentId,
    parentIndex,
    reply,
    replyIndex,
    handleAddReplyChild,
    onUpdate,
    replyReportHandle
  } = props;

  const replyCommentProps = {
    content: reply.text,
    isDelete: reply.isDelete,
    isSecret: reply.isSecret
  };

  const replyActionProps = {
    accountId: reply.accountId,
    anonymousNickname: reply.anonymousNickname,
    replyId: reply.replyId,
    isSecret: reply.isSecret,
    parentId,
    parentIndex,
    replyIndex,
    handleAddReplyChild,
    onUpdate,
    replyReportHandle
  };

  return (
    <ContentWrapper>
      <ReplyComment {...replyCommentProps} />
      <AttachDownloadList attachList={reply.attacheList} />
      {reply.isDelete === 'NORMAL' && <ReplyAction {...replyActionProps} />}
    </ContentWrapper>
  );
};

const Reply = props => {
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
    replyIndex,
    parentId,
    parentIndex,
    handleAddReplyChild,
    onUpdate,
    replyReportHandle
  };

  return (
    reply &&
    reply.replyId && (
      <ReplyWrapper isChild={parentId} isDelete={reply.isDelete}>
        <ReplyInfo {...replyInfoProps} />
        <ReplyContent {...replyContentProps} />
      </ReplyWrapper>
    )
  );
};

export default Reply;
