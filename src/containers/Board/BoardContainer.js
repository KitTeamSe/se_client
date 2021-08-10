import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Board from '../../components/Board/Board';
import { loadAccountList } from '../../modules/post';

const BoardContainer = () => {
  const dispatch = useDispatch();
  const { postList, nowPage } = useSelector(({ post }) => ({
    postList: post.loadPostList,
    nowPage: post.nowPage
  }));

  useEffect(() => {
    const parameter = { boardId: 1, direction: 'ASC', page: 1, size: 50 };
    dispatch(loadAccountList(parameter));
  }, []);

  return (
    <Board
      postList={postList}
      nowPage={nowPage}
      totalPage={
        postList && postList.postListItem.totalPages
          ? postList.postListItem.totalPages
          : 1
      }
      page={postList ? postList.postListItem.number + 1 : 1}
    />
  );
};

export default BoardContainer;
