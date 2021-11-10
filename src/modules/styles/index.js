import { createAction, handleActions } from 'redux-actions';

// Actions
const IS_DARK_MODE_ON = 'styles/IS_DARK_MODE_ON';
const IS_DARK_MODE_OFF = 'styles/IS_DARK_MODE_OFF';

// Action Creators
export const isDarkModeOn = createAction(IS_DARK_MODE_ON);
export const isDarkModeOff = createAction(IS_DARK_MODE_OFF);

// Sagas

// reducer
const initialState = {
  themeMode: 'LIGHT',
  isPopoverOpen: false // Select 클릭 시 세로 스크롤이 사라져 헤더가 우측으로 이동하는 것 방지
};

export default handleActions(
  {
    [IS_DARK_MODE_ON]: () => ({
      ...initialState,
      themeMode: 'DARK'
    }),
    [IS_DARK_MODE_OFF]: () => ({
      ...initialState,
      themeMode: 'LIGHT'
    })
  },
  initialState
);
