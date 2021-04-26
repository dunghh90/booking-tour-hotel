import { connect } from 'react-redux';
import { Space, Button } from 'antd';

import history from '../../../utils/history';
import { logoutAction } from '../../../redux/actions';

function Header(props) {
  const { userInfo, logout } = props;

  return (
    <div>
      {userInfo.data.id 
        ? (
          <Space>
            <p>{`Tên đăng nhập: ${userInfo.data.name}`}</p>
            <Button onClick={() => logout()}>Đăng xuất</Button>
          </Space>
        )
        : <Button onClick={() => history.push('/login')}>Đăng nhập</Button>
      }
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (params) => dispatch(logoutAction(params)),
  };
}

const mapStateToProps = (state) => {
  const { userInfo } = state.userReducer;
  // console.log('🚀 ~ file: index.jsx ~ line 13 ~ mapStateToProps ~ userInfo', userInfo);
  return {
    userInfo,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);