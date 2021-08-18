import React from 'react';
import PostMaker from '../../components/PostMaker/PostMaker';
import { makeSomePost } from '../../libs/api/post';

const makePost = async () => {
  const attachedFiles = [];
  const data = {
    anonymous: {
      anonymousNickname: '길무짱',
      anonymousPassword: '1234'
    },
    boardId: 1,
    isNotice: 'NORMAL',
    isSecret: 'NORMAL',
    postContent: {
      text: 'ㅇㅁ니럼ㄴ아럼ㄴ이ㅏ럼ㄴ이ㅏ럼나ㅣㅓ라ㅣㄴㅇ멀',
      title:
        '제목이길면 어떻게 어떻제목이길면 어?제목어떻게 될까?제목이길면 어떻게 될까?제목이길면???'
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
