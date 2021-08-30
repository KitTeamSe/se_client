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
  margin-top: 2rem;
  padding: 2rem;
  flex-direction: column;
  align-items: center;
  width: 70vw;
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
  const { res, anchorEl, menuClick, modeChange } = props;
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
          <PostHeadInfoComponent>
            <Icon icon={faUser} />
            {nickname}
          </PostHeadInfoComponent>
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
          <MoreButton icon={faEllipsisH} size="lg" onClick={menuClick} />
          <Menu
            id="moreButton"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={menuClick}
            style={{ marginLeft: '36px' }}
          >
            <MenuItem id="ban" onClick={modeChange}>
              작성자 차단
            </MenuItem>
            <MenuItem id="report" onClick={modeChange}>
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
  const { data, loading, error, anchorEl, menuClick, modeChange } = props;
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
        anchorEl={anchorEl}
        menuClick={menuClick}
        modeChange={modeChange}
      />
      <PostMain res={res} />
      <Reply />
    </MainWrapper>
  );
};

export default Post;
