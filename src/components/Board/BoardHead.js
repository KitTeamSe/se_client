import React from 'react';
import styled from 'styled-components';
import { faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextField, Select, MenuItem, Button } from '@mui/material';
import { postSearchTypeList } from '../../DataExport';

const BoardHeadWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    margin: 10px;
  }
`;

const BoardTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    margin-left: 10px;
  }
`;

const BoardHeadRight = styled.div`
  display: flex;
  align-items: center;
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    margin-right: 10px;
  }
`;

const SearchBarWrapper = styled.div`
  display: flex;
  margin: 8px 0;
  align-items: center;
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    display: none;
  }
`;

const FormSelectField = styled(Select)`
  margin-right: 8px;
  width: auto;
  height: 2rem;
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
  margin-left: 8px;
`;

const BoardHead = props => {
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
    <BoardHeadWrapper>
      <BoardTitleWrapper>
        <BoardTitle>{boardDescription}</BoardTitle>
      </BoardTitleWrapper>
      <BoardHeadRight>
        <form onSubmit={onSearch}>
          <SearchBarWrapper>
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
            <TextField
              id="text"
              type="text"
              size="small"
              value={keyword}
              label="검색"
              onChange={onSearchChange}
            />
            <ButtonStyled
              variant="contained"
              startIcon={<FontAwesomeIcon icon={faSearch} size="sm" />}
              size="small"
              type="submit"
            >
              검색
            </ButtonStyled>
          </SearchBarWrapper>
        </form>

        <ButtonStyled
          variant="contained"
          size="small"
          startIcon={<FontAwesomeIcon icon={faEdit} size="sm" />}
          onClick={onWritePost}
        >
          글쓰기
        </ButtonStyled>
      </BoardHeadRight>
    </BoardHeadWrapper>
  );
};

export default BoardHead;
