import { Button, Card, DatePicker, Row } from 'antd';

import { connect } from 'react-redux';
import { getListRoomAction } from '../../redux/actions';
import { Content } from 'antd/lib/layout/layout';
import { useEffect, useState } from 'react';
import history from '../../utils/history';
import { Rate } from 'antd';
import './styles.css';
import { ThunderboltOutlined } from '@ant-design/icons';
import moment from 'moment';
import ItemRoom from '../ListRoom/item';
import Comment from '../Comment/index'


import {

  bookingHotelAction,
} from '../../redux/actions';


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

  function renderListRoom() {
    return listRoom.data.rooms.map((item, index) => {
      let isDisabled = false;
      if (dateSelected) (
        listRoom.data.bookingRooms.forEach((bookingItem, bookingIndex) => {

          if (
            (
              (
                moment(dateSelected[0], 'YYYY/MM/DD').unix() - moment(bookingItem.startDate, 'YYYY/MM/DD').unix() >= 0 &&
                moment(bookingItem.endDate, 'YYYY/MM/DD').unix() - moment(dateSelected[1], 'YYYY/MM/DD').unix() >= 0
              ) || (
                console.log("🚀 ~ file: index.jsx ~ line 75 ~ listRoom.data.bookingRooms.forEach ~ dateSelected", dateSelected),
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
          <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
            <Row gutter={[24, 24]}>

              <Card
                hoverable
                size="small"
                style={{ width: 360 }}
                cover={<img alt="" src={item.img} />}
              >

                <div className="optiondetail">
                  {/* <img className="img1" src={item.img} alt="" /> */}

                  <div className="option">
                    <h2> {item.Title} </h2>
                    <Rate disabled defaultValue={item.rate} />
                    <h3><ThunderboltOutlined />.{item.name}</h3>
                  </div>

                </div>
                <div className="isnew">{item.combo}</div>
                <div className="rong">m</div>
                <ItemRoom
                  description={item.description}
                />

                <span className="price">{item.Price} VND</span>
                {isDisabled && (
                  <p>Hết phòng</p>
                )}
                {!isDisabled && (
                  
                <Button type="primary" className="book" onClick={() => handleBookingHotel(item.id)}>Đặt Phòng</Button>
                )}



                {/* <Radio.Group
        onChange={(e) => setOptionSelected(e.target.value)}
        value={optionSelected}
      > */}
                {/* {renderProductOptions()} */}
                {/* </Radio.Group> */}
                {/* {productHotelDetail.data.price + (optionSelected.price || 0)} */}


              </Card>

            </Row>
          </Content>
        </>
      )
    });
  }

  return (
    <>
      <DatePicker.RangePicker onChange={(value) => handleDate(value)} />
      <Row gutter={[8, 8]} justify="center">
        {renderListRoom()}
      </Row>
      <h1 className ="comment">Đánh giá khách hàng </h1>
      <Comment hotelId={hotelId} />
    </>
  );
}

const mapStateToProps = (state) => {
  const { listRoom } = state.productHotelReducer;
  // console.log("🚀 ~ file: index.jsx ~ line 126 ~ mapStateToProps ~ listRoom", listRoom)
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


  // const productDetail = productList.find((item) => item. hotelsid.toString() ===  hotelsid);
  // return (
  //   <>
  //   <Row >
  //     <Col span ={16}>
  //   <Card>

  //     <img style={{width:200 , height:200}} src={productDetail.img} />
  //     <div className="detail">
  //     <h2>
  //     {productDetail.name}
  //     </h2>
  //     <span>{productDetail.comment}</span>
  //     </div>
  //   </Card>
  //     </Col>
  //   </Row>
  //   </>
  // );



