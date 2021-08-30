import React from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';
import { faLock, faEye, faFlag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { tagList } from '../../DataExport';

const LoadingCircle = styled(CircularProgress)`
  position: absolute;
  bottom: 50vh;
`;

const MainWrapper = styled.div`
  margin: auto;
  margin-top: 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70rem;
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
  height: 5rem;
  width: 100%;
  padding-bottom: 1rem;
  border-bottom: 1px solid #cccccc;
`;

const PostHeadTitle = styled.div`
  width: 100%;
  height: 3.5rem;
  font-size: 1.5rem;
`;

const PostHeadInfo = styled.div`
  display: flex;
`;

const TagIcon = styled.span`
  padding: 0px 8px;
  margin-left: 0.5rem;
  border-radius: 12px;
  font-size: 1rem;
  background-image: linear-gradient(
    to right,
    #${props => props.color1} 0%,
    #${props => props.color2} 100%
  );
`;

const PostText = styled.div`
  width: 100%;
  padding-top: 3rem;
  font-size: 1rem;
`;

const Icon = styled(FontAwesomeIcon)`
  margin: 1px;
  color: gray;
  margin: 2px;
`;

const PostHeaderInfo = styled.div`
  margin: 4px;
`;

const PostHeader = props => {
  const { res } = props;
  const {
    postId,
    boardId,
    accountType,
    createdAt,
    isNotice,
    isSecret,
    nickname,
    tags,
    views,
    postContent
  } = res;
  console.log(
    postId,
    boardId,
    accountType,
    isNotice,
    isSecret,
    nickname,
    views
  );
  const writeTime = `${createdAt[0]}년${createdAt[1]}월${createdAt[2]}일 ${createdAt[3]}:${createdAt[4]}`;

  return (
    <PostHead>
      <PostHeadTitle>
        {postContent.title}
        {tags.length === 0 ? (
          <></>
        ) : (
          tags.map(tag => (
            <TagIcon
              color1={tagList[tag.tagId].color1}
              color2={tagList[tag.tagId].color2}
              key={tag.tagId}
            >
              {tagList[tag.tagId].name}
            </TagIcon>
          ))
        )}
      </PostHeadTitle>
      <PostHeadInfo>
        <PostHeaderInfo>{nickname}</PostHeaderInfo>
        <PostHeaderInfo>{writeTime}</PostHeaderInfo>
        <PostHeaderInfo>
          <Icon icon={faEye} />
          {views}
        </PostHeaderInfo>
        {isNotice === 'NORMAL' ? (
          <></>
        ) : (
          <PostHeaderInfo>
            <Icon icon={faFlag} />
          </PostHeaderInfo>
        )}
        {isSecret === 'NORMAL' ? (
          <></>
        ) : (
          <PostHeadInfo>
            <Icon icon={faLock} />
          </PostHeadInfo>
        )}
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

const Post = props => {
  const { data, loading, error } = props;
  if (error) {
    return <NoBoardBox>{error.message} 😅</NoBoardBox>;
  }
  if (data === null || loading) {
    return <LoadingCircle />;
  }

  const res = data.data;
  console.log(res);

  return (
    <MainWrapper>
      <PostHeader res={res} />
      <PostMain res={res} />
    </MainWrapper>
  );
};

export default Post;
