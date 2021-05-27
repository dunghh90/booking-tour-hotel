import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import history from '../../utils/history';

function* loginSaga(action) {
  try {
    const { email, password } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3002/users',
      params: {
        email,
        password,
      }
    });
    if (result.data.length > 0) {
      localStorage.setItem('userInfo', JSON.stringify(result.data[0]));
      yield put({
        type: "LOGIN_SUCCESS",
        payload: {
          data: result.data[0],
        },
      });
      
      yield history.push('/');
    } else {
      yield put({
        type: "LOGIN_FAIL",
        payload: {
          error: 'Email hoặc mật khẩu không đúng',
        },
      });
    }
  } catch (e) {
    yield put({
      type: "LOGIN_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* registerSaga(action) {
  try {
    const { email, password, name,birthday,gender,phone } = action.payload;
    console.log("🚀 ~ file: user.saga.js ~ line 47 ~ function*registerSaga ~ email", email)
    const result = yield axios({
      method: 'POST',
      url: 'http://localhost:3002/users',
      data: { email, password, name }
    });
    yield put({
      type: "REGISTER_SUCCESS",
      payload: {
        data: result.data[0],
      },
    });
    window.location.reload();
  } catch(e) {
    yield put({
      type: "REGISTER_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getUserInfoSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:3002/users/${id}`);
    yield put({
      type: "GET_USER_INFO_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_USER_INFO_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}
function* updateProfileSaga(action) {
  
  try {
    const { id, email, name, birthday, gender, phone } = action.payload;
    
    const result = yield axios({
        method: 'PATCH',
        url: `http://localhost:3002/users/${id}`,
        data: { email, name,birthday,gender,phone},
      });
    console.log("🚀 ~ file: user.saga.js ~ line 99 ~ function*addProfileSaga ~ result", result)
    yield localStorage.setItem('userInfo', JSON.stringify(result.data));
    yield put({
      type: "UPDATE_PROFILE_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch(e) {
    yield put({
      type: "UPDATE_PROFILE_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

export default function* userSaga() {
  yield takeEvery('LOGIN_REQUEST', loginSaga);
  yield takeEvery('REGISTER_REQUEST', registerSaga);
  yield takeEvery('GET_USER_INFO_REQUEST', getUserInfoSaga);
  yield takeEvery('UPDATE_PROFILE_REQUEST', updateProfileSaga);
}
