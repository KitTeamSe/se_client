import React from 'react';
import styled from 'styled-components';
import { Pagination as Paginations } from '@material-ui/lab';

const PaginationStyled = styled(Paginations)`
  & ul {
    justify-content: center;
    padding: 10px;
  }
`;

const PostContent = styled.div`
  display: flex;
  height: 48px;
  align-items: center;
  margin: 8px;
  border-bottom: 1px solid #ccc;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 36px;
`;

const PostNumber = styled.div`
  background-color: #ccc;
  padding: 4px 5px 4px 4px;
  margin: 0px 12px;
  border-radius: 100%;
  font-size: 0.8rem;
`;

const Title = styled.div`
  display: inline-block;
  width: 240px;
  font-size: 1rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PreviewText = styled.div`
  font-size: 0.9rem;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 540px;
`;

const Pagination = props => {
  const { totalPage, page, onChange } = props;
  return (
    <PaginationStyled
      component="div"
      count={totalPage}
      page={parseInt(page, 10)}
      onChange={onChange}
      showFirstButton
      showLastButton
    />
  );
};

const PostTitle = props => {
  const { postInfo } = props;
  const { createAt } = postInfo;
  const writeTime = `${createAt[0]}년${createAt[1]}월${createAt[2]}일 ${createAt[3]}:${createAt[4]}`;
  console.log(postInfo);
  return (
    <li>
      <PostContent>
        <TitleBox>
          <PostNumber>{postInfo.postId}</PostNumber>
          <Title>{postInfo.title}</Title>
        </TitleBox>
        <PreviewText>{postInfo.previewText}</PreviewText>
        <div>{postInfo.nickname}</div>
        <div>
          <div>{writeTime}</div>
          <div>{postInfo.isSecret}</div>
          <div>{postInfo.numReply}</div>
          <div>{postInfo.views}</div>
        </div>
      </PostContent>
    </li>
  );
};

const MainTable = props => {
  const { postList } = props;
  return (
    <ul>
      {postList.map(postInfo => (
        <PostTitle key={postInfo.postId} postInfo={postInfo} />
      ))}
    </ul>
  );
};

const Board = props => {
  const { totalPage, page, onChange, postList } = props;
  return (
    <>
      <MainTable postList={postList} />
      <Pagination totalPage={totalPage} page={page} onChange={onChange} />
    </>
  );
};

export default Board;
