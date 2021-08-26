import React from 'react';
import styled from 'styled-components';

import { Avatar as AnonyAvatar, Typography } from '@material-ui/core';
import { getFormatDate, getFormatTime } from '../../utils/format';

const AvatarDiameter = `40px`;

const Comment = styled.div`
  padding: 0 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 180px);
`;
const ReplyWrapper = styled.div`
  display: flex;
  padding: 10px 0 20px 10px;
  border-bottom: 1px solid #e9e9e9;
`;

const ChildWrapper = styled(ReplyWrapper)`
  padding-left: 30px;
`;

const AvatarWrapper = styled.div`
  width: ${AvatarDiameter};
  height: ${AvatarDiameter};
  margin-right: 10px;
`;

const UserAvatar = styled(AnonyAvatar)`
  background: #ff518f;
`;

const InfoWrapper = styled.div`
  width: 130px;
`;

const CommentWrapper = styled.div`
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
  font-weight: 400;
`;

const NickName = styled(AnonyNickName)`
  font-weight: 500;
  cursor: pointer;
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
    <>
      <AvatarWrapper>
        {accountId ? <UserAvatar /> : <AnonyAvatar />}
      </AvatarWrapper>
      <InfoWrapper>
        {accountId ? (
          <NickName>{accountId}</NickName>
        ) : (
          <AnonyNickName>{anonymousNickname}</AnonyNickName>
        )}

        <DateText>{getFormatDate(createAt)}</DateText>
        <TimeText>{getFormatTime(createAt)}</TimeText>
      </InfoWrapper>
    </>
  );
};

const ReplyComment = props => {
  const { content } = props;
  return (
    <CommentWrapper>
      <Comment
        className="ck-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </CommentWrapper>
  );
};

const ReplyAction = props => {
  const { accountId, anonymousNickname, replyId } = props;
  return (
    <ActionWrapper>
      <ActionButton onClick={() => console.log(replyId)}>댓글</ActionButton>
      {localStorage.getItem('token') &&
      localStorage.getItem('userId') &&
      accountId === localStorage.getItem('userId') ? (
        <>
          <ActionButton onClick={() => console.log(replyId)}>수정</ActionButton>
          <ActionButton onClick={() => console.log(replyId)}>삭제</ActionButton>
        </>
      ) : null}
      {!localStorage.getItem('token') &&
      !localStorage.getItem('userId') &&
      anonymousNickname ? (
        <>
          <ActionButton onClick={() => console.log(replyId)}>수정</ActionButton>
          <ActionButton onClick={() => console.log(replyId)}>삭제</ActionButton>
        </>
      ) : null}
    </ActionWrapper>
  );
};

const ReplyContents = props => {
  const { replyId, accountId, anonymousNickname, content, createAt } = props;

  return (
    <>
      <ReplyInfo
        accountId={accountId}
        anonymousNickname={anonymousNickname}
        createAt={createAt}
      />
      <Wrapper>
        <ReplyComment content={content} />
        <ReplyAction
          accountId={accountId}
          anonymousNickname={anonymousNickname}
          replyId={replyId}
        />
      </Wrapper>
    </>
  );
};

const ChildReply = props => {
  const { replyId, accountId, anonymousNickname, content, createAt } = props;
  return (
    <ChildWrapper id={replyId}>
      <ReplyContents
        replyId={replyId}
        accountId={accountId}
        anonymousNickname={anonymousNickname}
        content={content}
        createAt={createAt}
      />
    </ChildWrapper>
  );
};

const Reply = props => {
  const { replyId, accountId, anonymousNickname, content, createAt, child } =
    props;
  return (
    <>
      <ReplyWrapper id={replyId}>
        <ReplyContents
          replyId={replyId}
          accountId={accountId}
          anonymousNickname={anonymousNickname}
          content={content}
          createAt={createAt}
        />
      </ReplyWrapper>
      {child && child.length
        ? child.map(e => (
            <ChildReply
              replyId={e.replyId}
              accountId={e.accountId}
              anonymousNickname={e.anonymousNickname}
              content={e.text}
              createAt={e.createAt}
            />
          ))
        : null}
    </>
  );
};

export default Reply;
