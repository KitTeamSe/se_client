import { createAction, handleActions } from 'redux-actions';

// Actions
const IS_SELECT_CLOSE = 'styles/IS_SELECT_CLOSE';
const IS_SELECT_OPEN = 'styles/IS_SELECT_OPEN';

// Action Creators
export const isPopoverClose = createAction(IS_SELECT_CLOSE);
export const isPopoverOpen = createAction(IS_SELECT_OPEN);

// Sagas

// reducer
const initialState = {
  isPopoverOpen: false // Select 클릭 시 세로 스크롤이 사라져 헤더가 우측으로 이동하는 것 방지
};

export default handleActions(
  {
    [IS_SELECT_CLOSE]: () => ({
      ...initialState,
      isPopoverOpen: false
    }),
    [IS_SELECT_OPEN]: () => ({
      ...initialState,
      isPopoverOpen: true
    })
  },
  initialState
);
