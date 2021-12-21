/* eslint-disable */

import React from 'react';
import { mount } from 'enzyme';
import ProfilePage from '../components/ProfilePage/ProfilePage';

const infoObj = null;
const infoEditObj = null;
const anchorEl = null;
const mode = null;
const loading = null;

describe('프로필 화면 스냅샷', () => {
  it('renders post write', () => {
    const wrapper = mount(<ProfilePage infoObj={infoObj} infoEditObj={infoEditObj} anchorEl={infoEditObj} mode={infoEditObj} loading={infoEditObj}/>);
    expect(wrapper).toMatchSnapshot();
  });
});


