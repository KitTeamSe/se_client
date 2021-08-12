import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Board from '../../components/Board/Board';
import { loadAccountList } from '../../modules/post';

const BoardContainer = () => {
  const dispatch = useDispatch();
  const [postList, setPostList] = useState([]);
  const { postListObj, nowPage } = useSelector(({ post }) => ({
    postListObj: post.loadPostList,
    nowPage: post.nowPage
  }));

  useEffect(() => {
    const parameter = { boardId: 1, direction: 'ASC', page: 1, size: 50 };
    dispatch(loadAccountList(parameter));
  }, []);

  useEffect(() => {
    if (postListObj !== null) {
      const { content } = postListObj.postListItem;
      if (content.length === 0) {
        const noPost = {
          nickname: '시스템',
          boardId: 0,
          postId: 0,
          isNotice: 'NORMAL',
          isSecret: 'NORMAL',
          previewText: '텍스트트트트트트',
          title: '게시판에 글이 하나도 없습니다',
          createAt: [2021, 8, 12, 12, 6, 1000],
          numReply: 0,
          views: 0
        };
        setPostList([noPost]);
        return;
      }
      setPostList(postListObj.postListItem.content);
    }
  }, [postListObj]);

  return (
    <Board
      postList={postList}
      nowPage={nowPage}
      totalPage={
        postListObj && postListObj.postListItem.totalPages
          ? postListObj.postListItem.totalPages
          : 1
      }
      page={postListObj ? postListObj.postListItem.number + 1 : 1}
    />
  );
};

export default BoardContainer;
