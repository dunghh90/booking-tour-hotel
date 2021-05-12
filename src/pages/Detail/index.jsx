import { Card, Col, Row } from 'antd';

import { connect } from 'react-redux';
import { getProductDetailAction } from '../../redux/actions';
import { useEffect, useState } from 'react';
import history from '../../utils/history';
import { Rate } from 'antd';
import './styles.css';
import { ThunderboltOutlined } from '@ant-design/icons';
import SearchTourPage from '../SearchTour';

import Siderba from '../../components/Siderba';


function DetailPage({
  productHotelDetail,
  getProductDetail,
  match,
}) {
  const locationId = match.params.id;
  const [roomSelected, setRoomSelected] = useState({});

  useEffect(() => {
    getProductDetail({ id: locationId });
  }, [])

  useEffect(() => {
    if (productHotelDetail.data.id) {
      setRoomSelected(productHotelDetail.data.rooms[0] || {})
    }
  }, [productHotelDetail.data])

  function renderHotelRooms() {
    return productHotelDetail.data.rooms.map((item, index) => {
      console.log("🚀 ~ file: index.jsx ~ line 35 ~ item", item);

      return (
        <>
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Card
               hoverable
                cover={<div alt="example" src="" />}
                onClick={() => history.push(`/hotels/rooms/${item.id}`)}
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
          {renderHotelRooms()}
        </Col>
      </Row>
    </>
  );
}

const mapStateToProps = (state) => {
  const { productHotelDetail } = state.productHotelReducer;
  console.log("🚀 ~ file: index.jsx ~ line 75 ~ mapStateToProps ~ productHotelDetail", productHotelDetail);

  return {
    productHotelDetail,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductDetail: (params) => dispatch(getProductDetailAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);


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



