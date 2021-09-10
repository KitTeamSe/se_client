import React from 'react';
import { Route, Link } from 'react-router-dom';
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
import { Pagination, PaginationItem } from '@material-ui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { postSearchTypeList, tagList } from '../../DataExport';
import PostContainer from '../../containers/Post/PostContainer';

const LoadingCircle = styled(CircularProgress)`
  position: absolute;
  bottom: 50vh;
`;

const MainWrapper = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70vw;
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
  width: 8rem;
  display: inline-block;
`;

const NickName = styled.span`
  font-weight: 500;
  width: 6rem;
  font-size: 0.85rem;
`;

const InfoIcon = styled(FontAwesomeIcon)`
  margin: 1px;
  color: gray;
`;

const PostContent = styled(TableRow)`
  border-bottom: 1px solid #ddd;
`;

const PostNumber = styled.span`
  width: 1rem;
  font-size: 0.8rem;
`;

const Title = styled(Link)`
  font-size: 0.9rem;
  font-weight: 500;
  text-overflow: ellipsis;
  vertical-align: middle;
  color: black;
  text-decoration: none;
  cursor: pointer;
`;

const NoBoardBox = styled.div`
  width: 100%;
  height: 100%;
  font-size: 2rem;
  text-align: center;
  margin-top: 196px;
`;

const SearchBar = styled.form`
  width: 12rem;
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
  & ul {
    justify-content: center;
    padding: 10px;
    & li {
      padding: 4px;
    }
  }
`;

const Tag = styled.span`
  display: inline-block;
`;

const Paginations = props => {
  const { res, boardNameEng, boardPage } = props;
  const totalPage = res.postListItem.totalPages;
  return (
    <PaginationStyled
      component="div"
      size="small"
      count={totalPage}
      page={boardPage ? parseInt(boardPage, 10) : 1}
      renderItem={item => (
        <PaginationItem
          component={Link}
          to={`/board/${boardNameEng}?page=${item.page}`}
          {...item}
        />
      )}
    />
  );
};

const PostTitle = props => {
  const { postInfo, boardNameEng } = props;
  const { postId, title, isSecret, nickname, numReply, views, tags, createAt } =
    postInfo;
  const writeTime = `${createAt[0]}년${createAt[1]}월${createAt[2]}일 ${createAt[3]}:${createAt[4]}`;
  return (
    <PostContent>
      <NoneBorderCell nowrap="true" align="center" width="5%">
        <PostNumber>{postId}</PostNumber>
      </NoneBorderCell>
      <NoneBorderCell width="70%">
        <Title
          to={
            isSecret === 'NORMAL'
              ? `/board/${boardNameEng}/${postId}`
              : `/board/${boardNameEng}/${postId}?secret=true`
          }
        >
          {title}
          <IconMargin>
            {isSecret === 'NORMAL' ? <></> : <InfoIcon icon={faLock} />}
          </IconMargin>
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
        </Title>
      </NoneBorderCell>
      <NoneBorderCell nowrap="true" width="10%" align="center">
        <NickName>{nickname}</NickName>
      </NoneBorderCell>
      <NoneBorderCell width="15%" align="center">
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

const ErrorBoard = props => {
  const { error } = props;
  return <NoBoardBox>{error.message}</NoBoardBox>;
};

const NoPost = props => {
  const { searchKeyword } = props;
  return (
    <NoBoardBox>
      <div>{`${searchKeyword}의 검색결과가 하나도 없습니다 😅`}</div>
    </NoBoardBox>
  );
};

const MainTable = props => {
  const { res, boardNameEng } = props;
  const tableColumns = ['번호', '제목', '닉네임', '정보'];

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableHeader>
            {tableColumns.map(column => (
              <TableCell nowrap="true" align="center" key={column}>
                {column}
              </TableCell>
            ))}
          </TableHeader>
        </TableHead>
        <TableBody>
          {res.postListItem.content.map(postInfo => (
            <PostTitle
              key={postInfo.postId}
              postInfo={postInfo}
              boardNameEng={boardNameEng}
            />
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
      <div />
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
    searchKeyword,
    onSearch,
    onPostSearchTypeChange,
    postSearchType,
    boardNameEng,
    boardPage
  } = props;

  if (error) {
    return <ErrorBoard error={error} />;
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
      <Route
        exact
        path="/board/:boardNameEng/:postId"
        component={PostContainer}
      />
      <Route path="/board/:boardNameEng">
        <BoardHeader
          postSearchType={postSearchType}
          onPostSearchTypeChange={onPostSearchTypeChange}
          keyword={keyword}
          onSearch={onSearch}
          onSearchChange={onSearchChange}
        />
        {res.postListItem.content.length === 0 ? (
          <NoPost searchKeyword={searchKeyword} />
        ) : (
          <>
            <MainTable res={res} boardNameEng={boardNameEng} />
            <Paginations
              res={res}
              onChange={onChange}
              boardNameEng={boardNameEng}
              boardPage={boardPage}
            />
          </>
        )}
      </Route>
    </MainWrapper>
  );
};

export default Board;
