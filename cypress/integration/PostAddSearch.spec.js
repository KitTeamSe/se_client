import { Login } from '../modules';

function Search(searchId, text, title) {
  cy.get('#formSelectField').click();
  cy.get(`#${searchId}`).click();
  cy.get('#text').type(text, { delay: 10 });
  cy.get('button[type=submit').click();
  cy.contains(title).should('be.visible');
}

it('Post add anonymous user', () => {
  cy.visit('/');
  const id = 'test';
  const pw = 'asdfasdf';
  const randomTitle = `${String(Math.random()).substring(
    2,
    6
  )}_Test Post Add Anonymous User`;
  const randomText = String(Math.random()).substring(2, 8);

  // 익명 게시글 작성
  cy.contains('글쓰기').click();
  cy.get('#title').type(`${randomTitle}`);
  cy.get('.ck-content > p').type(randomText, { delay: 10 });
  cy.get('#anonymousNickname').type(id, { delay: 10 });
  cy.get('#anonymousPassword').type(pw, { delay: 10 });
  cy.contains('작성').click();
  cy.visit('/');
  cy.contains(randomTitle).should('be.visible');

  // 여러조건으로 검색
  Search('TITLE', randomTitle, randomTitle);
  Search('TEXT', randomText, randomTitle);
  Search('TITLE_TEXT', randomText, randomTitle);
  Search('TITLE_TEXT', randomTitle, randomTitle);
  Search('NICKNAME', id, randomTitle);

  // 게시글 삭제
  cy.contains(randomTitle).click();
  cy.get('#more').click();
  cy.get('#anonyDelete').click();
  cy.contains('게시글 삭제').should('be.visible');
  cy.get('#nowPassword').type(pw, { delay: 10 });
  cy.get('#delBtn').click();
  cy.contains('성공적으로 삭제되었습니다').should('be.visible');
  cy.visit('/');
  cy.contains(randomTitle).should('not.exist');
});

it('Normal Post anonymous user', () => {
  cy.visit('/');
  const id = 'test';
  const pw = 'asdfasdf';
  const randomTitle = `${String(Math.random()).substring(
    2,
    6
  )}_Test Post Add Anonymous User`;
  const randomText = String(Math.random()).substring(2, 8);

  // 익명 게시글 작성
  cy.contains('글쓰기').click();
  cy.get('#title').type(`${randomTitle}`);
  cy.get('.ck-content > p').type(randomText, { delay: 10 });
  cy.get('#anonymousNickname').type(id, { delay: 10 });
  cy.get('#anonymousPassword').type(pw, { delay: 10 });
  cy.contains('작성').click();
  cy.visit('/');

  // 게시글 삭제
  cy.contains(randomTitle).click();
  cy.get('#more').click();
  cy.get('#anonyDelete').click();
  cy.contains('게시글 삭제').should('be.visible');
  cy.get('#nowPassword').type(pw, { delay: 10 });
  cy.get('#delBtn').click();
  cy.contains('성공적으로 삭제되었습니다').should('be.visible');
  cy.visit('/');
  cy.contains(randomTitle).should('not.exist');
});

it('Secret Posting add anonymous user', () => {
  cy.visit('/');
  const id = 'test';
  const pw = 'asdfasdf';
  const randomTitle = `${String(Math.random()).substring(
    2,
    6
  )}_Test Post Add Anonymous User`;
  const randomText = String(Math.random()).substring(2, 8);

  // 익명 게시글 작성
  cy.contains('글쓰기').click();
  cy.get('#title').type(`${randomTitle}`);
  cy.get('.ck-content > p').type(randomText, { delay: 10 });
  cy.get('#anonymousNickname').type(id, { delay: 10 });
  cy.get('#anonymousPassword').type(pw, { delay: 10 });
  cy.get('#isSecret').check();
  cy.contains('작성').click();
  cy.visit('/');

  // 여러조건으로 검색
  Search('TITLE', randomTitle, randomTitle);
  Search('TITLE_TEXT', randomTitle, randomTitle);
  Search('NICKNAME', id, randomTitle);

  // 게시글 삭제
  cy.contains(randomTitle).find('svg').should('be.visible');
  cy.contains(randomTitle).click();
  cy.get('#nowPassword').type(pw, { delay: 10 });
  cy.contains('확인').click();
  cy.get('#more').click();
  cy.get('#anonyDelete').click();
  cy.contains('게시글 삭제').should('be.visible');
  cy.get('#nowPassword').type(pw, { delay: 10 });
  cy.get('#delBtn').click();
  cy.contains('성공적으로 삭제되었습니다').should('be.visible');
  cy.visit('/');
  cy.contains(randomTitle).should('not.exist');
});

it('Normal Posting Logedin user', () => {
  cy.visit('/');
  const id = 'test';
  const pw = 'asdfasdf';
  const tag = '1학년';
  const randomTitle = `${String(Math.random()).substring(
    2,
    6
  )}_Test Post Add Logedin User`;
  const randomText = String(Math.random()).substring(2, 8);
  const randomReply = String(Math.random()).substring(2, 8);

  // 로그인 후 게시글 작성
  Login(id, pw);
  cy.contains('글쓰기').click();
  cy.get('#title').type(`${randomTitle}`);

  // 태그 생성 삭제
  cy.get('#search-tag').type(tag, { delay: 10 });
  cy.get('#addTagBtn').click();
  cy.get('#tagList').should('have.text', tag);
  cy.get('#resetTagBtn').click();
  cy.get('#tagList').should('not.have.text', tag);

  cy.get('#search-tag').type(tag, { delay: 10 });
  cy.get('#addTagBtn').click();
  cy.get('#tagList').find('svg').click();
  cy.get('#tagList').should('not.have.text', tag);

  cy.get('#addTagBtn').click();

  cy.get('.ck-content > p').type(randomText, { delay: 10 });
  cy.contains('작성').click();
  cy.visit('/');

  // 댓글 작성
  cy.contains(randomTitle).should('be.visible').click();
  cy.get('.ck-placeholder').type(randomReply, { delay: 10 });
  cy.contains('작성').click();
  cy.visit('/');

  // 여러 조건으로 검색

  Search('REPLY', randomReply, randomTitle);
  Search('TAG', tag, randomTitle);

  // 게시글 삭제
  cy.contains(randomTitle).click();
  cy.get('#more').click();
  cy.get('#delete').click();
  cy.get('#delBtn').click();
  cy.contains('성공적으로 삭제되었습니다').should('be.visible');
  cy.visit('/');
  cy.contains(randomTitle).should('not.exist');
});
