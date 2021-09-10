import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

import { CircularProgress } from '@material-ui/core';

const getColor = props => {
  const { isDragAccept, isDragReject, isDragActive } = props;
  if (isDragAccept) {
    return '#00e676';
  }
  if (isDragReject) {
    return '#ff1744';
  }
  if (isDragActive) {
    return '#2196f3';
  }
  return '#cccccc';
};

const getComment = props => {
  const { isDragAccept, isDragReject, isDragActive } = props;
  if (isDragAccept) {
    return '✅ 이미지 파일 추가';
  }
  if (isDragReject) {
    return '❌ 파일 업로드 불가 파일이 제외됩니다';
  }
  if (isDragActive) {
    return '⛔ 드래그 활성화 안됨';
  }
  return '이미지 파일 추가';
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 20px;
  border-width: 1px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  color: ${props => getColor(props)};
  border-style: solid;
  background-color: #fafafa;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const Typograpphy = styled.p`
  color: red;
`;

const DropZone = props => {
  const { loading, error, handleAttachFiles } = props;
  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    disabled: loading
  });

  useEffect(() => {
    if (acceptedFiles.length) {
      handleAttachFiles(acceptedFiles);
    }
  }, [acceptedFiles]);

  return (
    <>
      <Container
        {...getRootProps({
          isDragActive,
          isDragAccept,
          isDragReject,
          loading
        })}
      >
        <input {...getInputProps()} />
        {loading ? (
          <CircularProgress />
        ) : (
          getComment({
            isDragActive,
            isDragAccept,
            isDragReject
          })
        )}
      </Container>
      <Typograpphy>{error ? error.message : null}</Typograpphy>
    </>
  );
};

const FileAttachDropZone = props => {
  const { handleAttachFiles } = props;
  const { loading, error } = props;

  return (
    <DropZone
      handleAttachFiles={handleAttachFiles}
      loading={loading}
      error={error}
    />
  );
};

export default FileAttachDropZone;
