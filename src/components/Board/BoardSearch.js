import React from 'react';
import styled from 'styled-components';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { TextField, Select, MenuItem, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { postSearchTypeList } from '../../DataExport';

const FormSelectField = styled(Select)`
  margin-right: 8px;
  width: auto;
  height: 2rem;
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    margin-right: 0px;
  }
`;

const SearchField = styled(TextField)`
  margin-right: 8px;
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    margin-top: 8px;
    margin-right: 0px;
  }
`;

const ButtonStyled = styled(Button)`
  font-weight: 500;
  line-height: 1.5;
  padding: 6px 12px;
  border-radius: 100px;
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    margin-top: 8px;
  }
`;

const BoardSearch = props => {
  const { postSearchType, onPostSearchTypeChange, keyword, onSearchChange } =
    props;

  return (
    <>
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
      <SearchField
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
    </>
  );
};

export default BoardSearch;
