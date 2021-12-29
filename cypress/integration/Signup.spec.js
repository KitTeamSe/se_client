function LogoutCheck() {
  cy.get('.LogedIn > button').should($btn => {
    expect($btn).to.have.length(2);
  });
}

function LoginCheck() {
  cy.get('.LogedOut > button').should($btn => {
    expect($btn).to.have.length(1);
  });
}

describe('Signup test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Signup and Withdrawal', () => {
    cy.contains('로그인').click();
    cy.contains('회원가입').click();
    cy.url().should(url => {
      expect(url).to.equal('http://localhost:3000/signup');
    });
    // signup page이동 테스트

    const randomId = Math.random().toString(36).substring(2, 10);
    const randomPw = Math.random().toString(36).substring(2, 10);
    const randomNick = Math.random().toString(36).substring(2, 10);
    const randomName = Math.random().toString(36).substring(2, 10);
    const randomEmail = `${Math.random()
      .toString(36)
      .substring(2, 10)}@naver.com`;
    const randomPhone = `010${String(Math.random()).substring(2, 10)}`;
    const randomStudentId = String(Math.random()).substring(2, 10);
    const randomAns = Math.random().toString(36).substring(2, 11);

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
    LogoutCheck();
    // 회원가입 후 자동로그인 테스트

    cy.contains('로그아웃').click();
    LoginCheck();
    // 로그아웃 테스트

    cy.contains('로그인').click();
    cy.get('#id').type(randomId, { delay: 10 });
    cy.get('#password').type(randomPw, { delay: 10 }).type('{enter}');
    cy.contains('프로필').click();
    cy.get('#modeChanger').click();
    cy.get('#withdrawalMode').click();
    cy.get('h2').should('have.text', '회원 탈퇴');
    // 회원탈퇴 화면 테스트

    cy.get('#password').type(randomPw, { delay: 10 });
    cy.get('#text').type('탈퇴', { delay: 10 });
    cy.get('button[type=submit').click();
    LogoutCheck();
    // 회원 탈퇴 테스트
  });
});
