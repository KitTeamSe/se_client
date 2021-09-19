import React from 'react';
import styled from 'styled-components';
import { CircularProgress, Menu, MenuItem, TextField } from '@material-ui/core';
import {
  faLock,
  faEye,
  faFlag,
  faUser,
  faEllipsisH
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ConditionClassify, menuStorage } from '../../DataExport';
import ReplyListContainer from '../../containers/Reply/ReplyListContainer';
import EditorOutput from '../Editor/EditorOutput';
import Tags from './Tags';
import { getEncodeHTML } from '../../utils/format';

const LoadingCircle = styled(CircularProgress)`
  position: absolute;
  bottom: 50vh;
`;

const FormTextField = styled(TextField)`
  margin: 12px 32px 12px 32px;
  min-width: 256px;
`;

const MainWrapper = styled.div`
  margin: auto;
  margin-top: 3rem;
  width: 70vw;
  max-width: 100%;
  padding: 1.5rem;
  display: display;
  align-items: center;
  background-color: #ffffff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  @media ${props => props.theme.mobile} {
    width: calc(100vw - 1rem);
    margin-top: 1rem;
    padding: 0;
  }
`;

const NoBoardBox = styled.div`
  width: 100%;
  height: 100%;
  font-size: 2rem;
  text-align: center;
  margin-top: 196px;
`;

const PostHead = styled.div`
  padding: 1rem 0.5rem;
`;

const PostHeadTitle = styled.div`
  width: 100%;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const PostHeadInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PostHeadInfoComponent = styled.span`
  margin: 0px 0.3rem;
`;

const WriterIcon = styled.span`
  margin: 0px 0.3rem;
  cursor: pointer;
`;

const AnonymousIcon = styled.span`
  margin: 0px 0.3rem;
`;

const PostText = styled.div`
  padding: 3rem 0.6em;
  font-size: 1rem;
  border-top: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
`;

const Icon = styled(FontAwesomeIcon)`
  margin: 1px;
  color: gray;
  margin: 2px;
