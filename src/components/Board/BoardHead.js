import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import BoardSearch from './BoardSearch';

const SearchBarForm = styled.form`
  display: flex;
  align-items: center;
  margin: 8px 0;
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    display: none;
  }
`;

const BoardHeadWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    margin: 16px;
  }
`;

const BoardTitleWrapper = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    margin-left: 16px;
  }
`;

const BoardWriteWrapper = styled.div`
  display: flex;
  align-items: center;
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    margin-right: 16px;
  }
`;

const BoardTiteLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

const BoardTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
`;

const ButtonStyled = styled(Button)`
  font-weight: 500;
  line-height: 1.5;
  padding: 6px 12px;
  border-radius: 100px;
`;

const BoardHead = props => {
  const {
    boardNameEng,
    postSearchType,
    onPostSearchTypeChange,
    keyword,
    onSearch,
    onSearchChange,
    onWritePost,
    boardDescription
  } = props;

  return (
    <BoardHeadWrapper>
      <BoardTitleWrapper>
        <BoardTitle>
          <BoardTiteLink to={`/board/${boardNameEng}`}>
            {boardDescription}
          </BoardTiteLink>
        </BoardTitle>
      </BoardTitleWrapper>

      <SearchBarForm onSubmit={onSearch}>
        <BoardSearch
          postSearchType={postSearchType}
          onPostSearchTypeChange={onPostSearchTypeChange}
          keyword={keyword}
          onSearchChange={onSearchChange}
        />
      </SearchBarForm>

      <BoardWriteWrapper>
        <ButtonStyled
          variant="contained"
          size="small"
          startIcon={<FontAwesomeIcon icon={faEdit} size="sm" />}
          onClick={onWritePost}
        >
          글쓰기
        </ButtonStyled>
      </BoardWriteWrapper>
    </BoardHeadWrapper>
  );
};

export default BoardHead;
