import { useEffect } from 'react';
import { connect } from 'react-redux';
import Router from './Router';

import { getUserInfoAction,
        getBookingTourAction,
} from './redux/actions';

function App({getUserInfo, getBookingTour}) {

  // const productList = [
  //   {
  //     id: 1,
  //     name: "Sapa",
  //     img:'//cdn1.ivivu.com/iVivu/2019/09/18/16/sa-pa-370x190.png',
  //   },
  //   {
  //     id: 2,
  //     name: " Hà Nội",
   
  //     img:'https://img1.kienthucvui.vn/uploads/2019/07/19/anh-dep-ho-hoan-kiem-ve-dem_112947987.jpg',
  //   },
  //   {
  //     id: 3,
  //     name: "Hạ Long",
  //     img:'//cdn1.ivivu.com/iVivu/2019/03/07/16/phuquoc-755x190.jpg',
  //   },
  //   {
  //     id: 4,
  //     name: "  Đà nẵng",
  //     comment:" Bãi Bắc, Bán Đảo Sơn Trà, Đà Nẵng, Việt Nam",
  //     img:'//cdn1.ivivu.com/iVivu/2018/09/14/14/danang_2-370x395.png',
  //   },
  //   {
  //     id: 5,
  //     name: "Quảng nam",
  //     img:'https://danangaz.com/wp-content/uploads/2019/07/ava-.jpg',
  //   },
  //   {
  //     id: 6,
  //     name: "Quy Nhơn",
  //     img:'//cdn1.ivivu.com/iVivu/2018/09/14/14/quynhon_2-370x190.jpg',
  //   },
  //   {
  //     id: 7,
  //     name: "Đà lạt",
  //     img:'//cdn1.ivivu.com/iVivu/2019/09/18/16/da-lat-755x190.png',
  //   },
  //   {
  //     id: 8,
  //     name: "Nha Trang",
  //     img:'//cdn1.ivivu.com/iVivu/2018/09/14/14/nhatrang_1-370x190.jpg',
  //   },
  //   {
  //     id: 9,
  //     name: "Bình Dương",
  //     img:'//cdn1.ivivu.com/iVivu/2018/09/14/14/vungtau_2-370x395.jpg',
  //   },
  //   {
  //     id: 10,
  //     name:"Cà Mau",
  //     img:'//cdn1.ivivu.com/iVivu/2017/01/23/11/khu-nghi-duong-the-graden-house-phu-quoc-374x280.png',
  //   },
  // ];

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.id) {
      getUserInfo({ id: userInfo.id });
    }
    getBookingTour();
  }, []);

  return (
    <div style={{backgroundColor:"#ecf0f5"}} >
      <Router />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: (params) => dispatch(getUserInfoAction(params)),
    getBookingTour: (params) => dispatch(getBookingTourAction(params))
  };
}

export default connect(null, mapDispatchToProps)(App);
