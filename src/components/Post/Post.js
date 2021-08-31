import React from 'react';
import styled from 'styled-components';
import { CircularProgress, Menu, MenuItem } from '@material-ui/core';
import {
  faLock,
  faEye,
  faFlag,
  faUser,
  faEllipsisH
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { tagList } from '../../DataExport';

const LoadingCircle = styled(CircularProgress)`
  position: absolute;
  bottom: 50vh;
`;

const MainWrapper = styled.div`
  margin: auto;
  width: 100%;
  margin-top: 2rem;
  padding: 2rem;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const NoBoardBox = styled.div`
  width: 100%;
  height: 100%;
  font-size: 2rem;
  text-align: center;
  margin-top: 196px;
`;

const PostHead = styled.div`
  width: 100%;
  padding-bottom: 1rem;
`;

const PostHeadTitle = styled.div`
  width: 100%;
  font-size: 1.5rem;
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

const TagIcon = styled.span`
  padding: 0 0.3rem;
  margin-left: 0.5rem;
  border-radius: 12px;
  font-size: 1rem;
  background-image: linear-gradient(
    to right,
    #${props => props.color1} 0%,
    #${props => props.color2} 100%
  );
`;

const Tag = styled.span`
  display: inline-block;
`;

const PostText = styled.div`
  width: 100%;
  padding: 3rem 0px;
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

const ReplyDiv = styled.div`
  width: 100%;
  padding: 2rem 0;
  border-bottom: 1px solid #cccccc;
`;

const PostHeader = props => {
  const { res, moremenuEl, writerEl, menuClick, functionExcute } = props;
  const { createdAt, isNotice, isSecret, nickname, tags, views, postContent } =
    res;
  const writeTime = `${createdAt[0]}년${createdAt[1]}월${createdAt[2]}일 ${createdAt[3]}:${createdAt[4]}`;

  return (
    <PostHead>
      <PostHeadTitle>
        {postContent.title}
        {tags.length === 0 ? (
          <></>
        ) : (
          <Tag>
            {tags.map(tag => (
              <TagIcon
                color1={tagList[tag.tagId].color1}
                color2={tagList[tag.tagId].color2}
                key={tag.tagId}
              >
                {tagList[tag.tagId].name}
              </TagIcon>
            ))}
          </Tag>
        )}
      </PostHeadTitle>
      <PostHeadInfo>
        <div>
          <WriterIcon onClick={menuClick} id="writer">
            <Icon icon={faUser} />
            {nickname}
          </WriterIcon>
          <Menu
            anchorEl={writerEl}
            keepMounted
            open={Boolean(writerEl)}
            onClose={menuClick}
            style={{ marginLeft: '4rem' }}
          >
            <MenuItem id="message" onClick={functionExcute}>
              쪽지 보내기
            </MenuItem>
            <MenuItem id="profile" onClick={functionExcute}>
              회원정보 보기
            </MenuItem>
            <MenuItem id="mail" onClick={functionExcute}>
              메일 보내기
            </MenuItem>
            <MenuItem id="post" onClick={functionExcute}>
              작성 글 보기
            </MenuItem>
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
            <PostHeadInfo>
              <Icon icon={faLock} />
            </PostHeadInfo>
          )}
        </div>
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
            <MenuItem id="ban" onClick={functionExcute}>
              작성자 차단
            </MenuItem>
            <MenuItem id="report" onClick={functionExcute}>
              신고
            </MenuItem>
          </Menu>
        </PostHeadInfoComponent>
      </PostHeadInfo>
    </PostHead>
  );
};

const PostMain = props => {
  const { res } = props;
  const { postContent } = res;
  return (
    <PostText>
      <p>{postContent.text}</p>
    </PostText>
  );
};

const Reply = () => {
  return (
    <ReplyDiv>
      <div>댓글</div>
    </ReplyDiv>
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
    functionExcute
  } = props;
  if (error) {
    return <NoBoardBox>{error.message} 😅</NoBoardBox>;
  }
  if (data === null || loading) {
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
      />
      <PostMain res={res} />
      <Reply />
    </MainWrapper>
  );
};

export default Post;
