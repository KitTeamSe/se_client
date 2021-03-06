import React from 'react';
import styled from 'styled-components';
import { Chip, TextField, Button, Paper, Autocomplete } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faRedo } from '@fortawesome/free-solid-svg-icons';
import { StateErrorMessage } from '../Action/ErrorMessage';

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
  align-items: center;
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
  height: 32px;
  margin-left: 5px;
  & span {
    text-align: center;
    white-space: nowrap;
  }
  & .MuiButton-iconSizeSmall > *:first-child {
    font-size: 0.875rem;
  }
`;

const AutocompleteStyled = styled(Autocomplete)`
  width: 100%;
  max-width: calc(100% - 180px);
  margin-bottom: 5px;
`;

const PaperStyled = styled(Paper)`
  & li {
    min-height: auto;
  }
`;

const PostTagInput = props => {
  const { value, data, loading, onChange, handleAddTag, handleClearTag } =
    props;

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
          <TextField {...params} placeholder="?????? ??????" />
        )}
      />
      <TagActionWrapper>
        <ButtonStyled
          variant="contained"
          size="small"
          id="addTagBtn"
          onClick={handleAddTag}
          startIcon={<FontAwesomeIcon size="sm" icon={faPlus} />}
        >
          ?????? ??????
        </ButtonStyled>
        <ButtonStyled
          variant="contained"
          id="resetTagBtn"
          color="error"
          size="small"
          startIcon={<FontAwesomeIcon size="sm" icon={faRedo} />}
          onClick={handleClearTag}
        >
          ?????????
        </ButtonStyled>
      </TagActionWrapper>
    </TagInputWrapper>
  );
};

const PostTagList = props => {
  const { data, handleRemoveTag } = props;
  return (
    <TagListWrapper id="tagList">
      {data.length
        ? data.map(e => {
            const onDelete = () => handleRemoveTag(e);
            return (
              <ChipStyled
                variant="outlined"
                label={e.text}
                onDelete={onDelete}
              />
            );
          })
        : null}
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
    tagAddMessage,
    handleSearchTag,
    handleAddTag,
    handleRemoveTag,
    handleClearTag
  } = props;

  return localStorage.getItem('token') && localStorage.getItem('userId') ? (
    <TagWrapper>
      <PostTagInput
        value={value}
        data={searchTagData}
        loading={searchTagLoading}
        error={searchTagError}
        onChange={handleSearchTag}
        handleAddTag={handleAddTag}
        handleClearTag={handleClearTag}
      />
      <StateErrorMessage error={tagAddMessage} />
      <PostTagList data={tagData} handleRemoveTag={handleRemoveTag} />
    </TagWrapper>
  ) : null;
};

export default PostTagAdd;
