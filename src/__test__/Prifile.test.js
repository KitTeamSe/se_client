/* eslint-disable */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PropfilePage from '../components/ProfilePage/ProfilePage';
import { BrowserRouter as Router } from 'react-router-dom';

describe('ProfilePage', () => {
  it('컴포넌트 기본요소 렌더링 되었는지 확인', () => {
    const infoObj = {
      accountId: 4,
      email: "test@test.com",
      idString: "test",
      informationOpenAgree: "DISAGREE",
      lastSignInIp: "119.202.133.187",
      name: "길무짱",
      nickname: "FE_test",
      phoneNumber: "01011332211",
      studentId: "20133355",
      type: "STUDENT"
    };
    const doc = render(
      <Router>
        <PropfilePage infoObj={infoObj}/>
      </Router>
    )

    doc.getByText('4');
    doc.getByText('test@test.com');
    doc.getByText('test');
    doc.getByText('❌DISAGREE');
    doc.getByText('119.202.133.187');
    doc.getByText('길무짱');
    doc.getByText('FE_test');
    doc.getByText('01011332211');
    doc.getByText('20133355');
    doc.getByText('STUDENT');
  });
});

