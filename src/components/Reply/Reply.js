import React from 'react';
import styled from 'styled-components';

import { Avatar, Typography } from '@material-ui/core';
import {
  getEncodeHTML,
  getFormatDate,
  getFormatTime
} from '../../utils/format';
import ReplyDeleteContainer from '../../containers/Reply/ReplyDeleteContainer';
import ReplyAnonyDeleteContainer from '../../containers/Reply/ReplyAnonyDeleteContainer';
import ReplyChildAddContainer from '../../containers/Reply/ReplyChildAddContainer';
import SecretReplyContainer from '../../containers/Reply/SecretReplyContainer';
import EditorOutput from '../Editor/EditorOutput';
import ActionButton from './ReplyActionButton';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ReplyWrapper = styled.div`
  display: flex;
  padding: 10px 10px 20px 10px;
  border-bottom: 1px solid #e9e9e9;
  background: ${props => props.isDelete === 'DELETED' && '#eeeeee'};
  @media ${props => props.theme.mobile} {
    flex-direction: column;
  }
`;

const AvatarWrapper = styled.div`
  width: 40px;
  height: 40px;
  padding-right: 10px;
  @media ${props => props.theme.mobile} {
    width: 35px;
    height: 35px;
  }
`;

const AnonyAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  @media ${props => props.theme.mobile} {
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
  @media ${props => props.theme.mobile} {
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

const NickName = styled(AnonyNickName)`
  font-weight: 600;
  cursor: pointer;
`;

const DateWrapper = styled.div`
  @media ${props => props.theme.mobile} {
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
    if (isDelete === 'DELETED') return { __html: `❌ ${content}` };
    if (isSecret === 'SECRET') return { __html: `🔒 ${content}` };
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

export const ReplyInfo = props => {
  const { accountId, anonymousNickname, createAt } = props;

  return (
    <ReplyInfoWrapper>
      <AvatarWrapper>
        {accountId ? <UserAvatar /> : <AnonyAvatar />}
      </AvatarWrapper>
      <UserInfoWrapper>
        {accountId ? (
          <NickName>{`${accountId}`}</NickName>
        ) : (
          <AnonyNickName>{anonymousNickname}</AnonyNickName>
        )}
        <DateWrapper>
          <DateText>{getFormatDate(createAt)}</DateText>
          <TimeText>{getFormatTime(createAt)}</TimeText>
        </DateWrapper>
      </UserInfoWrapper>
    </ReplyInfoWrapper>
  );
};

export const ReplyContent = props => {
  const {
    parentId,
    parentIndex,
    replyId,
    replyIndex,
    accountId,
    anonymousNickname,
    content,
    isSecret,
    isDelete,
    handleAddReplyChild,
    onUpdate,
    replyReportHandle
  } = props;

  return (
    <ContentWrapper>
      <ReplyComment content={content} isDelete={isDelete} isSecret={isSecret} />
      {isDelete === 'NORMAL' && (
        <ReplyAction
          parentId={parentId}
          parentIndex={parentIndex}
          accountId={accountId}
          replyIndex={replyIndex}
          anonymousNickname={anonymousNickname}
          replyId={replyId}
          isSecret={isSecret}
          handleAddReplyChild={handleAddReplyChild}
          onUpdate={onUpdate}
          replyReportHandle={replyReportHandle}
        />
      )}
    </ContentWrapper>
  );
};

const Reply = props => {
  const {
    replyId,
    replyIndex,
    accountId,
    anonymousNickname,
    content,
    createAt,
    isSecret,
    isDelete,
    handleAddReplyChild,
    onUpdate,
    children,
    replyReportHandle
  } = props;

  return (
    <>
      {replyId && (
        <ReplyWrapper isDelete={isDelete}>
          <ReplyInfo
            accountId={accountId}
            anonymousNickname={anonymousNickname}
            createAt={createAt}
          />
          <ReplyContent
            replyId={replyId}
            replyIndex={replyIndex}
            accountId={accountId}
            anonymousNickname={anonymousNickname}
            content={content}
            createAt={createAt}
            isSecret={isSecret}
            isDelete={isDelete}
            handleAddReplyChild={handleAddReplyChild}
            onUpdate={onUpdate}
            replyReportHandle={replyReportHandle}
          />
        </ReplyWrapper>
      )}
      {children}
      {replyId ? <ReplyChildAddContainer parentId={replyId} /> : null}
    </>
  );
};

export default Reply;