`;

const MoreButton = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

const FormField = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const SubmitButton = styled.button`
  border-radius: 24px;
  font-size: 16px;
  padding: 0.5rem 3rem;
  margin: 2rem;
  background-image: linear-gradient(to right, #00d2ff 0%, #3a7bd5 100%);
  color: white;
  border: none;
  cursor: pointer;
  transition: 0.5s;
  font-weight: 400;
  &:hover {
    background-position: right;
    transition: 0.5s;
  }
`;

const PostHeaderInfo = props => {
  const {
    menuClick,
    nickname,
    writerEl,
    functionExcute,
    writeTime,
    views,
    isNotice,
    isSecret,
    moremenuEl,
    userId,
    accountIdString
  } = props;

  function conditionMaker() {
    if (!userId && !accountIdString) {
      return 'LogoutAnonymous';
    }
    if (!userId && accountIdString) {
      return 'LogoutNotAnonymous';
    }
    if (userId && !accountIdString) {
      return 'LoginAnnoymous';
    }
    if (userId && userId === accountIdString) {
      return 'LoginMy';
    }
    if (userId && userId !== accountIdString) {
      return 'LoginNotmy';
    }
    return 'LogoutAnonymous';
  }

  function menuItem(type) {
    const condition = conditionMaker();

    return (
      <div>
        {ConditionClassify[condition][type].map(content => (
          <MenuItem id={content} onClick={functionExcute} key={content}>
            {menuStorage[content]}
          </MenuItem>
        ))}
      </div>
    );
  }

  return (
    <>
      <PostHeadInfo>
        <PostHeadInfoComponent>
          {accountIdString ? (
            <WriterIcon onClick={menuClick} id="writer">
              <Icon icon={faUser} />
              {nickname}
            </WriterIcon>
          ) : (
            <AnonymousIcon id="writer">
              <Icon icon={faUser} />
              {nickname}
            </AnonymousIcon>
          )}
          <Menu
            anchorEl={writerEl}
            keepMounted
            open={Boolean(writerEl)}
            onClose={menuClick}
            style={{ marginLeft: '4rem' }}
          >
            {menuItem('writer')}
          </Menu>
          <PostHeadInfoComponent>{writeTime}</PostHeadInfoComponent>
          <PostHeadInfoComponent>
            <Icon icon={faEye} />
            {views}
          </PostHeadInfoComponent>
          {isNotice === 'NORMAL' ? (
            <></>
          ) : (
            <PostHeadInfoComponent>
              <Icon icon={faFlag} />
            </PostHeadInfoComponent>
          )}
          {isSecret === 'NORMAL' ? (
            <></>
          ) : (
            <PostHeadInfoComponent>
              <Icon icon={faLock} />
            </PostHeadInfoComponent>
          )}
        </PostHeadInfoComponent>
        <PostHeadInfoComponent>
          <MoreButton
            icon={faEllipsisH}
            size="lg"
            onClick={menuClick}
            id="more"
          />
          <Menu
            anchorEl={moremenuEl}
            keepMounted
            open={Boolean(moremenuEl)}
            onClose={menuClick}
            style={{ marginLeft: '1.75rem' }}
          >
            {menuItem('menu')}
          </Menu>
        </PostHeadInfoComponent>
      </PostHeadInfo>
    </>
  );
};

const PostHeader = props => {
  const { res, moremenuEl, writerEl, menuClick, functionExcute, userId } =
    props;
  const {
    createdAt,
    isNotice,
    isSecret,
    nickname,
    tags,
    views,
    postContent,
    accountIdString
  } = res;
  const writeTime = `${createdAt[0]}년${createdAt[1]}월${createdAt[2]}일 ${createdAt[3]}:${createdAt[4]}`;
  return (
    <PostHead>
      <PostHeadTitle>
        {postContent.title}
        <Tags tags={tags} />
      </PostHeadTitle>
      <PostHeaderInfo
        userId={userId}
        accountIdString={accountIdString}
        writeTime={writeTime}
        isNotice={isNotice}
        isSecret={isSecret}
        nickname={nickname}
        views={views}
        moremenuEl={moremenuEl}
        writerEl={writerEl}
        menuClick={menuClick}
        functionExcute={functionExcute}
      />
    </PostHead>
  );
};

const PostMain = props => {
  const { res } = props;
  const { postContent } = res;
  const handleContent = () => {
    return { __html: getEncodeHTML(postContent.text) };
  };
  return (
    <PostText>
      <EditorOutput content={handleContent()} />
    </PostText>
  );
};

const SecretPostPassword = props => {
  const { password, PasswordSubmit, onChange } = props;

  return (
    <MainWrapper>
      <FormField onSubmit={PasswordSubmit}>
        <FormTextField
          autoFocus
          id="nowPassword"
          label="비밀번호를 입력하세요"
          type="password"
          onChange={onChange}
          value={password}
        />
        <SubmitButton type="submit" onClick={PasswordSubmit} color="primary">
          확인
        </SubmitButton>
      </FormField>
    </MainWrapper>
  );
};

const Post = props => {
  const {
    data,
    loading,
    error,
    moremenuEl,
    writerEl,
    menuClick,
    functionExcute,
    secretPost,
    onChange,
    password,
    PasswordSubmit,
    userId,
    postDeleteData,
    postDeleteLoading,
    postDeleteError,
    replyReportHandle
  } = props;

  if (error) {
    return <NoBoardBox>{error.message} 😅</NoBoardBox>;
  }

  if (postDeleteError) {
    return <NoBoardBox>{postDeleteError.message} 😅</NoBoardBox>;
  }

  if (postDeleteData) {
    return <NoBoardBox>{postDeleteData.message} 😋</NoBoardBox>;
  }

  if (secretPost && data == null) {
    return (
      <SecretPostPassword
        password={password}
        PasswordSubmit={PasswordSubmit}
        onChange={onChange}
      />
    );
  }
  if (data === null || loading || postDeleteLoading) {
    return <LoadingCircle />;
  }

  const res = data.data;

  return (
    <MainWrapper>
      <PostHeader
        res={res}
        moremenuEl={moremenuEl}
        writerEl={writerEl}
        menuClick={menuClick}
        functionExcute={functionExcute}
        userId={userId}
      />
      <PostMain res={res} />
      <ReplyListContainer replyReportHandle={replyReportHandle} />
    </MainWrapper>
  );
};

export default Post;
