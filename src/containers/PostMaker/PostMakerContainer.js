import React from 'react';
import PostMaker from '../../components/PostMaker/PostMaker';
import { makeSomePost } from '../../libs/api/post';

const makePost = async () => {
  const attachedFiles = [];
  const data = {
    tagList: [
      {
        tagId: 2
      },
      {
        tagId: 3
      }
    ],
    boardId: 1,
    isNotice: 'NORMAL',
    isSecret: 'SECRET',
    postContent: {
      text: 'ㄴㅁㅇㄹㄻㄷㅈㄻㄴㄷ',
      title: '테스트'
    }
  };
  if (data.postContent.title.length > 50) {
    console.log('제목수는 50자를 초과할수 없습니다');
    return;
  }
  const formData = new FormData();
  formData.append(
    'key',
    new Blob([JSON.stringify(data)], { type: 'application/json' })
  );
  attachedFiles.forEach(({ file }) => {
    formData.append('files', file);
  });
  const res = await makeSomePost({ formData });
  console.log(res);
};
const PostMakerContainer = () => {
  return <PostMaker makePost={makePost} />;
};

export default PostMakerContainer;
