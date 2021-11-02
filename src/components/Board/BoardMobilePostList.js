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
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

const NoticeSpan = styled.span`
  background: #1976d2;
  color: #fff;
  font-size: 0.75rem;
  padding: 0 5px;
  border-radius: 10px;
`;

const ReplyCountNumber = styled.span`
  color: #808080;
  font-size: 0.75rem;
`;

const ListCard = styled(Card)`
  border-radius: 0;
`;

const ListStyled = styled(List)`
  padding: 0;
`;

const ListItemStyled = styled(ListItem)`
  padding: 0 8px;
  background-color: ${props =>
    props.isNotice === 'NOTICE' ? '#e0e0e0' : '#ffffff'};
`;

const ListItemTextStyled = styled(ListItemText)`
  & .MuiListItemText-primary {
    font-size: 0.875rem;
    ${({ theme }) => theme.common.textEllipsis}
  }
  & .MuiListItemText-secondary {
    font-size: 0.75rem;
  }
`;

const ListSubItem = styled.span`
  line-height: 1.75;
`;

const ListNicknameItem = styled(ListSubItem)`
  padding-right: 3px;
  color: #000000;
`;

const ListUserIconItem = styled(ListSubItem)`
  padding-right: 3px;
`;

const ListPostInfoItem = styled(ListSubItem)`
  padding-left: 3px;
  padding-right: 3px;
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
    accountIdString,
    isNotice
  } = postInfo;

  const handleLink = () => handlePostLink(postId, isSecret);

  return (
    <PostLink to={handleLink}>
      <ListItemStyled isNotice={isNotice}>
        <ListItemTextStyled
          primary={
            <>
              {isNotice === 'NOTICE' ? <NoticeSpan>공지</NoticeSpan> : null}
              {` ${title}`}
              {numReply ? (
                <ReplyCountNumber> {`[${numReply}]`}</ReplyCountNumber>
              ) : null}
            </>
          }
          secondary={
            <>
              <ListUserIconItem>
                {accountIdString ? (
                  <FontAwesomeIcon icon={faUserCircle} />
                ) : null}
              </ListUserIconItem>
              <ListNicknameItem>{nickname}</ListNicknameItem>
              <ListPostInfoItem>{getTimeForToday(createAt)}</ListPostInfoItem>
              <ListPostInfoItem>조회수 {views}</ListPostInfoItem>
            </>
          }
        />
      </ListItemStyled>
    </PostLink>
  );
};

const PostList = props => {
  const { postData, noticeData, handlePostLink } = props;
  return (
    <ListCard variant="outlined">
      <ListStyled>
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
      </ListStyled>
    </ListCard>
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
