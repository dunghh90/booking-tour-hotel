import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import history from '../../utils/history';
import { notification } from 'antd';

function* loginSaga(action) {
  try {
    const { email, password, prevPath } = action.payload;
    console.log("🚀 ~ file: user.saga.js ~ line 9 ~ function*loginSaga ~ email", email)
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
      
      yield history.push(prevPath?prevPath:'/');
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
    const result = yield axios({
      method: 'POST',
      url: 'http://localhost:3002/users',
      data: { email, password, name }
    });
    yield notification.open({
      message: 'Đăng kí thành công',
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
    const { id, email, name, birthday, gender, phone, passwordNew } = action.payload;
    
    const result = passwordNew?
      yield axios({
        method: 'PATCH',
        url: `http://localhost:3002/users/${id}`,
        data: { password: passwordNew },
      }) :
      yield axios({
          method: 'PATCH',
          url: `http://localhost:3002/users/${id}`,
          data: { email, name,birthday,gender,phone},
      });
    yield localStorage.setItem('userInfo', JSON.stringify(result.data));
    
    yield notification.open({
      message: 'cập nhật thông tin thành công',
      // description: `Bạn đã đặt tour ngày`,
    });
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
