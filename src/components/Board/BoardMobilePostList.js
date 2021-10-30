import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Card,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress
} from '@mui/material';
import { getTimeForToday } from '../../utils/format';

const PostListWrapper = styled.div`
  display: none;
  width: 100%;
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    display: block;
  }
`;

const NoBoardBox = styled.div`
  width: 100%;
  height: 100%;
  font-size: 2rem;
  text-align: center;
  margin: 96px 0 96px 0;
`;

const LoadingCircle = styled(CircularProgress)`
  position: absolute;
  bottom: 50vh;
`;

const PostLink = styled(Link)`
  text-overflow: ellipsis;
  text-decoration: none;
  font-size: 0.75rem;
  color: black;
`;

const ReplyCountNumber = styled.span`
  color: gray;
  font-size: 0.875rem;
`;

const ListSubItem = styled.span`
  padding-right: 5px;
`;

const ErrorBoard = props => {
  const { error } = props;
  return <NoBoardBox>{error.message}</NoBoardBox>;
};

const PostListItem = props => {
  const { postInfo, handlePostLink } = props;
  const {
    postId,
    title,
    isSecret,
    nickname,
    numReply,
    views,
    // tags,
    createAt,
    // accountIdString,
    isNotice
  } = postInfo;

  const handleLink = () => handlePostLink(postId, isSecret);

  return (
    <PostLink to={handleLink}>
      <ListItem>
        <ListItemText
          primary={
            <>
              {isNotice === 'NOTICE' ? '[공지]' : ''} {title}
              {numReply ? (
                <ReplyCountNumber> {`[${numReply}]`}</ReplyCountNumber>
              ) : null}
            </>
          }
          secondary={
            <>
              <ListSubItem>{nickname}</ListSubItem>
              <ListSubItem>{getTimeForToday(createAt)}</ListSubItem>
              <ListSubItem>조회수 {views}</ListSubItem>
            </>
          }
        />
      </ListItem>
    </PostLink>
  );
};

const PostList = props => {
  const { postData, noticeData, handlePostLink } = props;
  return (
    <Card variant="outlined">
      <List>
        {noticeData.data.postListItem.content.map((postInfo, idx) => (
          <>
            {idx !== 0 && <Divider />}
            <PostListItem
              key={postInfo.postId}
              postInfo={postInfo}
              handlePostLink={handlePostLink}
            />
          </>
        ))}
        {postData.data.postListItem.content.map(postInfo => (
          <>
            <Divider />
            <PostListItem
              key={postInfo.postId}
              postInfo={postInfo}
              handlePostLink={handlePostLink}
            />
          </>
        ))}
      </List>
    </Card>
  );
};

const BoardMobilePostList = props => {
  const {
    postData,
    postLoading,
    postError,
    noticeData,
    noticeLoading,
    noticeError,
    handlePostLink
  } = props;

  if (postError || noticeError) {
    return <ErrorBoard error={postError} />;
  }

  if (
    postData === null ||
    noticeData === null ||
    postLoading ||
    noticeLoading
  ) {
    return <LoadingCircle />;
  }

  return (
    <PostListWrapper>
      <PostList
        postData={postData}
        noticeData={noticeData}
        handlePostLink={handlePostLink}
      />
    </PostListWrapper>
  );
};

export default BoardMobilePostList;
