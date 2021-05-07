import { Card, Col, Row } from 'antd';
import { Radio } from 'antd';
import { connect } from 'react-redux';
import { getProductDetailAction } from '../../redux/actions';
import { useEffect, useState } from 'react';
import history from '../../utils/history';
import { Rate } from 'antd';
import './styles.css';
import { ThunderboltOutlined } from '@ant-design/icons';
import SearchTourPage from '../SearchTour';
import { ROUTERS } from '../../constants/router';
import Siderba from '../../components/Siderba';


function DetailPage({
  productHotelDetail,
  getProductDetail,
  match,
}) {
  const hotelsId = match.params.id;
  const [optionSelected, setOptionSelected] = useState({});

  useEffect(() => {
    getProductDetail({ id: hotelsId });
  }, [])

  useEffect(() => {
    if (productHotelDetail.data.id) {
      setOptionSelected(productHotelDetail.data.productOptionsHotels[0] || {})
    }
  }, [productHotelDetail.data])

  function renderProductOptions() {
    return productHotelDetail.data.productOptionsHotels.map((item, index) => {
      console.log("🚀 ~ file: index.jsx ~ line 35 ~ returnproductHotelDetail.data.productOptionsHotels.map ~ item", item);

      return (
        <>
        <Col span={16}>
          <Card title={productHotelDetail.data.name}
            onClick={() => history.push(ROUTERS.REVIEW)}
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
        </>
      )
    });
  }

  return (
    <>
      <Row gutter={[8, 8]} justify="center">
      
      <Col span={8}>
          < Siderba/>
        </Col>
      <SearchTourPage />
        {renderProductOptions()}
      </Row>
    </>
  );
}

const mapStateToProps = (state) => {
  const { productHotelDetail } = state.productHotelReducer;
  console.log("🚀 ~ file: index.jsx ~ line 75 ~ mapStateToProps ~ productHotelDetail", productHotelDetail)

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



