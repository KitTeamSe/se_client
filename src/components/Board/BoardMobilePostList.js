import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Card, List, ListItem, ListItemText, Divider } from '@mui/material';
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

const PostLink = styled(Link)`
  text-overflow: ellipsis;
  text-decoration: none;
  font-size: 0.75rem;
  color: black;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: baseline;
`;

const NoticeSpan = styled.span`
  background: #1976d2;
  color: #fff;
  font-size: 0.75rem;
  padding: 0 5px;
  margin-right: 0.375rem;
  border-radius: 10px;
`;

const TitleSpan = styled.span`
  margin-right: 0.25rem;
  ${({ theme }) => theme.common.textEllipsis}
`;

const ReplyCountNumber = styled.span`
  color: #808080;
  font-size: 0.75rem;
`;

const ListCard = styled(Card)`
  border-radius: 0;
  border-top: none;
`;

const ListStyled = styled(List)`
  padding: 0;
`;

const ListItemStyled = styled(ListItem)`
  padding: 0 8px;
  background-color: ${props =>
    props.notice === 'NOTICE' ? '#f2f2f2' : '#ffffff'};
`;

const ListItemTextStyled = styled(ListItemText)`
  & .MuiListItemText-primary {
    font-size: 0.875rem;
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

const PostListItem = props => {
  const { postInfo, handlePostLink } = props;
  const {
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

  const handleLink = () => handlePostLink(postInfo.postId, isSecret);

  return (
    <>
      <Divider />
      <PostLink to={handleLink}>
        <ListItemStyled notice={isNotice}>
          <ListItemTextStyled
            primary={
              <TitleWrapper>
                {isNotice === 'NOTICE' ? <NoticeSpan>공지</NoticeSpan> : null}
                <TitleSpan>{` ${title}`}</TitleSpan>
                {numReply ? (
                  <ReplyCountNumber> {`[${numReply}]`}</ReplyCountNumber>
                ) : null}
              </TitleWrapper>
            }
            secondary={
              <>
                {accountIdString ? (
                  <ListUserIconItem>
                    <FontAwesomeIcon icon={faUserCircle} />
                  </ListUserIconItem>
                ) : null}
                <ListNicknameItem>{nickname}</ListNicknameItem>
                <ListPostInfoItem>{getTimeForToday(createAt)}</ListPostInfoItem>
                <ListPostInfoItem>조회수 {views}</ListPostInfoItem>
              </>
            }
          />
        </ListItemStyled>
      </PostLink>
    </>
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

  if (postError || noticeError) return null;

  return (
    <PostListWrapper>
      <ListCard variant="outlined">
        <ListStyled>
          {!noticeLoading && noticeData
            ? noticeData.data.postListItem.content.map(postInfo => (
                <PostListItem
                  key={postInfo.postId}
                  postInfo={postInfo}
                  handlePostLink={handlePostLink}
                />
              ))
            : null}
        </ListStyled>
        <ListStyled>
          {!postLoading && postData
            ? postData.data.postListItem.content.map(postInfo => (
                <PostListItem
                  key={postInfo.postId}
                  postInfo={postInfo}
                  handlePostLink={handlePostLink}
                />
              ))
            : null}
        </ListStyled>
      </ListCard>
    </PostListWrapper>
  );
};

export default BoardMobilePostList;
