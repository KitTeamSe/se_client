import React from 'react';
import styled from 'styled-components';
import { Switch, FormControlLabel, Input, Button } from '@mui/material';
import AttachImageList from '../Editor/AttachImageList';
import AttachList from '../Editor/AttachList';
import Editor from '../Editor/Editor';
import FileAttachDropZone from '../FileAttachDropZone/FileAttachDropZone';
import ErrorMessage from '../Action/ErrorMessage';
import PostTagAdd from './PostTagAdd';
import { ContentWrapper } from '../Common/Wrapper/Wrapper';

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media ${({ theme }) => theme.sizeQuery.mobile} {
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
  @media ${({ theme }) => theme.sizeQuery.mobile} {
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

const PostAddInput = props => {
  const { addForm, handleChange, handleSecret, handleNotice } = props;

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

      {localStorage.getItem('token') && localStorage.getItem('userId') ? (
        <NoticeToggle onChange={handleNotice} />
      ) : (
        <SecretToggle onChange={handleSecret} />
      )}
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
  const { onSubmit, onCancel } = props;
  return (
    <ButtonWrapper>
      <ButtonStyled
        variant="contained"
        size="small"
        type="submit"
        onClick={onCancel}
      >
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
const PostAddFooter = props => {
  const {
    addForm,
    handleChange,
    handleSecret,
    handleNotice,
    onSubmit,
    onCancel
  } = props;

  return (
    <FooterWrapper>
      <PostAddInput
        addForm={addForm}
        handleChange={handleChange}
        handleSecret={handleSecret}
        handleNotice={handleNotice}
        onSubmit={onSubmit}
      />
      <PostAddAction onSubmit={onSubmit} onCancel={onCancel} />
    </FooterWrapper>
  );
};

const PostAdd = props => {
  const {
    postTitleProps,
    postTagAddProps,
    editorProps,
    fileAttachDropZoneProps,
    attachImageListProps,
    attachListProps,
    postAddFooterProps,
    errorMessageProps
  } = props;
  return (
    <ContentWrapper>
      <PostTitle {...postTitleProps} />
      <PostTagAdd {...postTagAddProps} />
      <Editor {...editorProps} />
      <FileAttachDropZone {...fileAttachDropZoneProps} />
      <AttachImageList {...attachImageListProps} />
      <AttachList {...attachListProps} />
      <PostAddFooter {...postAddFooterProps} />
      <ErrorMessage {...errorMessageProps} />
    </ContentWrapper>
  );
};

export default PostAdd;
