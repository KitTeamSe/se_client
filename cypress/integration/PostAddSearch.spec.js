import { Login } from '../modules';

function Search(searchId, text, title) {
  cy.get('#formSelectField').click();
  cy.get(`#${searchId}`).click();
  cy.get('#text').type(text, { delay: 10 });
  cy.get('button[type=submit]').click();
  cy.contains(title).should('be.visible');
}

const id = 'test';
const pw = 'asdfasdf';
const randomTitle = `${String(Math.random()).substring(
  2,
  6
)}_Test Post Add Anonymous User`;
const randomText = String(Math.random()).substring(2, 8);
const randomReply = String(Math.random()).substring(2, 8);
const tag = '1학년';

describe('Posting Test', () => {
  describe('Anonymous User Posting', () => {
    beforeEach(() => {
      cy.visit('/');
    });
    it('posting anonymous user', () => {
      cy.contains('글쓰기').click();
      cy.get('#title').type(`${randomTitle}`);
      cy.get('.ck-content > p').type(randomText, { delay: 10 });
      cy.get('#anonymousNickname').type(id, { delay: 10 });
      cy.get('#anonymousPassword').type(pw, { delay: 10 });
      cy.contains('작성').click();
    });

    it('search anonymous Post', () => {
      Search('TITLE', randomTitle, randomTitle);
      Search('TEXT', randomText, randomTitle);
      Search('TITLE_TEXT', randomText, randomTitle);
      Search('TITLE_TEXT', randomTitle, randomTitle);
      Search('NICKNAME', id, randomTitle);
    });

    it('anonymous post Delete', () => {
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

    it('secret posting anonymous user', () => {
      cy.contains('글쓰기').click();
      cy.get('#title').type(`${randomTitle}`);
      cy.get('.ck-content > p').type(randomText, { delay: 10 });
      cy.get('#anonymousNickname').type(id, { delay: 10 });
      cy.get('#anonymousPassword').type(pw, { delay: 10 });
      cy.get('#isSecret').check();
      cy.contains('작성').click();
    });

    it('search secret post', () => {
      Search('TITLE', randomTitle, randomTitle);
      Search('TITLE_TEXT', randomTitle, randomTitle);
      Search('NICKNAME', id, randomTitle);
    });

    it('secret post delete', () => {
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
  });

  describe('LogedIn User Posting', () => {
    beforeEach(() => {
      cy.visit('/');
      Login(id, pw);
    });
    it('post with tag', () => {
      cy.contains('글쓰기').click();
      cy.get('#title').type(`${randomTitle}`);
      cy.get('#search-tag').type(tag, { delay: 10 });
      cy.get('#addTagBtn').click();
      cy.get('#tagList').should('have.text', tag);
      cy.get('#resetTagBtn').click(); // tag reset button click
      cy.get('#tagList').should('not.have.text', tag);

      cy.get('#search-tag').type(tag, { delay: 10 });
      cy.get('#addTagBtn').click();
      cy.get('#tagList').find('svg').click(); // tag X button click
      cy.get('#tagList').should('not.have.text', tag);

      cy.get('#addTagBtn').click();
      cy.get('.ck-content > p').type(randomText, { delay: 10 });
      cy.contains('작성').click();
    });

    it('write reply ', () => {
      cy.contains(randomTitle).click();
      cy.get('.ck-placeholder').type(randomReply, { delay: 10 });
      cy.contains('작성').click();
    });

    it('search normal post', () => {
      Search('REPLY', randomReply, randomTitle);
      Search('TAG', tag, randomTitle);
    });

    it('fix post', () => {
      cy.contains(randomTitle).click();
      cy.get('#more').click();
      cy.get('#fix').click();
      cy.get('.ck-content > p').type('1', { delay: 10 });
      cy.contains('작성').click();
      cy.contains(`${randomText}1`).should('be.visible');
    });

    it('delete normal post', () => {
      cy.contains(randomTitle).click();
      cy.get('#more').click();
      cy.get('#delete').click();
      cy.get('#delBtn').click();
      cy.contains('성공적으로 삭제되었습니다').should('be.visible');
      cy.visit('/');
      cy.contains(randomTitle).should('not.exist');
    });
  });
});
