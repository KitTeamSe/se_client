describe('cypress test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Login', () => {
    cy.contains('로그인').click();
    cy.get('#id').type('test', { delay: 50 }).should('have.value', 'test');
    cy.get('#password')
      .type('asdfasdf', { delay: 50 })
      .should('have.value', 'asdfasdf')
      .type('{enter}');
    cy.get('.LoginDialog > button').should($btn => {
      expect($btn).to.have.length(2);
    });
  });
});
