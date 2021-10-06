/*
 * Redux Saga 상태를 네 단계로 나누었습니다.
 * initial : 초기상태
 * loading : api 호출 상태
 * success : api 호출 성공 상태
 * error   : api 호출 실패 상태
 */

const reducerUtils = {
  initial: (initialData = null) => ({
    loading: false,
    data: initialData,
    error: null
  }),
  loading: (prevState = null) => ({
    loading: true,
    data: prevState,
    error: null
  }),
  success: payload => ({
    loading: false,
    data: payload,
    error: null
  }),
  error: error => ({
    loading: false,
    data: null,
    error
  })
};

export default reducerUtils;
