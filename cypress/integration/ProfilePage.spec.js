import { Login, Logout } from '../modules';
import { informationOpenAgreeEnum } from '../../src/DataExport';

const id = 'test';
const pw = 'asdfasdf';
const newPw = 'asdfasdf!';

describe('Profile Test', () => {
  beforeEach(() => {
    cy.visit('/');
    Login(id, pw);
    cy.contains('프로필').click();
  });

  it('profile check', () => {
    cy.get('tr').should($tr => {
      expect($tr).to.have.length(10);
    });
  });

  it('info open agree edit', () => {
    cy.get('#modeChanger').find('svg').click();
    cy.contains('개인정보 수정').click();
    cy.get('#nickname').should('be.visible');
    cy.get('#infoAgree').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.contains('취소').click();
    cy.get('tr').should($tr => {
      expect($tr).to.have.length(10);
    });
    cy.get('#modeChanger').find('svg').click();
    cy.get('#editMode').click();
    cy.get('#nickname').type(pw, { delay: 10 });
    cy.get('#refreshIcon').find('svg').click();
    cy.get('#nickname').should('have.value', 'FE_test');
    cy.get('#infoAgree').then($agreeBtn => {
      if ($agreeBtn.text().includes(`${informationOpenAgreeEnum.AGREE}`)) {
        $agreeBtn.click();
        cy.get('#infoAgree').should(
          'have.text',
          `${informationOpenAgreeEnum.DISAGREE}`
        );
        cy.get('#password').type(pw, { delay: 10 });
        cy.contains('수정').click();
        cy.contains(`${informationOpenAgreeEnum.DISAGREE}`).should(
          'be.visible'
        );
      } else {
        $agreeBtn.click();
        cy.get('#infoAgree').should(
          'have.text',
          `${informationOpenAgreeEnum.AGREE}`
        );
        cy.get('#password').type(pw, { delay: 10 });
        cy.contains('수정').click();
        cy.contains(`${informationOpenAgreeEnum.AGREE}`).should('be.visible');
      }
    });
  });

  it('password change', () => {
    cy.get('#modeChanger').find('svg').click();
    cy.get('#pwChangeMode').click();
    cy.get('#nowPassword').type(pw, { delay: 10 });
    cy.get('#newPassword').type(newPw, { delay: 10 });
    cy.get('#newPasswordConfirm').type(newPw, { delay: 10 });
    cy.contains('변경하기').click();
    Logout();
    Login(id, newPw);
    cy.contains('프로필').click();
    cy.get('#modeChanger').find('svg').click();
    cy.get('#pwChangeMode').click();
    cy.get('#nowPassword').type(newPw, { delay: 10 });
    cy.get('#newPassword').type(pw, { delay: 10 });
    cy.get('#newPasswordConfirm').type(pw, { delay: 10 });
    cy.contains('변경하기').click();
    Logout();
  });
});
