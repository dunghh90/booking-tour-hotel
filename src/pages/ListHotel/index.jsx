import { Card, Col, Row } from 'antd';

import { connect } from 'react-redux';
import { getListHotelAction } from '../../redux/actions';
import { useEffect, useState } from 'react';
import history from '../../utils/history';
import { Rate } from 'antd';
import './styles.css';
import { ThunderboltOutlined } from '@ant-design/icons';
import SearchTourPage from '../SearchTour';

import Siderba from '../../components/Siderba';


function ListHotelPage({
  listHotel,
  getListHotel,
  match,
}) {
  const locationId = match.params.id;
  const [roomSelected, setRoomSelected] = useState({});
  
  useEffect(() => {
    getListHotel({ id: locationId });
  }, [])

  useEffect(() => {
    if (listHotel.data.id) {
      setRoomSelected(listHotel.data.hotels[0] || {})
    }
  }, [listHotel.data])

  function renderListHotel() {
    return listHotel.data.hotels.map((item, index) => {
      return (
        <>
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Card
                hoverable
                title = {item.combo}
                cover={<div alt="example" src="" />}
                style ={{marginTop: 16}}
                onClick={() => history.push(`/hotels/${item.id}`)}
              >
                <div className="optiondetail">
                  <img className="img1" src={item.img} alt="" />
                  <div className="option">
                    <h2 > {item.name} </h2>
                    <Rate disabled defaultValue={item.rate} />
                    <h5 className="adr"><ThunderboltOutlined />.{item.Title}</h5>
                    <span className="price">{item.Price}</span>
                  </div>
                </div>

              </Card>
            </Col>
          </Row>
        </>
      )
    });
  }

  return (
    <>
      <SearchTourPage />
      <Row gutter={[8, 8]} justify="center">
        <Col span={7}>
          < Siderba />
        </Col>
        <Col span={17}>
          {renderListHotel()}
        </Col>
      </Row>
    </>
  );
}

const mapStateToProps = (state) => {
  const { listHotel } = state.productHotelReducer;
  return {
    listHotel,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListHotel: (params) => dispatch(getListHotelAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListHotelPage);


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



