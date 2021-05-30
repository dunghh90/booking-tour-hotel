import { Button, Card, DatePicker, Row, Col, Form, Input, Space } from 'antd';

import { connect } from 'react-redux';
import { Content } from 'antd/lib/layout/layout';
import { useEffect, useState } from 'react';
import { SendOutlined, HomeOutlined, WifiOutlined, CarOutlined, ArrowUpOutlined, InsertRowRightOutlined, FieldTimeOutlined, EnvironmentOutlined, FileExcelOutlined, HeartOutlined, HistoryOutlined } from '@ant-design/icons';
import { Rate, Progress, BackTop } from 'antd';
import history from '../../utils/history';
import moment from 'moment';
import ItemRoom from './components/itemRoom';
import CommentPage from '../../components/Comment'
import { bookingHotelAction, getListRoomAction } from '../../redux/actions';

import './styles.css';



const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
};
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
  // const [totalPrice, setTotalPrice] = useState(0);
  const isNew = true;
  const currentDate = new Date();
  const [locationSelected, setLocationSelected] = useState(null);

  const [searchKey, setSearchKey] = useState({ userNum: '', price: '' });

  let totalPrice = 0;

  useEffect(() => {
    getListRoom({ id: hotelId });
  }, [])

  useEffect(() => {
    if (listRoom.data.id) {
      setRoomSelected(listRoom.data.rooms[0] || {})
    }
  }, [listRoom.data])

  const filterListRoom = listRoom.data.rooms.filter((item) => {
    // console.log("🚀 ~ file: index.jsx ~ line 46 ~ filterListRoom ~ item", item)
    // console.log("🚀 ~ file: index.jsx ~ line 43 ~ filterListRoom ~ searchKey.price", searchKey.price)

    return item.price.toString().indexOf(searchKey.price.trim()) !== -1 && item.title.toString().indexOf(searchKey.userNum.trim()) !== -1
  })
  console.log("🚀 ~ file: index.jsx ~ line 46 ~ filterListRoom ~ filterListRoom", filterListRoom)
  // let filterPriceListRoom = listRoom.data.rooms.filter((item) => {
  //   return item.id == locationSelected;
  // })

  // function handleFilterLocaiton(id) {
  //   setKeySearchLocation('');
  //   setLocationSelected(id);
  //   getListRoom({
  //     page: 1,
  //     limit: 10,
  //     hotelId: id,
  //   },[keySearchLocation])
  // }

  function handleDate(value) {
    const [startDate, endDate] = value;
    setDateSelected([moment(startDate).format('YYYY/MM/DD'), moment(endDate).format('YYYY/MM/DD')]);

  }
  function renderNoteListRoom() {
    return (
      <>
        <div className="all">
          <div>
            <Button className="combo">{listRoom.data.combo}</Button>
            <WifiOutlined className="wifi" />
            {/* <EnvironmentOutlined className ="bando" /> */}

          </div>
          <p className="name">{listRoom.data.name}</p>
          <Rate disabled defaultValue={listRoom.data.rate} />
          <p>{listRoom.data.address}</p>
        </div>

      </>
    )
  }
  function handleBookingHotel(id, defaultPrice) {

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
      totalPrice = defaultPrice;
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
            <div className="layout">
              {renderNoteListRoom()}
            </div>
            <div className="layout3">
              <h3 className="diemnoibat">Điểm nổi bật về chỗ nghĩ</h3>
              <div className="allthongtin">
                <div className="diemnobatcon1">
                  <HistoryOutlined className="icondiemnoibat" />
                  <div className="Note12">
                    <h4 className="note13">Bàn tiếp tân 24H</h4>
                    <span className="note14">Nhận phòng không phức tạp</span>
                  </div>
                </div>
                <div className="centernote">
                  <HeartOutlined className="icondiemnoibat1" />
                  <div className="Note12">
                    <h4 className="note13">Có các dịch vụ chiều lòng khách hàng</h4>
                    <span className="note14">Massage,xông hơi,bida,hồ bơi...</span>
                  </div>
                </div>
                <div className="diemnobatcon2">
                  <FileExcelOutlined className="icondiemnoibat2" />
                  <div className="Note12">
                    <h4 className="note13">Không hủy phòng</h4>
                    <span className="note14">Đã đặt phòng thì không được hủy.Đừng xem chúng tôi là trò chơi</span>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </Col>
        <Col span={6}>
          <div className="detail">
            <Row gutter={[12, 12]}>
              <Card title="Đánh giá chất lượng khách sạn" style={{ width: 514 }}>
                <div>
                  <div>
                    <label htmlFor="">Tuyệt vời</label>
                    <Progress percent={90} status="active" />
                  </div>
                  <div>
                    <label htmlFor="">Tốt</label>
                    <Progress percent={80} status="active" />
                  </div>
                  <label htmlFor="">Không đạt yêu cầu</label>
                  <Progress percent={10} status="exception" />
                </div>
              </Card>
              <Card title="Những điều cần biết" style={{ width: 514 }}>
                <Row justify="center">
                  <div>
                    <img className="imgcart" src={listRoom.data.src[0]} alt="" />
                    <div className="cartall">
                      <h3><EnvironmentOutlined />.Vị trí hiếm có</h3>
                      <h3><InsertRowRightOutlined />.Địa bàn phổ biến</h3>
                    </div>
                    <div className="doxe">
                      <h4 className="itemdoxe"> <CarOutlined className="icondoxe" />.Đỗ xe</h4>
                      <span className="free">Miễn phí</span>
                    </div>
                    <div>
                      <h4 className="Note">Các địa điểm nổi tiếng</h4>
                      <ul className="itemnote">
                        <li className="itemnote1">Vịnh Hạ Long</li>
                        <li className="itemnote1">Phong Nha Kẻ Bàng</li>
                        <li className="itemnote1">Hội An</li>
                        <li className="itemnote1">Biển Mỹ Khê Đà Nẵng</li>
                        <li className="itemnote1">Mũi Né Cà Mau </li>
                      </ul>

                    </div>
                  </div>
                </Row>

              </Card>
            </Row>
          </div>
        </Col>

      </>
    )


  }


  function renderListRoom() {
    return filterListRoom.map((item, index) => {
      let isDisabled = false;
      if (dateSelected) {
        console.log("🚀 ~ file: index.jsx ~ line 223 ~ returnfilterListRoom.map ~ dateSelected", dateSelected)
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
        const numDate = moment(dateSelected[1]).day() - moment(dateSelected[0]).day();
        totalPrice = numDate * item.price;
        // console.log("🚀 ~ file: index.jsx ~ line 241 ~ returnfilterListRoom.map ~ item.price", item.price)
        console.log("🚀 ~ file: index.jsx ~ line 242 ~ returnfilterListRoom.map ~ numDate", numDate)
        // console.log("🚀 ~ file: index.jsx ~ line 243 ~ returnfilterListRoom.map ~ totalPrice", totalPrice)
      } else {
        totalPrice = item.price;
        // console.log("🚀 ~ file: index.jsx ~ line 244 ~ returnfilterListRoom.map ~ item.price", item.price)


      }

      // console.log("🚀 ~ file: index.jsx ~ line 244 ~ returnfilterListRoom.map ~ moment", moment(dateSelected[1]).day())

      return (
        <>
          <Content className="site-layout" style={{ padding: '0 30px', marginTop: 64 }}>
            <Row gutter={[12, 12]}>
              <Col span={24}>
                {/* {
                filterListRoom.load ? (<p>Loading...</p>) 
                :(filterListRoom.map((item, index) => {
                  return ( */}
                <Card
                  hoverable
                  size="small"
                  style={{ width: 417 }}

                >
                  <div className="ALLROOM">
                    <div className="optiondetail2">
                      <img className="img1" src={item.img} alt="" />
                      {/* <span className="price">{item.price.toLocaleString()} VND</span> */}
                      {/* <span>Tổng số ngày:{item.numDate}</span> */}
                      <span className="price">{totalPrice.toLocaleString()} VND</span>

                    </div>
                    <div className="option">
                      <h2> {item.title} </h2>
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
                        <Button type="primary" className="book" onClick={() => handleBookingHotel(item.id, item.price)}>Đặt Phòng</Button>
                      )}


                    </div>

                  </div>

                </Card>
                {/* )
                      console.log("🚀 ~ file: index.jsx ~ line 307 ~ returnfilterListRoom.map ~ item.numDate", item.numDate)
                      console.log("🚀 ~ file: index.jsx ~ line 307 ~ returnfilterListRoom.map ~ item.numDate", item.numDate)
                  }))
                }  */}
              </Col>

            </Row>
          </Content>
        </>
      )
    });
  }

  return (
    <>
      {/* Serch hotel  */}
      <Row className="timkiem">
        <div className="alltimkiem">
          <Form
            name="basic"
            initialValues={{ remember: true }}
            layout="inline"
            onFinish={(values) => {
              setSearchKey({ userNum: values.userNum, price: values.price });
            }}
          >
            <Col span={7}>
              <Form.Item
                name="userNum"
              >
                <Input
                  labelFontSize={100}
                  fontSize={100} prefix={<SendOutlined />}
                  style={{
                    padding: '10px 50px', height: 50,
                    borderRadius: 4,
                    backgroundColor: "white"
                  }}
                  onChange={(e) => //setSearchKey(e.target.value)
                    setSearchKey({ ...searchKey, userNum: e.target.value })
                  }
                  placeholder="Bạn cần nhập số người"
                />
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
                name="price"
              >
                <Input
                  labelFontSize={100}
                  fontSize={100} prefix={<SendOutlined />}
                  style={{
                    padding: '10px 50px',
                    height: 50, borderRadius: 4,
                    backgroundColor: "white"
                  }}
                  onChange={(e) => //setSearchKey(e.target.value)
                    setSearchKey({ ...searchKey, price: e.target.value })
                  }
                  placeholder="Chọn giá tiền"
                />
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
        </div>

      </Row>

      <Row span={24} className="detailTrangchu">
        <div className="content-header">
          <ol className="breadcrumb"  >
            <Space><HomeOutlined /></Space>
            <li  >
              <a className="item" href="/du-lich/">
                <i className="fa fa-home"></i><span>Trang chủ</span>
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


      <Row justify="center">

        {renderImg()}
      </Row>
      <Row gutter={[8, 8]} justify="center">
        <div className="layout2">
          <div>
            <FieldTimeOutlined className="iconTime" />
          </div>
          <div>
            <h3 className="Abc">Ngày quý khách chọn là ngày phổ biến đối với khách du lịch</h3>
            <span className="bcd">Cứ 60 phút là có khách đặt phòng trên đây</span>
          </div>
        </div>
        {/* <h3>Thông tin phòng khách sạn</h3> */}
        {renderListRoom()}
        <BackTop className="backtop">
          <div  style={style}><ArrowUpOutlined /></div>
        </BackTop>
      </Row>
      <Row>
        <Col span={8}></Col>
        <Col span={16}>
          <h1 className="comment">Đánh giá khách hàng </h1>
          <CommentPage hotelId={hotelId} />
        </Col>

      </Row>
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



