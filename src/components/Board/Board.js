import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  faEye,
  faCommentAlt,
  faLock,
  faEdit
} from '@fortawesome/free-solid-svg-icons';
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
  MenuItem,
  Button
} from '@material-ui/core';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { postSearchTypeList } from '../../DataExport';
import Tags from '../Post/Tags';
import NicknameContainer from '../../containers/Post/NicknameContainer';

const LoadingCircle = styled(CircularProgress)`
  position: absolute;
  bottom: 50vh;
`;

const NoneBorderCell = styled(TableCell)`
  border: none;
  padding: 0 1rem;
`;

const IconMargin = styled.span`
  display: inline-block;
  margin: 2px;
`;

const InfoBox = styled.div`
  font-size: 0.75rem;
  width: 8rem;
  display: inline-block;
`;

const InfoIcon = styled(FontAwesomeIcon)`
  margin: 1px;
  color: gray;
`;

const PostContent = styled(TableRow)`
  border-bottom: 1px solid #ddd;
  background-color: #${props => props.bgcolor};
`;

const PostNumber = styled.span`
  width: 1rem;
  font-size: 0.8rem;
`;

const Title = styled(Link)`
  display: inline-block;
  width: 100%;
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

const BoardHeadLeft = styled.div`
  font-size: 1.5rem;
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

const ButtonStyled = styled(Button)`
  font-weight: 500;
  line-height: 1.5;
  padding: 6px 12px;
  border-radius: 100px;
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

  function backgroundColor() {
    if (isNotice === 'NOTICE') {
      return 'eeeeee';
    }
    return 'ffffff';
  }
  const writeTime = `${createAt[0]}년${createAt[1]}월${createAt[2]}일 ${createAt[3]}:${createAt[4]}`;
  return (
    <PostContent bgcolor={backgroundColor()}>
      <NoneBorderCell nowrap="true" align="center" width="5%">
        {isNotice === 'NOTICE' ? (
          <PostNumber>공지</PostNumber>
        ) : (
          <PostNumber>{postId}</PostNumber>
        )}
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
          <Tags tags={tags} />
        </Title>
      </NoneBorderCell>
      <NoneBorderCell nowrap="true" width="10%" align="center">
        <NicknameContainer
          nickname={nickname}
          accountIdString={accountIdString}
        />
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
  const { res, boardNameEng, notice } = props;
  const tableColumns = ['번호', '제목', '닉네임', '정보'];

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {tableColumns.map(column => (
              <TableCell nowrap="true" align="center" key={column}>
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {notice.postListItem.content.map(postInfo => (
            <PostTitle
              key={postInfo.postId}
              postInfo={postInfo}
              boardNameEng={boardNameEng}
            />
          ))}
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

const UpperBar = props => {
  const {
    postSearchType,
    onPostSearchTypeChange,
    keyword,
    onSearch,
    onSearchChange,
    onWritePost,
    boardDescription
  } = props;
  return (
    <BoardHead>
      <BoardHeadLeft>{boardDescription}</BoardHeadLeft>
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

        <ButtonStyled
          variant="contained"
          color="default"
          size="small"
          startIcon={<FontAwesomeIcon icon={faEdit} size="sm" />}
          onClick={onWritePost}
        >
          글쓰기
        </ButtonStyled>
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
    NoticeData,
    NoticeLoading,
    NoticeError,
    keyword,
    searchKeyword,
    onSearch,
    onPostSearchTypeChange,
    onWritePost,
    postSearchType,
    boardNameEng,
    boardPage,
    boardDescription
  } = props;

  if (error) {
    return <ErrorBoard error={error} />;
  }

  if (NoticeError) {
    return <ErrorBoard error={NoticeError} />;
  }

  if (data === null || loading) {
    return <LoadingCircle />;
  }

  if (NoticeData === null || NoticeLoading) {
    return <LoadingCircle />;
  }

  const res = data.data;
  const notice = NoticeData.data;
  return (
    <>
      <UpperBar
        boardDescription={boardDescription}
        postSearchType={postSearchType}
        onPostSearchTypeChange={onPostSearchTypeChange}
        keyword={keyword}
        onSearch={onSearch}
        onSearchChange={onSearchChange}
        onWritePost={onWritePost}
      />
      {res.postListItem.content.length === 0 ? (
        <NoPost searchKeyword={searchKeyword} />
      ) : (
        <>
          <MainTable res={res} notice={notice} boardNameEng={boardNameEng} />
          <Paginations
            res={res}
            onChange={onChange}
            boardNameEng={boardNameEng}
            boardPage={boardPage}
          />
        </>
      )}
    </>
  );
};

export default Board;
