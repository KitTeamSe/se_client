import React from 'react';
import styled from 'styled-components';
import { Chip, TextField, Button, Paper } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const TagWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  liststyle: none;
  margin-bottom: 5px;
`;

const TagActionWrapper = styled.div`
  display: flex;
  margin-bottom: 5px;
`;
const TagInputWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const TagListWrapper = styled.div`
  display: flex;
  margin-bottom: 5px;
  flex-wrap: wrap;
`;

const ChipStyled = styled(Chip)`
  font-size: 0.75rem;
  height: 28px;
  margin-right: 3px;
  & span {
    width: 100%;
    text-align: center;
  }
  @media ${props => props.theme.mobile} {
    margin-right: 0px;
  }
`;

const ButtonStyled = styled(Button)`
  border-radius: 50px;
  font-size: 0.75rem;
  height: 28px;
  margin-right: 3px;
  & span {
    width: 100%;
    text-align: center;
    white-space: nowrap;
  }
`;

const AutocompleteStyled = styled(Autocomplete)`
  width: 100%;
  margin-bottom: 5px;
`;

const PaperStyled = styled(Paper)`
  & li {
    min-height: auto;
  }
`;

const PostTagInput = props => {
  const { value, data, loading, onChange, handleAddTag } = props;

  return (
    <TagInputWrapper>
      <AutocompleteStyled
        id="search-tag"
        size="small"
        value={value}
        inputValue={value}
        onChange={onChange}
        onInputChange={onChange}
        freeSolo
        options={data ? data.data.map(option => option.text) : []}
        loading={loading}
        PaperComponent={({ children }) => (
          <PaperStyled variant="outlined" square>
            {children}
          </PaperStyled>
        )}
        renderInput={params => (
          <TextField {...params} placeholder="태그 검색" />
        )}
      />
      <TagActionWrapper>
        <ButtonStyled variant="contained" size="small" onClick={handleAddTag}>
          태그 추가
        </ButtonStyled>
      </TagActionWrapper>
    </TagInputWrapper>
  );
};

const PostTagList = props => {
  const { data, handleRemoveTag } = props;
  return (
    <TagListWrapper>
      <ButtonStyled
        variant="contained"
        color="secondary"
        size="small"
        // disabled={!data.length}
      >
        초기화
      </ButtonStyled>
      {data.map(e => (
        <ChipStyled
          variant="outlined"
          label={e.text}
          onDelete={handleRemoveTag}
        />
      ))}
      <ChipStyled
        variant="outlined"
        label="스무자를채워야하는데어떻게스무자까지채워"
        onDelete={handleRemoveTag}
      />
    </TagListWrapper>
  );
};

const PostTagAdd = props => {
  const {
    value,
    tagData,
    searchTagData,
    searchTagLoading,
    searchTagError,
    handleSearchTag,
    handleAddTag,
    handleRemoveTag
  } = props;

  return (
    <TagWrapper>
      <PostTagInput
        value={value}
        data={searchTagData}
        loading={searchTagLoading}
        error={searchTagError}
        onChange={handleSearchTag}
        handleAddTag={handleAddTag}
      />
      <PostTagList data={tagData} handleRemoveTag={handleRemoveTag} />
    </TagWrapper>
  );
};

export default PostTagAdd;
