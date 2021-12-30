import { Login, Logout } from '../modules';
import { informationOpenAgreeEnum } from '../../src/DataExport';

it('Profile Page E2E test', () => {
  const id = 'test';
  const pw = 'asdfasdf';
  const newPw = 'asdfasdf!';
  cy.visit('/');
  Login(id, pw);
  cy.contains('프로필').click();

  cy.get('tr').should($tr => {
    expect($tr).to.have.length(10);
  });

  cy.get('#modeChanger').find('svg').click();
  cy.contains('개인정보 수정').click();
  cy.get('#nickname').should('be.visible');
  cy.get('#infoAgree').should('be.visible');
  cy.get('#password').should('be.visible');
  // 닉네임, 정보공유동의, 비밀번호 확인이 입력가능한지 확인

  cy.contains('취소').click();
  cy.get('tr').should($tr => {
    expect($tr).to.have.length(10);
  });

  cy.get('#modeChanger').find('svg').click();
  cy.get('#editMode').click();
  cy.get('#nickname').type(pw, { delay: 10 });
  cy.get('#refreshIcon').find('svg').click();
  cy.get('#nickname').should('have.value', 'FE_test');

  // 동의 여부에 따라 반대로 수정
  cy.get('#infoAgree').then($agreeBtn => {
    if ($agreeBtn.text().includes(`${informationOpenAgreeEnum.AGREE}`)) {
      $agreeBtn.click();
      cy.get('#infoAgree').should(
        'have.text',
        `${informationOpenAgreeEnum.DISAGREE}`
      );
      cy.get('#password').type(pw, { delay: 10 });
      cy.contains('수정').click();
      cy.contains(`${informationOpenAgreeEnum.DISAGREE}`).should('be.visible');
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

  // 비밀번호 변경 테스트
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
