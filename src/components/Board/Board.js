import React from 'react';
import styled from 'styled-components';
import { faEye, faCommentAlt, faLock } from '@fortawesome/free-solid-svg-icons';
import {
  CircularProgress,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TextField,
  Select,
  MenuItem
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { postSearchTypeList } from '../../DataExport';

const LoadingCircle = styled(CircularProgress)`
  position: absolute;
  bottom: 50vh;
`;

const BoardTitle = styled.div`
  padding: 24px;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: left;
  width: auto;
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
  font-size: 0.85rem;
`;

const InfoIcon = styled(FontAwesomeIcon)`
  margin: 1px;
  color: gray;
`;

const PostContent = styled(TableRow)`
  height: 36px;
  border-bottom: 1px solid #ddd;
`;

const PostNumber = styled.span`
  width: 8px;
  height: 12px;
  font-size: 0.8rem;
`;

const Title = styled.a`
  display: inline-block;
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
  margin-right: 8px;
  color: black;
  text-decoration: none;
  cursor: pointer;
  padding: 0.5rem;
`;

const NoBoardBox = styled.div`
  width: 100%;
  height: 100%;
  font-size: 2rem;
  text-align: center;
  margin-top: 196px;
`;

const SearchBar = styled.form`
  width: 196px;
  padding: 4px;
  margin: 8px;
  align-items: center;
`;

const BoardHead = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const FormSelectField = styled(Select)`
  margin-right: 2px;
  width: auto;
  height: 2rem;
`;

const BoardHeadRight = styled.div`
  display: flex;
  align-items: center;
`;

const Paginations = props => {
  const { res, onChange } = props;
  const totalPage = res.postListItem.totalPages;
  const page = Number(res.postListItem.number) + 1;
  return (
    <Pagination
      component="div"
      count={totalPage}
      page={page}
      onChange={onChange}
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
        <Title href={`post/${postInfo.postId}`}>{postInfo.title}</Title>
        <IconMargin>
          {postInfo.isSecret === 'NORMAL' ? <></> : <InfoIcon icon={faLock} />}
        </IconMargin>
      </NoneBorderCell>
      <NoneBorderCell align="center">
        <NickName>{postInfo.nickname}</NickName>
      </NoneBorderCell>
      <NoneBorderCell align="center">
        <InfoBox>
          <IconMargin>{writeTime}</IconMargin>
          <IconMargin>
            <InfoIcon icon={faCommentAlt} />
            {postInfo.numReply}
          </IconMargin>
          <IconMargin>
            <InfoIcon icon={faEye} />
            {postInfo.views}
          </IconMargin>
        </InfoBox>
      </NoneBorderCell>
    </PostContent>
  );
};

const NoBoard = () => {
  return <NoBoardBox>게시판이 아직 만들어지지 않았어요 😅</NoBoardBox>;
};

const MainTable = props => {
  const { res } = props;
  const tableColumns = ['번호', '제목', '닉네임', '정보'];
  const noPost = {
    nickname: '시스템',
    boardId: 0,
    postId: 0,
    isNotice: 'NORMAL',
    isSecret: 'SECRET',
    previewText: '텍스트트트트트트',
    title: '게시판에 글이 하나도 없습니다',
    createAt: [0, 0, 0, 0, 0, 0],
    numReply: 0,
    views: 0
  };
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
          {res !== null && res.postListItem.content.length !== 0 ? (
            res.postListItem.content.map(postInfo => (
              <PostTitle key={postInfo.postId} postInfo={postInfo} />
            ))
          ) : (
            <PostTitle key={0} postInfo={noPost} />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const BoardHeader = props => {
  const {
    nowBoard,
    postSearchType,
    onPostSearchTypeChange,
    keyword,
    onSearch,
    onSearchChange
  } = props;
  return (
    <BoardHead>
      <BoardTitle>{nowBoard.description}</BoardTitle>
      <BoardHeadRight>
        <FormSelectField
          margin="dense"
          value={postSearchType}
          onChange={onPostSearchTypeChange}
        >
          {postSearchTypeList.map(type => (
            <MenuItem value={type.type} key={type.type}>
              {type.name}
            </MenuItem>
          ))}
        </FormSelectField>
        <SearchBar onSubmit={onSearch}>
          <TextField
            id="text"
            type="text"
            margin="dense"
            variant="outlined"
            value={keyword}
            label="검색"
            onChange={onSearchChange}
          />
        </SearchBar>
      </BoardHeadRight>
    </BoardHead>
  );
};

const Board = props => {
  const {
    onChange,
    onSearchChange,
    data,
    loading,
    error,
    nowBoard,
    keyword,
    onSearch,
    onPostSearchTypeChange,
    postSearchType
  } = props;

  if (error) {
    return <NoBoard />;
  }
  if (data === null || loading) {
    return (
      <MainWrapper>
        <LoadingCircle />
      </MainWrapper>
    );
  }
  const res = data.data;
  return (
    <MainWrapper>
      {error === null ? (
        <>
          <BoardHeader
            nowBoard={nowBoard}
            postSearchType={postSearchType}
            onPostSearchTypeChange={onPostSearchTypeChange}
            keyword={keyword}
            onSearch={onSearch}
            onSearchChange={onSearchChange}
          />
          <MainTable res={res} />
          <Paginations res={res} onChange={onChange} />
        </>
      ) : (
        <NoBoard />
      )}
    </MainWrapper>
  );
};

export default Board;
