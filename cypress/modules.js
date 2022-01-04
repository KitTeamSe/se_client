export function LoginCheck() {
  cy.get('.LogedIn > button').should($btn => {
    expect($btn).to.have.length(2);
  });
}
export function Login(id, pw) {
  cy.contains('로그인').click();
  cy.get('#id').type(id, { delay: 10 });
  cy.get('#password').type(pw, { delay: 10 }).type('{enter}');
  LoginCheck();
}

export function LogoutCheck() {
  cy.get('.LogedOut > button').should($btn => {
    expect($btn).to.have.length(1);
  });
}
export function Logout() {
  cy.contains('로그아웃').click();
  LogoutCheck();
}
