import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Board from '../../components/Board/Board';
import { loadAccountList } from '../../modules/post';

const BoardContainer = () => {
  const dispatch = useDispatch();
  const [postList, setPostList] = useState([
    {
      anonymous: {
        anonymousNickname: '길무짱',
        anonymousPassword: 'string'
      },
      nickname: '길무짱',
      boardId: 6,
      postId: 1132,
      isNotice: 'NORMAL',
      isSecret: '',
      previewText:
        '미리보기미리보기미리보기미리보기미리보기미리보기미리보기미리보기미리보기미리보기미리보기미리보기미리보기미리보기미리보기',
      title:
        '제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목',
      tagList: [
        {
          tagId: 1
        }
      ],
      createAt: [2021, 8, 11, 9, 24, 1500],
      numReply: 1,
      views: 121
    }
  ]);
  const { postListObj, nowPage } = useSelector(({ post }) => ({
    postListObj: post.loadPostList,
    nowPage: post.nowPage
  }));

  useEffect(() => {
    const parameter = { boardId: 1, direction: 'ASC', page: 1, size: 50 };
    dispatch(loadAccountList(parameter));
  }, []);

  useEffect(() => {
    if (postListObj === 'null') {
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
