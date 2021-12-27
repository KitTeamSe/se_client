/* eslint-disable */

import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';

import { infoObj, infoEditObj } from './ProfileData';
import PropfilePage from '../components/ProfilePage/ProfilePage';
import PwChangeDialog from '../components/ProfilePage/PwChangeDialog';
import WithdrawalDialog from '../components/ProfilePage/WithdrawalDialog';

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
    const mode = null;
    const doc = render(
      <Router>
        <PropfilePage infoObj={infoObj} loading={loading} mode={mode}/>
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
    const doc = mount(
      <Router>
        <PropfilePage infoObj={infoObj} infoEditObj={infoEditObj} mode={mode} handleChange={handleChange}/>
      </Router>
    )
    const inputTag = doc.find('input');
    expect(inputTag.length).toBe(2);
  })

  it('pwChangeMode 테스트', () => {
    const mode = 'pwChangeMode';
    const newPwForm = {nowPassword: '', newPassword:'',newPasswordConfirm:''}
    const doc = mount(
      <Router>
        <PwChangeDialog mode={mode} newPwForm={newPwForm}/>
      </Router>
    )
    const inputTag = doc.find('input');
    expect(inputTag.length).toBe(3);
    const btn = doc.find('button');
    expect(btn.length).toBe(2);
  })

  it('withdrawalMode 테스트', () => {
    const mode = 'withdrawalMode';
    const withDrawalForm = {password: '', text: ''};
    const doc = mount(
      <Router>
        <WithdrawalDialog mode={mode} withDrawalForm={withDrawalForm}/>
      </Router>
    )
    const inputTag = doc.find('input');
    expect(inputTag.length).toBe(2);
    const btn = doc.find('button');
    expect(btn.length).toBe(2);
  })
});

// import { Route, MemoryRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import createSagaMiddleware from 'redux-saga';
// import { applyMiddleware, compose, createStore } from 'redux';
// import rootReducer, { rootSaga } from '../modules';
// import ProfilePageContainer from '../containers/ProfilePage/ProfilePageContainer';
// import { data } from './ProfileData';

// describe('ProfilePage Container', () => {

//   //redux
//   const sagaMiddleware = createSagaMiddleware();
//   const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//   const store = createStore(
//     rootReducer,
//     composeEnhancer(applyMiddleware(sagaMiddleware))
//   );
//   sagaMiddleware.run(rootSaga);

//   //local storage
//   const localStorageMock = (function() {
//     const store = {token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNjQwNTA5MTMzLCJleHAiOjE2NDA1MTI3MzN9.gwIGzIkggXQAzzXuZi7mcGXxeNR7_MVHxemy4u8A-bo', userId: 'test'};
//     return {
//       getItem: function(key){
//         return store[key] || null;
//       },
//       setItem: function(key, value) {
//           store[key] = value.toString();
//       },
//       clear: function() {
//           store = {};
//       }
//     };
//   })();
//   Object.defineProperty(window, 'localStorage', {
//     value: localStorageMock
//   });

//   it('rendering test', async() => {
//     const loading = false;
//     const doc = await mount(
//       <Provider store={store}>
//         <MemoryRouter initialEntries={['/profile/test']}>
//           <Route component={props => <ProfilePageContainer {...props} infoObj={infoObj} loading={loading} data={data} />} path='/profile/:userId' />
//         </MemoryRouter>
//       </Provider>
//     )
//     expect(doc).toMatchSnapshot();
//   })
// })
