import React from 'react';
import styled from 'styled-components';
import { Switch, FormControlLabel, Input, Button } from '@material-ui/core';
import Editor from '../Editor/Editor';
import FileAttachDropZone from '../FileAttachDropZone/FileAttachDropZone';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media ${props => props.theme.mobile} {
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

const ImageListWrapper = styled.div`
  display: block;
  padding: 0 5px 0 10px;
`;

const ListWrapper = styled.div`
  max-height: 160px;
  overflow-y: scroll;
  margin: 0 -5px;
  padding: 5px 0;
  border-bottom: 1px solid #e6e6e6;
`;

const ImageList = styled.li`
  position: relative;
  display: inline-block;
  margin: 5px;
  width: 80px;
  height: 80px;
  border: 2px solid #ddd;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const AttachImageList = props => {
  const { attachImgList } = props;
  return (
    <ImageListWrapper>
      <ListWrapper>
        <ol>
          {attachImgList.length
            ? attachImgList.map(
                e =>
                  e.fileName && (
                    <span>
                      <ImageList>
                        <Image src={e.downloadUrl} alt={e.fileName} />
                      </ImageList>
                    </span>
                  )
              )
            : null}
        </ol>
      </ListWrapper>
    </ImageListWrapper>
  );
};

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

const ReplyAddAction = () => {
  return (
    <ButtonWrapper>
      <ButtonStyled
        variant="contained"
        color="default"
        size="small"
        type="submit"
      >
        작성
      </ButtonStyled>
    </ButtonWrapper>
  );
};

const ReplyAddFooter = props => {
  const { addForm, handleChange, handleSecret, children } = props;

  return (
    <Wrapper>
      <ReplyAddInput
        addForm={addForm}
        handleChange={handleChange}
        handleSecret={handleSecret}
      />
      {children}
    </Wrapper>
  );
};

const ReplyAdd = props => {
  const {
    // attachList,
    attachImgList,
    addForm,
    handleChange,
    handleSecret,
    handleContentText,
    onSubmit,
    loading,
    error,
    handleAttachFiles
  } = props;

  return (
    <form onSubmit={onSubmit}>
      <Editor
        onChange={handleContentText}
        data={addForm.text}
        placeholder="댓글을 입력하세요"
      />
      <FileAttachDropZone
        loading={loading}
        error={error}
        handleAttachFiles={handleAttachFiles}
      />
      <AttachImageList attachImgList={attachImgList} />
      <ReplyAddFooter
        addForm={addForm}
        handleChange={handleChange}
        handleSecret={handleSecret}
      >
        <ReplyAddAction />
      </ReplyAddFooter>
    </form>
  );
};
export default ReplyAdd;
