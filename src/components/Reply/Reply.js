import React from 'react';
import styled from 'styled-components';

import { Avatar, Typography } from '@material-ui/core';
import { getFormatDate, getFormatTime } from '../../utils/format';
import ReplyDeleteContainer from '../../containers/Reply/ReplyDeleteContainer';
import ReplyAnonyDeleteContainer from '../../containers/Reply/ReplyAnonyDeleteContainer';
import ReplyChildAddContainer from '../../containers/Reply/ReplyChildAddContainer';
import SecretReplyContainer from '../../containers/Reply/SecretReplyContainer';

const Comment = styled.div`
  font-size: 0.875rem;
  width: 100%;
  @media ${props => props.theme.mobile} {
    font-size: 1rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ReplyWrapper = styled.div`
  display: flex;
  padding: 10px 0 20px 10px;
  border-bottom: 1px solid #e9e9e9;
  background: ${props => props.isDelete === 'DELETED' && '#eeeeee'};
  @media ${props => props.theme.mobile} {
    flex-direction: column;
  }
`;

const ChildWrapper = styled(ReplyWrapper)`
  padding-left: 30px;
  @media ${props => props.theme.mobile} {
    padding-left: 20px;
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

const InfoWrapper = styled.div`
  display: flex;
  width: 180px;
  min-width: 180px;
  @media ${props => props.theme.mobile} {
    width: 180px;
    min-width: 130px;
  }
`;

const ReplyInfoWrapper = styled.div`
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

const ButtonStyled = styled.button`
  padding: 0;
  margin-right: 10px;
  color: #999999;
  background: none;
  font-size: 0.8125rem;
  border: none;
  border-radius: 0;
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    color: #666666;
  }
`;

const ActionButton = props => {
  const { children, onClick } = props;

  return <ButtonStyled onClick={onClick}>{children}</ButtonStyled>;
};

const ReplyInfo = props => {
  const { accountId, anonymousNickname, createAt } = props;

  return (
    <InfoWrapper>
      <AvatarWrapper>
        {accountId ? <UserAvatar /> : <AnonyAvatar />}
      </AvatarWrapper>
      <ReplyInfoWrapper>
        {accountId ? (
          <NickName>{`${accountId}`}</NickName>
        ) : (
          <AnonyNickName>{anonymousNickname}</AnonyNickName>
        )}
        <DateWrapper>
          <DateText>{getFormatDate(createAt)}</DateText>
          <TimeText>{getFormatTime(createAt)}</TimeText>
        </DateWrapper>
      </ReplyInfoWrapper>
    </InfoWrapper>
  );
};

const ReplyComment = props => {
  const { content, isDelete, isSecret } = props;
  const handleContent = () => {
    if (isDelete === 'DELETED') return { __html: `❌ ${content}` };
    if (isSecret === 'SECRET') return { __html: `🔒 ${content}` };
    return { __html: content };
  };

  return (
    <CommentWrapper>
      <Comment
        className="ck-content"
        dangerouslySetInnerHTML={handleContent()}
      />
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
    handleAddReplyChild
  } = props;

  return (
    <ActionWrapper>
      {isSecret === 'SECRET' && (
        <SecretReplyContainer
          replyId={replyId}
          parentIndex={parentIndex}
          replyIndex={replyIndex}
        />
      )}
      <ActionButton
        onClick={() =>
          parentId
            ? handleAddReplyChild(parentId)
            : handleAddReplyChild(replyId)
        }
      >
        댓글
      </ActionButton>
      {localStorage.getItem('token') &&
      localStorage.getItem('userId') &&
      accountId ? (
        <>
          <ActionButton onClick={() => console.log(replyId)}>수정</ActionButton>
          <ReplyDeleteContainer replyId={replyId} />
        </>
      ) : null}
      {anonymousNickname ? (
        <>
          <ActionButton onClick={() => console.log(replyId)}>수정</ActionButton>
          <ReplyAnonyDeleteContainer replyId={replyId} />
        </>
      ) : null}
    </ActionWrapper>
  );
};

const ReplyContents = props => {
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
    <>
      <ReplyInfo
        accountId={accountId}
        anonymousNickname={anonymousNickname}
        createAt={createAt}
      />
      <Wrapper>
        <ReplyComment
          content={content}
          isDelete={isDelete}
          isSecret={isSecret}
        />
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
          />
        )}
      </Wrapper>
    </>
  );
};

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
      <ReplyContents
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

const Reply = props => {
  const {
    replyId,
    replyIndex,
    accountId,
    anonymousNickname,
    content,
    createAt,
    child,
    isSecret,
    isDelete,
    handleAddReplyChild
  } = props;

  return (
    <>
      {replyId && (
        <ReplyWrapper isDelete={isDelete}>
          <ReplyContents
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
        </ReplyWrapper>
      )}

      {child && child.length
        ? child.map((e, index) => (
            <ChildReply
              parentId={replyId}
              parentIndex={replyIndex}
              replyId={e.replyId}
              replyIndex={index}
              accountId={e.accountId}
              anonymousNickname={e.anonymousNickname}
              content={e.text}
              createAt={e.createAt}
              isSecret={e.isSecret}
              isDelete={e.isDelete}
              handleAddReplyChild={handleAddReplyChild}
            />
          ))
        : null}
      {replyId && <ReplyChildAddContainer parentId={replyId} />}
    </>
  );
};

export default Reply;
