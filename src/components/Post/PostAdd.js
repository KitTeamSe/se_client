import React from 'react';
import styled from 'styled-components';
import { Switch, FormControlLabel, Input, Button } from '@material-ui/core';
import confirmFileExtension from '../../utils/confirmFileExtension';
import AttachImageList from '../Editor/AttachImageList';
import AttachList from '../Editor/AttachList';
import Editor from '../Editor/Editor';
import FileAttachDropZone from '../FileAttachDropZone/FileAttachDropZone';
import ErrorMessage from '../Action/ErrorMessage';
import PostTagAdd from './PostTagAdd';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media ${props => props.theme.mobile} {
    flex-direction: column;
    align-items: flex-start;
    transition: all 3s ease;
  }
`;

const TitleInput = styled.input`
  width: 100%;
  font-size: 1.5rem;
  padding: 0;
  border-width: 0;
  margin-bottom: 5px;
  border-bottom: 2px solid #ccc;

  &:focus {
    outline: none;
    border-bottom: 2px solid #000;
  }
`;

const FormControlLabelStyled = styled(FormControlLabel)`
  span {
    font-size: 0.75rem;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const InputStyled = styled(Input)`
  width: 120px;
  height: 32px;
  margin-right: 5px;
  & input {
    font-size: 0.875rem;
    padding: 4px 0;
  }
`;

const ButtonWrapper = styled.div`
  @media ${props => props.theme.mobile} {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
`;

const ButtonStyled = styled(Button)`
  font-weight: 500;
  line-height: 1.5;
  padding: 6px 12px;
  border-radius: 100px;
  margin-left: 10px;
`;

const SecretToggle = props => {
  const { onChange } = props;
  return (
    <FormControlLabelStyled
      control={<Switch color="secondary" id="isSecret" onChange={onChange} />}
      labelPlacement="start"
      label="비밀글"
      size="small"
      margin="dense"
    />
  );
};

const PostAddInput = props => {
  const { addForm, handleChange, handleSecret } = props;

  return (
    <InputWrapper>
      {!localStorage.getItem('token') || !localStorage.getItem('userId') ? (
        <>
          <InputStyled
            placeholder="글쓴이"
            id="anonymousNickname"
            size="small"
            value={addForm.anonymousNickname}
            onChange={handleChange}
          />
          <InputStyled
            placeholder="비밀번호"
            id="anonymousPassword"
            type="password"
            value={addForm.anonymousPassword}
            onChange={handleChange}
          />
        </>
      ) : null}
      <SecretToggle onChange={handleSecret} />
    </InputWrapper>
  );
};

const PostTitle = props => {
  const { value, onChange } = props;
  return (
    <TitleInput
      id="title"
      value={value}
      onChange={onChange}
      placeholder="제목을 입력하세요"
      required
    />
  );
};

const PostAddAction = props => {
  const { onSubmit } = props;
  return (
    <ButtonWrapper>
      <ButtonStyled
        variant="contained"
        color="default"
        size="small"
        type="submit"
        onClick={onSubmit}
      >
        작성
      </ButtonStyled>
    </ButtonWrapper>
  );
};
const PostAddFooter = props => {
  const { addForm, handleChange, handleSecret, onSubmit } = props;

  return (
    <Wrapper>
      <PostAddInput
        addForm={addForm}
        handleChange={handleChange}
        handleSecret={handleSecret}
        onSubmit={onSubmit}
      />
      <PostAddAction onSubmit={onSubmit} />
    </Wrapper>
  );
};

const PostAdd = props => {
  const {
    addForm,
    addLoading,
    addError,
    attachLoading,
    attachError,
    searchText,
    searchTagData,
    searchTagLoading,
    searchTagError,
    tagAddMessage,
    handleChange,
    handleSecret,
    handleContentText,
    handleAttachFiles,
    handleSearchTag,
    handleRemoveTag,
    handleClearTag,
    handleAddTag,
    onSubmit,
    onCancel,
    onDeleteAttach
  } = props;
  return (
    <>
      <PostTitle addForm={addForm} onChange={handleChange} />
      <PostTagAdd
        value={searchText}
        tagData={addForm.tagList}
        searchTagData={searchTagData}
        searchTagLoading={searchTagLoading}
        searchTagError={searchTagError}
        tagAddMessage={tagAddMessage}
        handleAddTag={handleAddTag}
        handleSearchTag={handleSearchTag}
        handleRemoveTag={handleRemoveTag}
        handleClearTag={handleClearTag}
      />
      <Editor
        onChange={handleContentText}
        data={addForm.text}
        placeholder="내용을 입력하세요"
      />
      <FileAttachDropZone
        loading={attachLoading}
        error={attachError}
        handleAttachFiles={handleAttachFiles}
      />
      <AttachImageList
        attachImgList={addForm.attachmentList.filter(e =>
          confirmFileExtension(e.fileName)
        )}
      />
      <AttachList
        attachList={addForm.attachmentList}
        onDeleteAttach={onDeleteAttach}
      />
      <PostAddFooter
        addForm={addForm}
        handleChange={handleChange}
        handleSecret={handleSecret}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
      <ErrorMessage loading={addLoading} error={addError} />
    </>
  );
};

export default PostAdd;
