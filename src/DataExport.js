export const questionList = [
  { questionid: 1, question: '다른 이메일 주소는?' },
  { questionid: 2, question: '나의 보물 1호는?' },
  { questionid: 3, question: '나의 출신 초등학교는?' },
  { questionid: 4, question: '나의 출신 고향은?' },
  { questionid: 5, question: '나의 이상형은?' },
  { questionid: 6, question: '어머니 성함은?' },
  { questionid: 7, question: '아버지 성함은?' },
  { questionid: 8, question: '가장 좋아하는 색깔은?' },
  { questionid: 9, question: '가장 좋아하는 음식은?' }
];

export const typeList = [
  { typeid: 1, userType: 'STUDENT' },
  { typeid: 2, userType: 'PROFESSOR' },
  { typeid: 3, userType: 'ASSISTANT' }
];

export const accountData = {
  accountId: 'PK',
  idString: 'ID',
  name: '이름',
  nickname: '닉네임',
  email: '이메일',
  type: '타입',
  phoneNumber: '전화번호',
  studentId: '학번',
  informationOpenAgree: '정보공유동의',
  lastSignInIp: '최근접속IP'
};

export const changebleAccount = [
  'nickname',
  'email',
  'type',
  'phoneNumber',
  'informationOpenAgree'
];

export const informationOpenAgreeEnum = {
  AGREE: '🟢AGREE',
  DISAGREE: '❌DISAGREE'
};

export const menuList = [
  { name: 'freeboard', url: 'freeboard', boardId: 1 },
  { name: 'archive', url: 'archive', boardId: 2 },
  { name: '전공지식', url: 'tip', boardId: 3 },
  { name: '지식인', url: 'naver', boardId: 4 },
  { name: 'PC고장신고', url: 'pc', boardId: 5 },
  { name: '학생회 재정 보고', url: 'council_info', boardId: 6 },
  { name: '딥러닝 & iMac', url: 'imac', boardId: 7 },
  { name: '330예약', url: 'book', boardId: 8 }
];

export const postSearchTypeList = [
  { type: 'TITLE_TEXT', name: '제목+내용' },
  { type: 'TITLE', name: '제목' },
  { type: 'TEXT', name: '내용' },
  { type: 'REPLY', name: '댓글' },
  { type: 'NICKNAME', name: '닉네임' },
  { type: 'USERID', name: '사용자 ID' },
  { type: 'TAG', name: '태그' }
];

export const tagList = {
  1: { name: '1학년', color1: '74f2ce', color2: '7cffcb' },
  2: { name: '2학년', color1: '83eaf1', color2: '63a4ff' },
  3: { name: '3학년', color1: 'f6f0c4', color2: 'd99ec9' }
};
