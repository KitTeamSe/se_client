import React from 'react';
import styled from 'styled-components';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper
} from '@material-ui/core';
import { Pagination as Paginations } from '@material-ui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faCommentAlt, faLock } from '@fortawesome/free-solid-svg-icons';

const NoneBorderCell = styled(TableCell)`
  border: none;
`;

const IconMargin = styled.span`
  display: inline-block;
  margin: 2px;
`;

const InfoBox = styled.div`
  font-size: 0.75rem;
  width: 128px;
`;

const NickName = styled.span`
  font-weight: 500;
  width: 128px;
  font-size: 1rem;
`;

const InfoIcon = styled(FontAwesomeIcon)`
  margin: 1px;
  color: gray;
`;

const PaginationStyled = styled(Paginations)`
  & ul {
    justify-content: center;
    padding: 10px;
  }
`;

const PostContent = styled(TableRow)`
  height: 48px;
  align-items: center;
  text-align: center;
`;

const PostNumber = styled.span`
  width: 8px;
  height: 12px;
  background-color: #ccc;
  padding: 2px 6px;
  border-radius: 50%;
  font-size: 0.8rem;
`;

const Title = styled.a`
  display: inline-block;
  width: 640px;
  font-size: 1rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border: none;
`;

const NoContent = styled(TableCell)`
  font-size: 2rem;
  margin: 12px;
  text-align: center;
  height: 96px;
  vertical-align: center;
`;

const Pagination = props => {
  const { totalPage, page, onChange } = props;
  return (
    <PaginationStyled
      component="div"
      count={totalPage}
      page={parseInt(page, 10)}
      onChange={onChange}
      showFirstButton
      showLastButton
    />
  );
};

const PostTitle = props => {
  const { postInfo } = props;
  const { createAt } = postInfo;
  const writeTime = `${createAt[0]}년${createAt[1]}월${createAt[2]}일 ${createAt[3]}:${createAt[4]}`;
  console.log(postInfo);

  return (
    <PostContent>
      <NoneBorderCell align="center">
        <PostNumber>{postInfo.postId}</PostNumber>
      </NoneBorderCell>
      <NoneBorderCell>
        <Title>{postInfo.title}</Title>
      </NoneBorderCell>
      <NoneBorderCell align="center">
        <NickName>{postInfo.nickname}</NickName>
      </NoneBorderCell>
      <NoneBorderCell align="center">
        <InfoBox>
          <div>
            <IconMargin>{writeTime}</IconMargin>
            {postInfo.isSecret === 'NORMAL' ? (
              <></>
            ) : (
              <span>
                <InfoIcon icon={faLock} />
              </span>
            )}
          </div>
          <div>
            <IconMargin>
              <InfoIcon icon={faCommentAlt} />
              {postInfo.numReply}
            </IconMargin>
            <IconMargin>
              <InfoIcon icon={faEye} />
              {postInfo.views}
            </IconMargin>
          </div>
        </InfoBox>
      </NoneBorderCell>
    </PostContent>
  );
};

const MainTable = props => {
  const { postList } = props;
  const tableColumns = ['번호', '제목', '닉네임', '정보'];

  return (
    <TableContainer component={Paper}>
      {postList.length === 0 ? (
        <NoContent>게시글이 없으면 뭔가 보여줌</NoContent>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              {tableColumns.map(column => (
                <TableCell align="center" key={column}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {postList.map(postInfo => (
              <PostTitle key={postInfo.postId} postInfo={postInfo} />
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

const Board = props => {
  const { totalPage, page, onChange, postList } = props;

  return (
    <>
      <MainTable postList={postList} />
      <Pagination totalPage={totalPage} page={page} onChange={onChange} />
    </>
  );
};

export default Board;
