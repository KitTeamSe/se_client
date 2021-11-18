import React from 'react';
import styled from 'styled-components';
import { Switch, FormControlLabel, Input, Button } from '@mui/material';
import confirmFileExtension from '../../utils/confirmFileExtension';
import AttachImageList from '../Editor/AttachImageList';
import AttachList from '../Editor/AttachList';
import Editor from '../Editor/Editor';
import FileAttachDropZone from '../FileAttachDropZone/FileAttachDropZone';
import ErrorMessage from '../Action/ErrorMessage';
import { ContentWrapper } from '../Common/Wrapper/Wrapper';

const PostHeadTitle = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #ddd;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const ReplyUpdateHeader = () => {
  return <PostHeadTitle>댓글 수정</PostHeadTitle>;
};

const ReplyUpdateInput = props => {
  const { replyData, updateForm, handleChange, handleSecret } = props;

  return (
    <InputWrapper>
      {replyData && replyData.anonymousNickname !== null ? (
        <InputStyled
          placeholder="비밀번호"
          id="password"
          type="password"
          value={updateForm.password}
          onChange={handleChange}
        />
      ) : null}
      <SecretToggle onChange={handleSecret} />
    </InputWrapper>
  );
};

const ReplyUpdateAction = props => {
  const { onCancel } = props;
  return (
    <ButtonWrapper>
      <ButtonStyled variant="outlined" size="small" onClick={onCancel}>
        취소
      </ButtonStyled>
      <ButtonStyled variant="contained" size="small" type="submit">
        수정
      </ButtonStyled>
    </ButtonWrapper>
  );
};

const ReplyUpdateFooter = props => {
  const { replyData, updateForm, handleChange, handleSecret, onCancel } = props;

  return (
    <Wrapper>
      <ReplyUpdateInput
        replyData={replyData}
        updateForm={updateForm}
        handleChange={handleChange}
        handleSecret={handleSecret}
      />
      <ReplyUpdateAction onCancel={onCancel} />
    </Wrapper>
  );
};

const ReplyUpdate = props => {
  const {
    replyData,
    attachLoading,
    attachError,
    updateForm,
    updateLoading,
    updateError,
    handleChange,
    handleSecret,
    handleContentText,
    handleAttachFiles,
    onSubmit,
    onCancel,
    onDeleteAttach
  } = props;

  return (
    <ContentWrapper>
      <form onSubmit={onSubmit}>
        <ReplyUpdateHeader />
        <Editor
          onChange={handleContentText}
          data={updateForm.text}
          placeholder="댓글을 입력하세요"
        />
        <FileAttachDropZone
          loading={attachLoading}
          error={attachError}
          handleAttachFiles={handleAttachFiles}
        />
        <AttachImageList
          attachImgList={updateForm.attachmentList.filter(e =>
            confirmFileExtension(e.fileName)
          )}
        />
        <AttachList
          attachList={updateForm.attachmentList}
          onDeleteAttach={onDeleteAttach}
        />
        <ReplyUpdateFooter
          updateForm={updateForm}
          handleChange={handleChange}
          handleSecret={handleSecret}
          replyData={replyData}
          onCancel={onCancel}
        />
        <ErrorMessage loading={updateLoading} error={updateError} />
      </form>
    </ContentWrapper>
  );
};
export default ReplyUpdate;
