import { Login, LoginCheck, Logout, LogoutCheck } from '../modules';

const randomId = Math.random().toString(36).substring(2, 10);
const randomPw = Math.random().toString(36).substring(2, 10);
const randomNick = Math.random().toString(36).substring(2, 10);
const randomName = Math.random().toString(36).substring(2, 10);
const randomEmail = `${Math.random().toString(36).substring(2, 10)}@naver.com`;
const randomPhone = `010${String(Math.random()).substring(2, 10)}`;
const randomStudentId = String(Math.random()).substring(2, 10);
const randomAns = Math.random().toString(36).substring(2, 11);

describe('Signup and Withdrawal Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('signup', () => {
    cy.contains('로그인').click();
    cy.contains('회원가입').click();
    cy.url().should(url => {
      expect(url).to.equal('http://localhost:3000/signup');
    });
    cy.get('#id').type(randomId, { delay: 10 });
    cy.get('#password').type(randomPw, { delay: 10 });
    cy.get('#passwordCheck').type(randomPw, { delay: 10 });
    cy.get('#nickname').type(randomNick, { delay: 10 });
    cy.get('#name').type(randomName, { delay: 10 });
    cy.get('#email').type(randomEmail, { delay: 10 });
    cy.get('#phoneNumber').type(randomPhone, { delay: 10 });
    cy.get('#studentId').type(randomStudentId, { delay: 10 });
    cy.get('#answer').type(randomAns, { delay: 10 });
    cy.get('button[type=submit').click();
    LoginCheck();
    Logout();
  });

  it('Withdrawal', () => {
    Login(randomId, randomPw);
    cy.contains('프로필').click();
    cy.get('#modeChanger').find('svg').click();
    cy.contains('회원탈퇴').click();
    cy.get('h2').should('have.text', '회원 탈퇴');
    // 회원탈퇴 화면 테스트

    cy.get('#password').type(randomPw, { delay: 10 });
    cy.get('#text').type('탈퇴', { delay: 100 });
    cy.get('button[type=submit').click();
    LogoutCheck();
  });
});
