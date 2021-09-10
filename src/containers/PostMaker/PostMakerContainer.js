import React from 'react';
import PostMaker from '../../components/PostMaker/PostMaker';
import { makeSomePost } from '../../libs/api/post';

const makePost = async () => {
  const data = {
    anonymous: {
      anonymousNickname: '익명사용자',
      anonymousPassword: 'asdf1234'
    },
    attachmentList: [],
    boardId: 1,
    isNotice: 'NORMAL',
    isSecret: 'NORMAL',
    postContent: {
      text: 'ㅅㄷㄴㅅㄷ나미섬니ㅏㅓㅣㅏㅁ',
      title: '안녕하세요~~~~~'
    },
    tagList: [{ tagId: 1 }]
  };
  if (data.postContent.title.length > 50) {
    console.log('제목수는 50자를 초과할수 없습니다');
    return;
  }
  const res = await makeSomePost({ data });
  console.log(res);
};
const PostMakerContainer = () => {
  return <PostMaker makePost={makePost} />;
};

export default PostMakerContainer;
