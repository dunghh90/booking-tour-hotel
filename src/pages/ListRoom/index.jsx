import { Card, Col, Row } from 'antd';

import { connect } from 'react-redux';
import { getListRoomAction } from '../../redux/actions';
import { useEffect, useState } from 'react';
import history from '../../utils/history';
import { Rate } from 'antd';
import './styles.css';
import { ThunderboltOutlined } from '@ant-design/icons';
import SearchTourPage from '../SearchTour';

import Siderba from '../../components/Siderba';
import ItemRoom  from '../ListRoom/item';

function ListRoomPage({
  listRoom,
  getListRoom,
  match,
}) {
  const hotelId = match.params.id;
  const [roomSelected, setRoomSelected] = useState({});
  
  useEffect(() => {
    getListRoom({ id: hotelId });
  }, [])

  useEffect(() => {
    if (listRoom.data.id) {
      setRoomSelected(listRoom.data.rooms[0] || {})
    }
  }, [listRoom.data])

  // function renderTitle(props){
  //   const {description} = props;
  //   return description.map((item,index)=>{
  //      <div>{item}</div>
  //   })
  // }

  function renderListRoom() {
    return listRoom.data.rooms.map((item, index) => {
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
               
            { console.log("++++Test description: ", item.description) }
                <ItemRoom 
                  description={item.description}
                />

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
        {renderListRoom()}
      </Row>
    </>
  );
}

const mapStateToProps = (state) => {
  const { listRoom } = state.productHotelReducer;
  return {
    listRoom,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListRoom: (params) => dispatch(getListRoomAction(params)),
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



