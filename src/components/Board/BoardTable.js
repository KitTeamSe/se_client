import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
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

const NoneBorderCell = styled(TableCell)`
  border: none;
  font-size: 0.75rem;
  padding: 6px 10px;
  text-align: center;
`;

const NoneBorderTitleCell = styled(NoneBorderCell)`
  text-align: left;
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
  border-bottom: 1px solid #ddd;
  background-color: #${props => props.bgcolor};
`;

const ReplyCountNumber = styled.span`
  color: gray;
`;

const PostTitleLink = styled(Link)`
  display: inline-block;
  width: 100%;
  font-size: 0.75rem;
  text-overflow: ellipsis;
  vertical-align: middle;
  color: black;
  text-decoration: none;
  cursor: pointer;
`;

/**
 * colgroup : 테이블의 컬럼(td 태그)에 적용할 스타일을 해당 태그에서 미리 적용
 * col : 열에 속성을 정의
 */
const NumberCol = styled.col`
  width: 6%;
`;
const TitleCol = styled.col``;
const NicknameCol = styled.col`
  width: 14%;
  @media ${({ theme }) => theme.sizeQuery.tablet} {
    width: 19%;
  }
`;
const DateCol = styled.col`
  width: 8%;
`;
const ViewsCountCol = styled.col`
  width: 6%;
`;

const PostRow = props => {
  const { postInfo, boardNameEng, boardPage } = props;
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

  const backgroundColor = () => {
    if (isNotice === 'NOTICE') {
      return 'eeeeee';
    }
    return 'ffffff';
  };

  const handleTitleLink = () => {
    if (isSecret === 'NORMAL') {
      return `/board/${boardNameEng}/${postId}?page=${boardPage}`;
    }
    return `/board/${boardNameEng}/${postId}?secret=true&page=${boardPage}`;
  };

  return (
    <PostTableRow hover bgcolor={backgroundColor}>
      <NoneBorderCell nowrap="true">
        {isNotice === 'NOTICE' ? '공지' : postId}
      </NoneBorderCell>
      <NoneBorderTitleCell>
        <PostTitleLink to={handleTitleLink}>
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
      </NoneBorderTitleCell>
      <NoneBorderCell>
        <NicknameContainer
          nickname={nickname}
          accountIdString={accountIdString}
        />
      </NoneBorderCell>
      <NoneBorderCell>{`${getTimeForToday(createAt)}`}</NoneBorderCell>
      <NoneBorderCell>{views}</NoneBorderCell>
    </PostTableRow>
  );
};

const BoardTable = props => {
  const { res, boardNameEng, boardPage, notice } = props;
  const tableColumns = ['번호', '제목', '글쓴이', '작성일', '조회'];

  return (
    <TableContainer component={Paper}>
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
            {tableColumns.map(column => (
              <NoneBorderCell nowrap="true" align="center" key={column}>
                {column}
              </NoneBorderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {notice.postListItem.content.map(postInfo => (
            <PostRow
              key={postInfo.postId}
              postInfo={postInfo}
              boardNameEng={boardNameEng}
              boardPage={boardPage}
            />
          ))}
          {res.postListItem.content.map(postInfo => (
            <PostRow
              key={postInfo.postId}
              postInfo={postInfo}
              boardNameEng={boardNameEng}
              boardPage={boardPage}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BoardTable;
