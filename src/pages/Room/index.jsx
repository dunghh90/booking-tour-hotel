import { Card, Col, Row } from 'antd';

import { connect } from 'react-redux';

import { useEffect, useState } from 'react';
import history from '../../utils/history';
import { Rate } from 'antd';
import './styles.css';
import { ThunderboltOutlined } from '@ant-design/icons';



function RoomPage({
    productHotelRoom,
   getProductRoom,
  match,
}) {
  const productOptionsHotelsId  = match.params.id;
  const [optionSelected, setOptionSelected] = useState({});

  useEffect(() => {
    getProductRoom({ id: productOptionsHotelsId });
  }, [])

  useEffect(() => {
    if (productHotelRoom.data.id) {
      setOptionSelected(productHotelRoom.data.Room[0] || {})
    }
  }, [productHotelRoom.data])

  function renderProductRoom() {
    return productHotelRoom.data.Room.map((item, index) => {
      return (
        <>
        
        <Col span={16}>
          <Card 
          >
            <div className="optiondetail">
              <img className="img1" src={item.img} alt="" />

                <div className="option">
                    <h2> {item.name} </h2>
                    <Rate disabled defaultValue={item.rate} />
                    <h5><ThunderboltOutlined />.{item.Title}</h5>
                    <span className="price">{item.Price} USD</span>
                </div>
            </div>



            {/* <Radio.Group
        onChange={(e) => setOptionSelected(e.target.value)}
        value={optionSelected}
      > */}
            {/* {renderProductOptions()} */}
            {/* </Radio.Group> */}
            {/* {productHotelDetail.data.price + (optionSelected.price || 0)} */}


          </Card>
        </Col>
        </>
      )
    });
  }

  return (
    <>
      <Row gutter={[8, 8]} justify="center">
        {renderProductRoom()}
      </Row>
    </>
  );
}

const mapStateToProps = (state) => {
  const { productHotelRoom } = state.productHotelReducer;
  console.log("🚀 ~ file: index.jsx ~ line 75 ~ mapStateToProps ~ productHotelDetail", productHotelRoom)

  return {
    productHotelRoom,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductRoom: (params) => dispatch(getProductRoomAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);