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
import { postSearchTypeList, tagList } from '../../DataExport';

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

const TagIcon = styled.span`
  padding: 0px 4px;
  margin: 2px;
  border-radius: 8px;
  font-size: 0.7rem;
  background-image: linear-gradient(
    to right,
    #${props => props.color1} 0%,
    #${props => props.color2} 100%
  );
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

const PaginationStyled = styled(Pagination)`
  margin: 8px;
`;

const Paginations = props => {
  const { res, onChange } = props;
  const totalPage = res.postListItem.totalPages;
  const page = Number(res.postListItem.number) + 1;
  return (
    <PaginationStyled
      component="div"
      count={totalPage}
      page={page}
      onChange={onChange}
    />
  );
};

const PostTitle = props => {
  const { postInfo } = props;
  const { postId, title, isSecret, nickname, numReply, views, tags, createAt } =
    postInfo;
  const writeTime = `${createAt[0]}년${createAt[1]}월${createAt[2]}일 ${createAt[3]}:${createAt[4]}`;
  return (
    <PostContent>
      <NoneBorderCell align="center">
        <PostNumber>{postId}</PostNumber>
      </NoneBorderCell>
      <NoneBorderCell>
        <Title href={`post/${postId}`}>{title}</Title>
        <IconMargin>
          {isSecret === 'NORMAL' ? <></> : <InfoIcon icon={faLock} />}
        </IconMargin>
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
      </NoneBorderCell>
      <NoneBorderCell align="center">
        <NickName>{nickname}</NickName>
      </NoneBorderCell>
      <NoneBorderCell align="center">
        <InfoBox>
          <IconMargin>{writeTime}</IconMargin>
          <IconMargin>
            <InfoIcon icon={faCommentAlt} />
            {numReply}
          </IconMargin>
          <IconMargin>
            <InfoIcon icon={faEye} />
            {views}
          </IconMargin>
        </InfoBox>
      </NoneBorderCell>
    </PostContent>
  );
};

const NoBoard = () => {
  return <NoBoardBox>게시판이 아직 만들어지지 않았어요 😅</NoBoardBox>;
};

const Unauthorized = () => {
  return <NoBoardBox>게시판 접근 권한이 없습니다 😅</NoBoardBox>;
};

const NoPost = props => {
  const { keyword } = props;
  if (keyword === '') {
    return <NoBoardBox>게시판에 아직 글이 없습니다 😅</NoBoardBox>;
  }
  return (
    <NoBoardBox>
      <div>{`${keyword}의 검색결과가 하나도 없습니다 😅`}</div>
    </NoBoardBox>
  );
};

const MainTable = props => {
  const { res } = props;
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
          {res.postListItem.content.map(postInfo => (
            <PostTitle key={postInfo.postId} postInfo={postInfo} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const BoardHeader = props => {
  const {
    postSearchType,
    onPostSearchTypeChange,
    keyword,
    onSearch,
    onSearchChange
  } = props;
  return (
    <BoardHead>
      <BoardTitle>{keyword}</BoardTitle>
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
    keyword,
    onSearch,
    onPostSearchTypeChange,
    postSearchType
  } = props;

  if (error) {
    if (error.status === 403) {
      return <Unauthorized />;
    }
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
      <BoardHeader
        postSearchType={postSearchType}
        onPostSearchTypeChange={onPostSearchTypeChange}
        keyword={keyword}
        onSearch={onSearch}
        onSearchChange={onSearchChange}
      />
      {res.postListItem.content.length === 0 ? (
        <NoPost keyword={keyword} />
      ) : (
        <>
          <MainTable res={res} />
          <Paginations res={res} onChange={onChange} />
        </>
      )}
    </MainWrapper>
  );
};

export default Board;
