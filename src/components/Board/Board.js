import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { faLock, faEdit } from '@fortawesome/free-solid-svg-icons';
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
  Button,
  Pagination,
  PaginationItem
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import qs from 'qs';
import { postSearchTypeList } from '../../DataExport';
import Tags from '../Post/Tags';
import NicknameContainer from '../../containers/Post/NicknameContainer';
import { MainWrapper } from '../Wrapper/Wrapper';
import { getFormatDate, getFormatTime } from '../../utils/format';

const LoadingCircle = styled(CircularProgress)`
  position: absolute;
  bottom: 50vh;
`;

const NoneBorderCell = styled(TableCell)`
  border: none;
  padding: 0;
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
  font-size: 0.75rem;
`;

const Title = styled(Link)`
  display: inline-block;
  width: 100%;
  font-size: 0.75rem;
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
  margin: 96px 0 96px 0;
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
  const { res, boardPage, location } = props;
  const totalPage = res.postListItem.totalPages;

  function qsMaker(item) {
    const { secret, replyPage } = qs.parse(location.search, {
      ignoreQueryPrefix: true
    });
    const { page } = item;
    const qsResult = qs.stringify({ secret, page, replyPage });
    return qsResult;
  }

  return (
    <PaginationStyled
      component="div"
      size="small"
      count={totalPage}
      page={boardPage ? parseInt(boardPage, 10) : 1}
      renderItem={item => (
        <PaginationItem component={Link} to={`?${qsMaker(item)}`} {...item} />
      )}
    />
  );
};

const PostTitle = props => {
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
    <PostContent bgcolor={backgroundColor}>
      <NoneBorderCell nowrap="true" align="center">
        {isNotice === 'NOTICE' ? (
          <PostNumber>공지</PostNumber>
        ) : (
          <PostNumber>{postId}</PostNumber>
        )}
      </NoneBorderCell>
      <NoneBorderCell width="100%">
        <Title to={handleTitleLink}>
          {isSecret === 'SECRET' && (
            <IconMargin>
              <InfoIcon icon={faLock} />
            </IconMargin>
          )}
          {title}
          {numReply ? `[${numReply}]` : null}
          <Tags tags={tags} />
        </Title>
      </NoneBorderCell>
      <NoneBorderCell nowrap="true" align="center">
        <NicknameContainer
          nickname={nickname}
          accountIdString={accountIdString}
        />
      </NoneBorderCell>
      <NoneBorderCell align="center">
        <InfoBox>
          <IconMargin>
            {`${getFormatDate(createAt)} ${getFormatTime(createAt)}`}
          </IconMargin>
        </InfoBox>
      </NoneBorderCell>
      <NoneBorderCell align="center">{views}</NoneBorderCell>
    </PostContent>
  );
};

const ErrorBoard = props => {
  const { error } = props;
  return <NoBoardBox>{error.message}</NoBoardBox>;
};

const NoPost = props => {
  const { keyword } = props;
  return (
    <NoBoardBox>{`${keyword}의 검색결과가 하나도 없습니다 😅`}</NoBoardBox>
  );
};

const MainTable = props => {
  const { res, boardNameEng, boardPage, notice, keyword } = props;
  const tableColumns = ['번호', '제목', '글쓴이', '작성일', '조회'];

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
              boardPage={boardPage}
            />
          ))}
          {res.postListItem.content.map(postInfo => (
            <PostTitle
              key={postInfo.postId}
              postInfo={postInfo}
              boardNameEng={boardNameEng}
              boardPage={boardPage}
            />
          ))}
        </TableBody>
      </Table>
      {res.postListItem.content.length === 0 ? (
        <NoPost keyword={keyword} />
      ) : (
        <></>
      )}
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
          variant="standard"
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
            size="small"
            value={keyword}
            label="검색"
            onChange={onSearchChange}
          />
        </SearchBar>

        <ButtonStyled
          variant="contained"
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
    onSearchChange,
    data,
    loading,
    error,
    NoticeData,
    NoticeLoading,
    NoticeError,
    keyword,
    onSearch,
    onPostSearchTypeChange,
    onWritePost,
    postSearchType,
    boardNameEng,
    boardPage,
    boardDescription,
    location
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
    <MainWrapper>
      <UpperBar
        boardDescription={boardDescription}
        postSearchType={postSearchType}
        onPostSearchTypeChange={onPostSearchTypeChange}
        keyword={keyword}
        onSearch={onSearch}
        onSearchChange={onSearchChange}
        onWritePost={onWritePost}
      />
      <MainTable
        res={res}
        notice={notice}
        boardNameEng={boardNameEng}
        boardPage={boardPage}
        keyword={keyword}
      />
      {res.postListItem.content.length === 0 ? (
        <></>
      ) : (
        <Paginations
          res={res}
          boardNameEng={boardNameEng}
          boardPage={boardPage}
          location={location}
        />
      )}
    </MainWrapper>
  );
};

export default Board;
