import React from 'react';
import styled from 'styled-components';
import { Switch, FormControlLabel, Input, Button } from '@mui/material';
import FileAttachDropZone from '../FileAttachDropZone/FileAttachDropZone';
import Editor from '../Editor/Editor';
import AttachList from '../Editor/AttachList';
import AttachImageList from '../Editor/AttachImageList';
import confirmFileExtension from '../../utils/confirmFileExtension';

const ReplyAddWrapper = styled.div`
  padding: 0 1rem;
`;

const FooterWrapper = styled.div`
  display: flex;
  padding: 0.5rem 0;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e9e9e9;
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    flex-direction: column;
    align-items: flex-start;
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

const FormControlLabelStyled = styled(FormControlLabel)`
  span {
    font-size: 0.75rem;
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

const SecretToggle = props => {
  const { onChange } = props;
  return (
    <FormControlLabelStyled
      control={<Switch id="isSecret" onChange={onChange} />}
      labelPlacement="start"
      label="비밀글"
      size="small"
      margin="dense"
    />
  );
};

const ReplyAddInput = props => {
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

const ReplyAddAction = () => (
  <ButtonWrapper>
    <ButtonStyled variant="contained" size="small" type="submit">
      작성
    </ButtonStyled>
  </ButtonWrapper>
);

const ReplyAddFooter = props => {
  const { addForm, handleChange, handleSecret } = props;

  return (
    <FooterWrapper>
      <ReplyAddInput
        addForm={addForm}
        handleChange={handleChange}
        handleSecret={handleSecret}
      />
      <ReplyAddAction />
    </FooterWrapper>
  );
};

const ReplyAdd = props => {
  const {
    addForm,
    addAttachLoading,
    addAttachError,
    replyListData,
    replyListLoading,
    handleChange,
    handleSecret,
    handleContentText,
    handleAttachFiles,
    onSubmit,
    onDeleteAttach
  } = props;

  return replyListData && !replyListLoading ? (
    <form onSubmit={onSubmit}>
      <ReplyAddWrapper>
        <Editor
          data={addForm.text}
          onChange={handleContentText}
          placeholder="댓글을 입력하세요"
        />
        <FileAttachDropZone
          loading={addAttachLoading}
          error={addAttachError}
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
        <ReplyAddFooter
          addForm={addForm}
          handleChange={handleChange}
          handleSecret={handleSecret}
        />
      </ReplyAddWrapper>
    </form>
  ) : null;
};
export default ReplyAdd;
