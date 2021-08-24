import React from 'react';
import Reply from './Reply';

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
        : null}
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
