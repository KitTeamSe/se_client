import React from 'react';
import styled from 'styled-components';

import { Avatar, Typography } from '@material-ui/core';
import { getFormatDate, getFormatTime } from '../../utils/format';
import ReplyDeleteContainer from '../../containers/Reply/ReplyDeleteContainer';
import ReplyAnonyDeleteContainer from '../../containers/Reply/ReplyAnonyDeleteContainer';
import ReplyChildAddContainer from '../../containers/Reply/ReplyChildAddContainer';

const Comment = styled.div`
  font-size: 0.875rem;
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
  margin-right: 10px;
  @media ${props => props.theme.mobile} {
    width: 30px;
    height: 30px;
    margin-right: 5px;
  }
`;

const AnonyAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  @media ${props => props.theme.mobile} {
    width: 30px;
    height: 30px;
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
  margin: 0 10px 10px 10px;
  @media ${props => props.theme.mobile} {
    margin: 0 0 10px 0;
  }
`;

const ActionWrapper = styled(CommentWrapper)`
  display: flex;
  justify-content: flex-end;
`;

const AnonyNickName = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.875rem;
  font-weight: 400;
`;

const NickName = styled(AnonyNickName)`
  font-weight: 500;
  cursor: pointer;
  color: ${props =>
    props.children === localStorage.getItem('userId') && '#1976d2'};
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
          <NickName>{accountId}</NickName>
        ) : (
          <AnonyNickName>{anonymousNickname}</AnonyNickName>
        )}

        <DateText>{getFormatDate(createAt)}</DateText>
        <TimeText>{getFormatTime(createAt)}</TimeText>
      </ReplyInfoWrapper>
    </InfoWrapper>
  );
};

const ReplyComment = props => {
  const { content, isDelete, isSecret } = props;
  const handleContent = () => {
    if (isSecret === 'SECRET') return { __html: `🔒 ${content}` };
    if (isDelete === 'DELETED') return { __html: `❌ ${content}` };
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
    accountId,
    anonymousNickname,
    replyId,
    isSecret,
    handleAddReplyChild
  } = props;

  return (
    <ActionWrapper>
      {isSecret === 'SECRET' && (
        <ActionButton onClick={() => console.log(replyId)}>
          비밀글확인
        </ActionButton>
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
    replyId,
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
            accountId={accountId}
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
    replyId,
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
        replyId={replyId}
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
        ? child.map(e => (
            <ChildReply
              parentId={replyId}
              replyId={e.replyId}
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
