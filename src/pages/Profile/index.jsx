import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Space, Card, InputNumber, Button, Row, Col, Radio, Menu, Form, Input, DatePicker, Table } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import history from '../../utils/history';
import { Redirect } from 'react-router-dom';
import logoUser from '../../img/user-48.png';
import moment from 'moment';
import './style.css';
import {
  getBookingHotelsAction,
  getBookingTourAction,
  updateProfileAction,
} from '../../redux/actions';
import {
  registerAction,

} from '../../redux/actions';

function ProfilePage({
  bookingTours,
  getBookingHotels,
  getBookingTours,
  updateUser,
  bookingHotels,
  userInfo,
  match
}) {

  const userId = match.params.id;
  const [selectObject, setSelectObject] = useState(1);
  const userInfoLocal = JSON.parse(localStorage.getItem('userInfo'));

  const layout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 12 },
  };
  useEffect(() => {
    getBookingHotels({
      page: 1,
      limit: 10,
      userId: userId
    });
    getBookingTours({
      page: 1,
      limit: 10,
      userId: userId
    });
  },[])
  
  if (!userInfo.data.id && !userInfoLocal) {
    return <Redirect to="/login"/>;
  }

  function updateUserInfo(values) {
    const newValues = {
      ...values,
      id: userInfo.data.id,
      birthday: moment(values.birthday).format('YYYY/MM/DD'),
    }
    updateUser(newValues);
  }

  function changePassword(values) {
    const newValues = {
      ...values,
      id: userInfo.data.id,
    }
    console.log("🚀 ~ file: index.jsx ~ line 65 ~ changePassword ~ values", newValues)
    updateUser(newValues);
  }

  function renderUserInfo(){
      return (
        <>
        <div className='localProfileLine' style={{width:'100%'}}>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
        <Form
          // form={form}
          {...layout}
          name="changeInfo"
          onFinish={(values) => updateUserInfo(values)}
          initialValues={{
            email: userInfoLocal.email,
            name: userInfoLocal.name,
            phone: userInfoLocal.phone,
            gender: userInfoLocal.gender,
            birthday: moment(userInfoLocal.birthday, 'YYYY/MM/DD')
          }}
          style={{ width: 700 }}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="Họ và tên"
            rules={[
              {
                required: true,
                message: 'Họ và tên chưa được nhập!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: 'email',
                message: 'Nhập E-mail không hợp lệ!',
              },
              {
                required: true,
                message: 'E-mail chưa được nhập!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              {
                required: true,
                message: 'Số điện thoại chưa được nhập!',
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Giới tính"
            rules={[{ required: true, message: 'Chưa chọn giới tính!' }]}
          >
            <Radio.Group value={2}>
              <Radio value="male">Nam</Radio>
              <Radio value="female">Nữ</Radio>
            </Radio.Group>
          </Form.Item>


          <Form.Item
            name="birthday"
            label="Ngày sinh"
            rules={[{ required: true, message: 'Ngày sinh chưa được nhập!' }]}
          >
            <DatePicker />
          </Form.Item>
          <Row >
            <Col span={12}></Col>
            <Col span={12}>
              <Button type="primary" style={{ width: "150px" }} htmlType="submit">
                Lưu
                </Button>
            </Col>
          </Row>
         
        </Form>
        {/* { renderUserInfo()} */}
        </>
      );
  }

  function renderChangePass() {
    return (
      <>
      <div className='localProfileLine' style={{width:'100%'}}>Đổi Mật Khẩu</div>
      <Form
        {...layout}
        name="changePassword"
        onFinish={(values) => changePassword(values)}
        style={{ width: 700 }}
        scrollToFirstError
      >
        <Form.Item
          name="password"
          label="Mật khẩu hiện tại"
          rules={[
            {
              required: true,
              message: 'Mật khẩu hiện tại chưa được nhập!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="passwordNew"
          label="Mật khẩu mới"
          rules={[
            {
              required: true,
              message: 'Mật khẩu mới chưa được nhập!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="passwordConfirm"
          label="Xác nhận mật khẩu"
          rules={[
            {
              required: true,
              message: 'Xác nhận mật khẩu chưa được nhập!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('passwordNew') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Nhập confirm password không trùng khớp!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Row >
          <Col span={12}></Col>
          <Col span={12}>
            <Button type="primary" style={{ width: "150px" }} htmlType="submit">
              Xác nhận
                  </Button>
          </Col>
        </Row>
      </Form>
      </>
    );
  }

  function renderHistoryBookingHotel() {
    const tableColumn = [
      {
        title: 'TÊN KHÁCH SẠN',
        dataIndex: 'hotelName',
        key: 'hotelName',
        with: 230,
      },
      {
        title: 'LOẠI PHÒNG',
        dataIndex: 'roomName',
        key: 'roomName',
        with: 230,
      },
      {
        title: 'GIÁ',
        dataIndex: 'price',
        key: 'price',
        with: 230,
      },
      {
        title: 'NGÀY ĐẶT',
        dataIndex: 'date',
        key: 'date',
        with: 230,
      },
    ]
    const tableData = bookingHotels.data.map((item) => {
      return {
        ...item,
        hotelName: item.hotel.name,
        roomName: item.room.title,
        price: item.totalPrice.toLocaleString() + " VNĐ",
        date: `${item.startDate} - ${item.endDate}`,
        key: item.id,
      }
    });
    return <Table style={{width:'100%'}} columns={tableColumn} dataSource={tableData} pagination={false} />
 
  }
  function renderHistoryBookingTour() {
    const tableColumn = [
      {
        title: 'TOUR',
        dataIndex: 'tourName',
        key: 'tourName',
       
      },
      {
        title: 'NGƯỜI LỚN',
        dataIndex: 'adults',
        key: 'adults',
      },
   
      {
        title: 'TRẺ EM',
        dataIndex: 'child',
        key: 'child',
      },
      {
        title: 'GIÁ',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'NGÀY ĐẶT',
        dataIndex: 'date',
        key: 'date',
      },
    ]
    const tableData = bookingTours.data.map((item) => {
      return {
        ...item,
        tourName: item.tour.name,
        price: item.totalPrice.toLocaleString() + " VNĐ",
        adults: item.numberAdults,
        child: item.numberChild,
        date: item.startDate,
        key: item.id,
      }
    });
    return <Table style={{width:'100%'}} columns={tableColumn} dataSource={tableData} pagination={false} />
  }

  function renderHistory() {
    return (
      <div>
        <div className='localProfileLine' style={{width:'100%'}}>Lịch sử đặt tour và khách sạn</div>
        <div style={{fontWeight:600, fontSize:16, padding:'0 0 10px'}}>Khách sạn đã đặt</div>
        <Row>

        {renderHistoryBookingHotel()}
        </Row>
        <div style={{fontWeight:600, fontSize:16, padding:'10px 0'}}>Tour đã đặt</div>
        <Row>

        {renderHistoryBookingTour()}
        </Row>
      </div>
    )


  }
  function renderContent() {
    if (selectObject == 1) {
      return renderUserInfo();
    } else if (selectObject == 2) {
      return renderChangePass();
    } else {
      return renderHistory();
    }
  }

  return (
    <>
    <Row  gutter={16} style={{ padding: '16px 16px 0',marginTop: 50, minHeight:800 }}>
      <Col span={6}>
        <div style={{ height: '100%', backgroundColor:'white' }}>
          <div style={{padding:'15px 10px 0px 10px'}}>
            <div className='localProfileLine' style={{padding:10, width:'90%'}}>
              <img src={logoUser}/>
              {userInfo.data.name}
            </div>
          </div>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
          >
            {/* <Menu.ItemGroup key="userInfo" icon={<UserOutlined />} title="Thông tin của tôi"> */}
            <Menu.SubMenu key="userInfo" icon={<UserOutlined />} title="Thông tin của tôi">
            {/* <Menu.ItemGroup key="g1" title={<><UserOutlined /> <span>Thông tin của tôi</span></>}> */}
              <Menu.Item key="1"
                onClick={() => setSelectObject(1)}
              >Tài khoản</Menu.Item>
              <Menu.Item key="2"
                onClick={() => setSelectObject(2)}
              >Đổi mật khẩu</Menu.Item>
            {/* </Menu.ItemGroup> */}
            </Menu.SubMenu>
            <Menu.Item key="userHistory" icon={<LaptopOutlined />}
              onClick={() => setSelectObject(3)}
            >
              Lịch sử booking
            </Menu.Item>
            {/* <Menu.ItemGroup key="g2" > */}
            {/* </Menu.ItemGroup> */}
          </Menu>
        </div>
      </Col>
      <Col span={18}>
          <div style={{ backgroundColor: "white", padding: 20, height: "100%" }}>
          <Row>
            {renderContent()}

          </Row>
          </div>
      </Col>
    </Row>
    </>
  );
}

const mapStateToProps = (state) => {
  const { bookingHotels } = state.bookingHotelReducer;
  const { bookingTours } = state.bookingTourReducer;
  const { userInfo } = state.userReducer;
  
  return {
    bookingTours,
    bookingHotels,
    userInfo,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBookingHotels: (params) => dispatch(getBookingHotelsAction(params)),
    getBookingTours: (params) => dispatch(getBookingTourAction(params)),
    getProfileList: (params) => dispatch( registerAction(params)),
    updateUser: (params) => dispatch(updateProfileAction(params)),
  
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
