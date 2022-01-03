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
  cy.contains('글쓰기').click();

  const randomTitle = `${String(Math.random()).substring(
    2,
    6
  )}_Test Post Add Anonymous User`;
  const randomText = String(Math.random()).substring(2, 8);

  // 익명 게시글 작성
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
