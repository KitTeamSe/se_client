import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  CircularProgress,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper
} from '@mui/material';
import Tags from '../Post/Tags';
import NicknameContainer from '../../containers/Post/NicknameContainer';
import { getTimeForToday } from '../../utils/format';

const TableWrapper = styled(TableContainer)`
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    display: none;
  }
`;

const LoadingCircle = styled(CircularProgress)`
  position: absolute;
  bottom: 50vh;
`;

const NoBoardBox = styled.div`
  width: 100%;
  height: 100%;
  font-size: 2rem;
  text-align: center;
  margin: 96px 0 96px 0;
`;

const NoneBorderCell = styled(TableCell)`
  border: none;
  font-size: 0.75rem;
  padding: 6px 0;
  text-align: center;
`;

const PostNumberCell = styled(NoneBorderCell)`
  font-size: 0.6875rem;
`;

const PostTitleCell = styled(NoneBorderCell)`
  text-align: left;
`;

const PostWriterCell = styled(NoneBorderCell)``;

const PostDateCell = styled(NoneBorderCell)``;

const PostViewCell = styled(NoneBorderCell)`
  font-size: 0.6875rem;
`;

const IconMargin = styled.span`
  display: inline-block;
  margin: 2px;
`;

const InfoIcon = styled(FontAwesomeIcon)`
  margin: 1px;
  color: gray;
`;

const PostTableRow = styled(TableRow)`
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  background-color: #${props => (props.notice === 'NOTICE' ? 'eeeeee' : 'ffffff')};
`;

const ReplyCountNumber = styled.span`
  color: gray;
`;

const PostTitleLink = styled(Link)`
  display: inline-block;
  width: 100%;
  font-size: 0.75rem;
  vertical-align: middle;
  color: black;
  text-decoration: none;
  cursor: pointer;
  ${({ theme }) => theme.common.textEllipsis}
`;

/**
 * colgroup : 테이블의 컬럼(td 태그)에 적용할 스타일을 해당 태그에서 미리 적용
 * col : 열에 속성을 정의
 */
const NumberCol = styled.col`
  width: 60px;
`;
const TitleCol = styled.col``;
const NicknameCol = styled.col`
  width: 140px;
`;
const DateCol = styled.col`
  width: 100px;
`;
const ViewsCountCol = styled.col`
  width: 60px;
`;

const ErrorBoard = props => {
  const { error } = props;
  return <NoBoardBox>{error.message}</NoBoardBox>;
};

const PostRow = props => {
  const { postInfo, handlePostLink } = props;
  const {
    postId,
    title,
    isSecret,
    nickname,
    numReply,
    views,
    tags,
    createAt,
    accountIdString,
    isNotice
  } = postInfo;

  const handleLink = () => handlePostLink(postId, isSecret);

  return (
    <PostTableRow key={`postId-notice-${postId}`} hover notice={isNotice}>
      <PostNumberCell>{isNotice === 'NOTICE' ? '공지' : postId}</PostNumberCell>
      <PostTitleCell>
        <PostTitleLink to={handleLink}>
          {title}
          {isSecret === 'SECRET' && (
            <IconMargin>
              <InfoIcon icon={faLock} />
            </IconMargin>
          )}
          {numReply ? (
            <ReplyCountNumber> {`[${numReply}]`}</ReplyCountNumber>
          ) : null}
          <Tags tags={tags} />
        </PostTitleLink>
      </PostTitleCell>
      <PostWriterCell>
        <NicknameContainer
          nickname={nickname}
          accountIdString={accountIdString}
        />
      </PostWriterCell>
      <PostDateCell>{`${getTimeForToday(createAt)}`}</PostDateCell>
      <PostViewCell>{views}</PostViewCell>
    </PostTableRow>
  );
};

const BoardPostList = props => {
  const {
    postData,
    postLoading,
    postError,
    noticeData,
    noticeLoading,
    noticeError,
    handlePostLink
  } = props;

  const tableColumns = [
    { key: 'postId', value: '번호' },
    { key: 'title', value: '제목' },
    { key: 'writer', value: '글쓴이' },
    { key: 'date', value: '작성일' },
    { key: 'view', value: '조회' }
  ];

  if (postError) {
    return <ErrorBoard error={postError} />;
  }

  if (noticeError) {
    return <ErrorBoard error={noticeError} />;
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
    <TableWrapper component={Paper}>
      <Table size="small">
        <colgroup>
          <NumberCol />
          <TitleCol />
          <NicknameCol />
          <DateCol />
          <ViewsCountCol />
        </colgroup>
        <TableHead>
          <TableRow>
            {tableColumns.map(e => (
              <NoneBorderCell nowrap="true" align="center" key={e.key}>
                {e.value}
              </NoneBorderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {noticeData.data.postListItem.content.map(postInfo => (
            <PostRow
              key={postInfo.postId}
              postInfo={postInfo}
              handlePostLink={handlePostLink}
            />
          ))}
          {postData.data.postListItem.content.map(postInfo => (
            <PostRow
              key={postInfo.postId}
              postInfo={postInfo}
              handlePostLink={handlePostLink}
            />
          ))}
        </TableBody>
      </Table>
    </TableWrapper>
  );
};

export default BoardPostList;
