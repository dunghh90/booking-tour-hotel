import {Card, Col,Row} from 'antd';
import {  Radio } from 'antd';
import { connect } from 'react-redux';
import { getProductDetailAction } from '../../redux/actions';
import { useEffect, useState } from 'react';

import './styles.css';


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
      setOptionSelected(productHotelDetail.data.productOptionsHotel[0] || {})
    }
  }, [productHotelDetail.data])

  // function renderProductOptions() {
  //   return productHotelDetail.data.productOptionsHotel.map((item, index) => {
  //     return (
  //       <Card value={item}>
  //         {item.price}
  //       </Card>
  //     )
  //   })
  // }

  return (
    <>
    <Card title={productHotelDetail.data.name}>
      <p> {productHotelDetail.data.name}</p>

      {
      productHotelDetail.data.productOptionsHotel.map((item, index) => {
        return (
          <div>
            {item.name}
          </div>
        )
      })
    }
      {/* <Radio.Group
        onChange={(e) => setOptionSelected(e.target.value)}
        value={optionSelected}
      > */}
        {/* {renderProductOptions()} */}
      {/* </Radio.Group> */}
      {/* {productHotelDetail.data.price + (optionSelected.price || 0)} */}
        
        
    </Card>
    </>
  );
}

const mapStateToProps = (state) => {
  const { productHotelDetail } = state.productHotelReducer;
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



