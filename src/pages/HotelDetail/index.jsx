import { Button, Card, DatePicker, Row, Col, Form, Input, Space } from 'antd';

import { connect } from 'react-redux';
import { Content } from 'antd/lib/layout/layout';
import { useEffect, useState } from 'react';
import { SendOutlined, HomeOutlined } from '@ant-design/icons';
import { Rate } from 'antd';
import history from '../../utils/history';
import moment from 'moment';
import ItemRoom from './components/itemRoom';
import CommentPage from '../../components/Comment'
import { bookingHotelAction, getListRoomAction } from '../../redux/actions';

import './styles.css';

function ListRoomPage({
  listRoom,
  getListRoom,
  match,
  bookingHotelRoom,
}) {
  const hotelId = match.params.id;
  const [roomSelected, setRoomSelected] = useState({});
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [dateSelected, setDateSelected] = useState();
  const isNew = true;
  const currentDate = new Date();

  useEffect(() => {
    getListRoom({ id: hotelId });
  }, [])

  useEffect(() => {
    if (listRoom.data.id) {
      setRoomSelected(listRoom.data.rooms[0] || {})
    }
  }, [listRoom.data])

  function handleDate(value) {
    const [startDate, endDate] = value;

    setDateSelected([moment(startDate).format('YYYY/MM/DD'), moment(endDate).format('YYYY/MM/DD')]);

  }
  function handleBookingHotel(id) {

    if (!userInfo) {
      alert('Bạn cần đăng nhập!');
    } else if (!dateSelected) {
      alert('Cần chọn ngày đặt phòng!');
    } else {
      bookingHotelRoom({
        userId: userInfo.id,
        hotelId: parseInt(hotelId),
        roomId: id,
        startDate: dateSelected[0],
        endDate: dateSelected[1]
      })

    }

  }
  function renderImg() {

    return (
      <>
        <Col span={18}>
          <Row >
            <Col span={9}>
              <img className="img2" src={listRoom.data.src[0]} alt="" />

            </Col>
            <Col span={9} >
              <Row >
                <img className="img2" src={listRoom.data.src[1]} alt="" />
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>

                  <img className="img3" src={listRoom.data.src[2]} alt="" />
                </Col>
                <Col span={12}>
                  <img className="img3" src={listRoom.data.src[3]} alt="" />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <div className="layout">minh</div>
          </Row>
        </Col>
        <Col span={6}>
          <img className="img4" src="https://file1.dangcongsan.vn/DATA/0/2018/10/68___gi%E1%BA%BFng_l%C3%A0ng_qu%E1%BA%A3ng_ph%C3%BA_c%E1%BA%A7u__%E1%BB%A9ng_h%C3%B2a___%E1%BA%A3nh_vi%E1%BA%BFt_m%E1%BA%A1nh-16_51_07_908.jpg" alt="" />
        </Col>

      </>
    )


  }

  function renderListRoom() {
    return listRoom.data.rooms.map((item, index) => {
      let isDisabled = false;
      if (dateSelected) (
        listRoom.data.bookingHotels.forEach((bookingItem, bookingIndex) => {

          if (
            (
              (
                moment(dateSelected[0], 'YYYY/MM/DD').unix() - moment(bookingItem.startDate, 'YYYY/MM/DD').unix() >= 0 &&
                moment(bookingItem.endDate, 'YYYY/MM/DD').unix() - moment(dateSelected[1], 'YYYY/MM/DD').unix() >= 0
              ) || (
                moment(dateSelected[1], 'YYYY/MM/DD').unix() - moment(bookingItem.startDate, 'YYYY/MM/DD').unix() > 0 &&
                moment(bookingItem.startDate, 'YYYY/MM/DD').unix() - moment(dateSelected[0], 'YYYY/MM/DD').unix() > 0
              ) || (
                moment(bookingItem.endDate, 'YYYY/MM/DD').unix() - moment(dateSelected[0], 'YYYY/MM/DD').unix() > 0 &&
                moment(dateSelected[1], 'YYYY/MM/DD').unix() - moment(bookingItem.endDate, 'YYYY/MM/DD').unix() > 0
              )
            ) && bookingItem.roomId === item.id
          ) {
            isDisabled = true;
          }
        })
      )

      return (
        <>

          <Content className="site-layout" style={{ padding: '0 30px', marginTop: 64 }}>
            <Row gutter={[12, 12]}>
              <Col span={24}>
                <Card
                  hoverable
                  size="small"
                  style={{ width: 417 }}

                >
                  <div className="ALLROOM">
                    <div className="optiondetail2">
                      <img className="img1" src={item.img} alt="" />
                      <span className="price">{item.price.toLocaleString()} VND</span>
                    </div>
                    <div className="option">
                      <h2> {item.Title} </h2>
                      <Rate disabled defaultValue={item.rate} />
                      <h3>{item.name}</h3>
                      <ItemRoom
                        description={item.description}
                      />

                      {/* {item.isNew ?
                  <div className="isnew">{item.combo}</div>
                  : null
                } */}

                      {isDisabled && (
                        <Button type="primary" className="book" >Hết Phòng</Button>
                      )}
                      {!isDisabled && (
                        <Button type="primary" className="book" onClick={() => handleBookingHotel(item.id)}>Đặt Phòng</Button>
                      )}


                    </div>

                  </div>

                </Card>
              </Col>

            </Row>
          </Content>
        </>
      )
    });
  }

  return (
    <>

      <Row justify="center" className="timkiem">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          layout="inline"
        //   onFinish={findTour}
        >
          <Col span={7}>
            <Form.Item
              name="username"
            >
              <Input labelFontSize={100} fontSize={100} style={{ padding: '10px 50px', height: 50, borderRadius: 4, backgroundColor: "white" }} placeholder="Bạn cần nhập số người?" />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              name="dateBooking"
            >
              <DatePicker.RangePicker onChange={(value) => handleDate(value)} style={{ padding: '10px 50px', width: '100%', height: 50, borderRadius: 4, backgroundColor: "white" }} defaultValue={moment(currentDate)} format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              name="placeFrom"
            >
              <Input labelFontSize={100} fontSize={100} prefix={<SendOutlined />} style={{ padding: '10px 50px', height: 50, borderRadius: 4, backgroundColor: "white" }} placeholder="Khởi hành từ" />
            </Form.Item>
          </Col>
          <Col span={3} >
            <Row style={{ width: "100%" }} justify="end">
              <Button style={{ padding: '10px 50px', height: 50, borderRadius: 4, backgroundColor: "#ffe58f", color: "#003a8c", fontWeight: 600 }} >
                Tìm
        </Button>
            </Row>
          </Col>
        </Form>
      </Row>

      <Row span={24} >
        <div className="content-header">
          <ol className="breadcrumb"  >
            <Space><HomeOutlined /></Space>
            <li  >
              <a className="item" href="/du-lich/">
                <i className="fa fa-home"></i> <span>Trang chủ</span>
              </a>
            </li>
            <i style={{ margin: "0px 10px" }}>|</i>
            <li  >
              <a className="item" href="/du-lich/tour-da-nang">
                <span>Khách sạn Việt Nam</span>
              </a>
            </li>
            <i style={{ margin: "0px 10px" }}>|</i>
            <li className="active hidden-xs">

              <a className="item" href="/du-lich/tour-da-nang-4n3d-hcm-da-nang-ba-na-hoi-an-hue-quang-binh/1189">
                <span >Thông tin về khách sạn</span>
              </a>
            </li>
          </ol>
        </div>
      </Row>

      {/* <DatePicker.RangePicker onChange={(value) => handleDate(value)} /> */}
      {/* <Row justify="center" >
              <Col span = {18}>
                <Row >
                  <Col span ={9}>
                    <img className ="img2" src="https://i.pinimg.com/originals/07/f9/df/07f9df953582c38d9d38de1f044e7b06.png" alt="" />
        
                  </Col>
                  <Col span ={9} >
                    <Row >
                    <img className ="img2" src="https://media.healthplus.vn/Images/Uploaded/Share/2019/02/18/Ngam_nhung_hinh_anh_tuyet_dep_ve_Viet_Nam_tren_bao_Anh_01.jpg" alt="" />
                    </Row>
                    <Row gutter={[8, 8]}>
                      <Col span ={12}>
                    <img className ="img3" src="https://www.elle.vn/wp-content/uploads/2017/07/25/hinh-anh-dep-1.jpg" alt="" />
                      </Col>
                      <Col span ={12}>
                    <img className ="img3" src="https://www.elle.vn/wp-content/uploads/2017/07/25/hinh-anh-dep-1.jpg" alt="" />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                    <div className ="layout">minh</div>
                  </Row>
              </Col>
              <Col span = {6}>
                <img className ="img4" src="https://file1.dangcongsan.vn/DATA/0/2018/10/68___gi%E1%BA%BFng_l%C3%A0ng_qu%E1%BA%A3ng_ph%C3%BA_c%E1%BA%A7u__%E1%BB%A9ng_h%C3%B2a___%E1%BA%A3nh_vi%E1%BA%BFt_m%E1%BA%A1nh-16_51_07_908.jpg" alt="" />
              </Col>
            </Row> */}
      <Row justify="center">

        {renderImg()}
      </Row>
      <Row gutter={[8, 8]} justify="center">
        <div className="layout2">mai nhat minh</div>
        {/* <h3>Thông tin phòng khách sạn</h3> */}
        {renderListRoom()}
      </Row>
      <h1 className="comment">Đánh giá khách hàng </h1>
      <CommentPage hotelId={hotelId} />
    </>
  );
}

const mapStateToProps = (state) => {
  const { listRoom } = state.hotelReducer;
  return {
    listRoom,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListRoom: (params) => dispatch(getListRoomAction(params)),
    bookingHotelRoom: (params) => dispatch(bookingHotelAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListRoomPage);



