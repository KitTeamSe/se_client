/* eslint-disable */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PropfilePage from '../components/ProfilePage/ProfilePage';
import { BrowserRouter as Router } from 'react-router-dom';
import { infoObj, infoEditObj } from './ProfileData';

describe('ProfilePage', () => {
  it('로딩화면 테스트', () => {
    const loading = true;
    const doc = render(
      <Router>
        <PropfilePage loading={loading}/>
      </Router>
    )
    expect(doc).toMatchSnapshot();
  })

  it('컴포넌트 요소들이 렌더링 되었는지 확인', () => {

    const loading = false;
    const doc = render(
      <Router>
        <PropfilePage infoObj={infoObj} loading={loading}/>
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

  it('editMode 테스트', () => {
    const mode = 'editMode';
    const handleChange = jest.fn();
    const doc = render(
      <Router>
        <PropfilePage infoObj={infoObj} infoEditObj={infoEditObj} mode={mode} handleChange={handleChange}/>
      </Router>
    )
    expect(1).toBe(1);
  })

});

