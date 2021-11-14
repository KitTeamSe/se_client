import React from 'react';
import styled from 'styled-components';
import { Switch, FormControlLabel, Input, Button } from '@mui/material';
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

const ContentWrapper = styled.div`
  width: 100%;
  padding: 2rem;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  @media ${props => props.theme.mobile} {
    width: calc(100% - 1rem);
    padding: 0.5rem;
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
    pupdateing: 4px 0;
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
  pupdateing: 6px 12px;
  border-radius: 100px;
  margin-left: 10px;
`;

const Toggle = props => {
  const { id, label, onChange } = props;
  return (
    <FormControlLabelStyled
      control={<Switch color="primary" id={id} onChange={onChange} />}
      labelPlacement="start"
      label={label}
      size="small"
      margin="dense"
    />
  );
};

const SecretToggle = props => {
  const { onChange } = props;
  return <Toggle id="isSecret" label="비밀글" onChange={onChange} />;
};

const NoticeToggle = props => {
  const { onChange } = props;
  return <Toggle id="isNotice" label="공지" onChange={onChange} />;
};

const PostUpdateInput = props => {
  const {
    isAccountPost,
    updateForm,
    handleChange,
    handleSecret,
    handleNotice
  } = props;

  return (
    <InputWrapper>
      {!isAccountPost ? (
        <InputStyled
          placeholder="비밀번호"
          id="anonymousPassword"
          type="password"
          value={updateForm.anonymousPassword}
          onChange={handleChange}
        />
      ) : null}
      <SecretToggle onChange={handleSecret} />
      {isAccountPost ? <NoticeToggle onChange={handleNotice} /> : null}
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

const PostUpdateAction = props => {
  const { onSubmit, onCancel } = props;
  return (
    <ButtonWrapper>
      <ButtonStyled variant="contained" size="small" onClick={onCancel}>
        취소
      </ButtonStyled>
      <ButtonStyled
        variant="contained"
        size="small"
        type="submit"
        onClick={onSubmit}
      >
        작성
      </ButtonStyled>
    </ButtonWrapper>
  );
};
const PostUpdateFooter = props => {
  const {
    isAccountPost,
    updateForm,
    handleChange,
    handleSecret,
    handleNotice,
    onSubmit,
    onCancel
  } = props;

  return (
    <Wrapper>
      <PostUpdateInput
        isAccountPost={isAccountPost}
        updateForm={updateForm}
        handleChange={handleChange}
        handleSecret={handleSecret}
        handleNotice={handleNotice}
      />
      <PostUpdateAction onSubmit={onSubmit} onCancel={onCancel} />
    </Wrapper>
  );
};

const PostUpdate = props => {
  const {
    postTitleProps,
    postTagAddProps,
    editorProps,
    fileAttachDropZoneProps,
    attachImageListProps,
    attachListProps,
    postUpdateFooterProps,
    errorMessageProps
  } = props;
  return (
    <ContentWrapper>
      <PostTitle {...postTitleProps} />
      {postTagAddProps.isAccountPost && <PostTagAdd {...postTagAddProps} />}
      {editorProps.data && <Editor {...editorProps} />}
      <FileAttachDropZone {...fileAttachDropZoneProps} />
      <AttachImageList {...attachImageListProps} />
      <AttachList {...attachListProps} />
      <PostUpdateFooter {...postUpdateFooterProps} />
      <ErrorMessage {...errorMessageProps} />
    </ContentWrapper>
  );
};

export default PostUpdate;
