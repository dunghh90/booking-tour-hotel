import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Space, Card, InputNumber, Button, Row, Col, Radio, Menu, Form, Input, DatePicker, Table } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import moment from 'moment';
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
  addProfile,
  bookingRooms,
  match
}) {
  console.log("🚀 ~ file: index.jsx ~ line 24 ~ bookingRooms", bookingRooms)

  const userId = match.params.id;
  const [selectObject, setSelectObject] = useState(1);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  
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

  function addProfileUser(values) {
    const newValues = {
      ...values,
      id: userInfo.id,
      birthday: moment(values).format('YYYY/MM/DD'),
    }
    addProfile(newValues)
  }
  function renderUserInfo(){
      return (
        <>
        <Form
          // form={form}
          {...layout}
          name="register"
          onFinish={(values) => addProfileUser(values)}
          initialValues={{
            email: userInfo.email,
            name: userInfo.name,
            phone: userInfo.phone,
            gender: userInfo.gender,
            birthday: moment(userInfo.birthday, 'YYYY/MM/DD')
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
  

  function changePassword() {

  }

  function renderChangePass() {
    return (
      <Form
        {...layout}
        name="changePassword"
        onFinish={(values) => changePassword(values)}
        // initialValues={}
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
    );
  }

  function renderHistoryBookingHotel() {
    const tableColumn = [
      {
        title: 'Tên khách sạn',
        dataIndex: 'hotelName',
        key: 'hotelName',
      },
      {
        title: 'Loại phòng',
        dataIndex: 'roomName',
        key: 'roomName',
      },
      {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'Ngày đặt',
        dataIndex: 'date',
        key: 'date',
      },
    ]
    const tableData = bookingRooms.data.map((item) => {
      
      return {
        ...item,
        hotelName: item.hotel.name,
        roomName: item.room.name,
        // Chỗ này a để tạm, sau này fix data thì bỏ vào
        price: 0,
        date: `${item.startDate} - ${item.endDate}`,
        key: item.id,
      }
    });
    return <Table columns={tableColumn} dataSource={tableData} pagination={false} />
    // return bookingRooms.data.map((item) => {
    //   return (
    //     <>
    //       <p>+++++++++++++++++</p>
    //       <p>ten hotel</p>
    //       <p>{item.hotel.name}</p>
    //       <p>gia hotel</p>
    //       <p>{item.hotel.Price}</p>
    //       <p>ten hotel</p>
    //       <p>{item.room.name}</p>
    //       <p>gia phong</p>
    //       <p>{item.room.Price}</p>
    //       <p>{item.startDate}</p>
    //     </>
    //   )
    // })
  }
  function renderHistoryBookingTour() {
    const tableColumn = [
      {
        title: 'Tên khách sạn',
        dataIndex: 'tourName',
        key: 'tourName',
      },
   
      {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'Ngày đặt',
        dataIndex: 'date',
        key: 'date',
      },
    ]
    const tableData = bookingTours.data.map((item) => {
      return {
        ...item,
        tourName: item.tour.name,
        price: item.tour.price,
        date: item.startDate,
        key: item.id,
      }
    });
    return <Table columns={tableColumn} dataSource={tableData} pagination={false} />
  }

  function renderHistory() {
    return (
      <div>
      <p>Lịch sử đặt</p>
        <h2>Lich su book hotel</h2>
        {renderHistoryBookingHotel()}
        <h2>Lich su book tour</h2>
        {renderHistoryBookingTour()}
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

    <Row gutter={16} style={{ padding: '16px 16px 0' }}>
      <Col span={4}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%' }}
        >
          {/* <Menu.ItemGroup key="userInfo" icon={<UserOutlined />} title="Thông tin của tôi"> */}
          <Menu.SubMenu key="userInfo" icon={<UserOutlined />} title="Thông tin của tôi">
            <Menu.Item key="1"
              onClick={() => setSelectObject(1)}
            >Tài khoản</Menu.Item>
            <Menu.Item key="2"
              onClick={() => setSelectObject(2)}
            >Đổi mật khẩu</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="userHistory" icon={<LaptopOutlined />}
            onClick={() => setSelectObject(3)}
          >
            Lịch sử booking
              </Menu.Item>
        </Menu>

      </Col>
      <Col span={20}>
        <Row style={{ backgroundColor: "white", padding: 20 }}>
          {renderContent()}
        </Row>
      </Col>
    </Row>
  );
}

const mapStateToProps = (state) => {
  const { bookingRooms } = state.bookingHotelReducer;
  const { bookingTours } = state.bookingTourReducer;
  const { userInfo } = state.userReducer;
  
  return {
    bookingTours,
    bookingRooms,
    userInfo,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBookingHotels: (params) => dispatch(getBookingHotelsAction(params)),
    getBookingTours: (params) => dispatch(getBookingTourAction(params)),
    getProfileList: (params) => dispatch( registerAction(params)),
    addProfile: (params) => dispatch(updateProfileAction(params)),
  
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
