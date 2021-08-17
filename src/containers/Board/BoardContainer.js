import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Board from '../../components/Board/Board';
import { loadPostList } from '../../modules/post';

const BoardContainer = () => {
  const dispatch = useDispatch();
  const [path, setPath] = useState('/');
  const { postListObj, nowPage, nowBoard } = useSelector(({ post }) => ({
    postListObj: post.loadPostList,
    nowPage: post.nowPage,
    nowBoard: post.selectBoard
  }));
  const nowUrl = window.location.pathname;
  if (path !== nowUrl) {
    setPath(nowUrl);
  }

  useEffect(() => {
    if (Object.keys(nowBoard.value).length !== 0) {
      const { boardId } = nowBoard.value;
      const parameter = {
        boardId,
        direction: 'ASC',
        page: 1,
        size: 20
      };
      dispatch(loadPostList(parameter));
    }
  }, [nowBoard]);

  return (
    <Board
      postListObj={postListObj}
      nowPage={nowPage}
      totalPage={
        postListObj && postListObj.postListItem.totalPages
          ? postListObj.postListItem.totalPages
          : 1
      }
      page={postListObj ? postListObj.postListItem.number + 1 : 1}
      nowBoard={nowBoard.value}
    />
  );
};

export default BoardContainer;
