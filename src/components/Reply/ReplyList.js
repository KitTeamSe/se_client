import React from 'react';
import Reply from './Reply';

const testData = [
  {
    replyId: 1,
    accountId: 'testAdmin',
    anonymousNickname: '',
    text: '<p>testsetsetset</p>',
    createAt: [2021, 8, 22, 23, 6, 1, 55555000],
    child: [
      {
        replyId: 2,
        accountId: 'testUser',
        anonymousNickname: '',
        text: '<p>rerere</p>',
        createAt: [2021, 8, 22, 23, 16, 2, 55555000],
        child: []
      },

      {
        replyId: 4,
        accountId: 'testAdmin',
        anonymousNickname: '',
        text: '<p>rererererere</p>',
        createAt: [2021, 8, 22, 23, 16, 3, 55555000],
        child: []
      }
    ]
  },
  {
    replyId: 3,
    accountId: '',
    anonymousNickname: 'testAnonyddddddddddddddddddddddd',
    text: '<p>testsetsetset</p>',
    createAt: [2021, 8, 22, 23, 16, 5, 55555000],
    child: []
  }
];

const ReplyList = props => {
  const { data, loading, error } = props;

  return (
    <>
      {!loading && data
        ? data.map(e => (
            <Reply
              replyId={e.replyId}
              accountId={e.accountId}
              anonymousNickname={e.anonymousNickname}
              content={e.text}
              createAt={e.createAt}
              child={e.child}
            />
          ))
        : testData.map(e => (
            <Reply
              replyId={e.replyId}
              accountId={e.accountId}
              anonymousNickname={e.anonymousNickname}
              content={e.text}
              createAt={e.createAt}
              child={e.child}
            />
          ))}
      {loading && <div>데이터를 불러오는 중입니다.</div>}
      {!loading && error ? (
        <div>
          데이터를 불러올 수 없습니다. 새로고침을 하거나 관리자에게 문의하세요.
        </div>
      ) : null}
    </>
  );
};
export default ReplyList;
