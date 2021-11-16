import React from 'react';
import styled from 'styled-components';
import { CircularProgress, Menu, MenuItem, TextField } from '@mui/material';
import {
  faLock,
  faEye,
  faFlag,
  faUser,
  faEllipsisH
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ConditionClassify, menuStorage } from '../../DataExport';
import EditorOutput from '../Editor/EditorOutput';
import Tags from './Tags';
import AttachDownloadList from '../Editor/AttachDownloadList';
import { getEncodeHTML } from '../../utils/format';

const PostWrapper = styled.div`
  width: 100%;
`;

const LoadingCircle = styled(CircularProgress)`
  position: absolute;
  bottom: 50vh;
`;

const FormTextField = styled(TextField)`
  margin: 12px 32px 12px 32px;
  min-width: 256px;
`;

const NoBoardBox = styled.div`
  width: 100%;
  height: 100%;
  font-size: 2rem;
  text-align: center;
  margin-top: 196px;
`;

const PostHeaderWrapper = styled.div`
  width: 100%;
`;

const PostHeadTitle = styled.div`
  font-size: 1.5rem;
  padding: 1rem;
  word-break: break-all;
  line-height: normal;
  display: flex;
  flex-direction: column;
`;

const PostHeadInfo = styled.div`
  display: flex;
  padding: 0 1rem 0.5rem 1rem;
  align-items: center;
  justify-content: space-between;
`;

const WriteTimeSpan = styled.span`
  margin-right: 0.5rem;
  font-size: 0.875rem;
  color: #464646;
`;

const ViewerSpan = styled.span`
  margin-right: 0.5rem;
  font-size: 0.875rem;
  color: #464646;
`;

const PostHeadInfoComponent = styled.span`
  margin-right: 0.5rem;
  font-size: 0.875rem;
`;

const WriterIcon = styled.span`
  margin-right: 0.5rem;
  cursor: pointer;
`;

const AnonymousIcon = styled.span`
  margin-right: 0.3rem;
`;

const EditorOutputWrapper = styled.div`
  width: 100%;
  padding-top: 1rem;
  font-size: 1rem;
  border-top: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 0.3rem;
  color: gray;
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
          <MenuItem
            id={content}
            onClick={e => {
              functionExcute(accountIdString, e);
            }}
            key={content}
          >
            {menuStorage[content]}
          </MenuItem>
        ))}
      </div>
    );
  }

  return (
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
        >
          {menuItem('writer')}
        </Menu>
        <WriteTimeSpan>{writeTime}</WriteTimeSpan>
        <ViewerSpan>
          <Icon icon={faEye} />
          조회수 : {views}
        </ViewerSpan>
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
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          {menuItem('menu')}
        </Menu>
      </PostHeadInfoComponent>
    </PostHeadInfo>
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
    <PostHeaderWrapper>
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
    </PostHeaderWrapper>
  );
};

const PostMain = props => {
  const { res } = props;
  const { postContent } = res;
  const handleContent = () => {
    return { __html: getEncodeHTML(postContent.text) };
  };
  return (
    <EditorOutputWrapper>
      <EditorOutput content={handleContent()} />
    </EditorOutputWrapper>
  );
};

const SecretPostPassword = props => {
  const { password, PasswordSubmit, onChange } = props;

  return (
    <>
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
    </>
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
    postDeleteError
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
    <PostWrapper>
      <PostHeader
        res={res}
        moremenuEl={moremenuEl}
        writerEl={writerEl}
        menuClick={menuClick}
        functionExcute={functionExcute}
        userId={userId}
      />
      <PostMain res={res} />
      <AttachDownloadList attachList={res.attaches} />
    </PostWrapper>
  );
};

export default Post;
