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

const BoardTitle = styled.div`
  padding: 24px;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: left;
  width: 70rem;
`;

const MainWrapper = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70rem;
`;

const NoneBorderCell = styled(TableCell)`
  border: none;
`;

const TableHeader = styled(TableRow)`
  height: 28px;
  background-image: linear-gradient(to right, #fff 0%, #eee 100%);
`;

const IconMargin = styled.span`
  display: inline-block;
  margin: 2px;
`;

const InfoBox = styled.div`
  font-size: 0.75rem;
  width: 128px;
  display: inline-block;
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
  console.log(postList);
  const tableColumns = ['번호', '제목', '닉네임', '정보'];
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableHeader>
            {tableColumns.map(column => (
              <TableCell align="center" key={column}>
                {column}
              </TableCell>
            ))}
          </TableHeader>
        </TableHead>
        <TableBody>
          {postList.map(postInfo => (
            <PostTitle key={postInfo.postId} postInfo={postInfo} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Board = props => {
  const { totalPage, page, onChange, postList } = props;

  return (
    <MainWrapper>
      <BoardTitle>Free Board 입니다</BoardTitle>
      <MainTable postList={postList} />
      <Pagination totalPage={totalPage} page={page} onChange={onChange} />
    </MainWrapper>
  );
};

export default Board;
