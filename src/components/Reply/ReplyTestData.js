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

export default testData;
