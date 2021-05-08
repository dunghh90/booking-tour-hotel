import { Row, Col } from 'antd';
import history from '../../utils/history';
import {connect} from 'react-redux';
import SimpleSlider from '../../components/slick';
import ToDoListPage from '../ToDoListTemp';

import { getProductHotelListAction } from '../../redux/actions';
import { useEffect } from 'react';

import "./Home.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function HomePage({getProductHotelList, productHotelList}) {
  useEffect(()=>{
    getProductHotelList({
      page:1,
      limit:10
    });

  },[]);
  
  function renderProductHotelList() {
    console.log("🚀 ~ file: index.jsx ~ line 26 ~ returnproductHotelList.data.map ~ productHotelList", productHotelList)
    return productHotelList.data.map((item, index) => {
     
      return (
        <>
          <Col span='8'
          key={index}>
          <img className="item" src={item.img}
          
          onClick={() => history.push(`/product/${item.id}`)}/>
          <h2 className="thongtin">{item.name}</h2>
          </Col>
        </>
      )
    })
  }

  return (
    <div>
        <SimpleSlider/>
      <h1>Điểm đến ưa thích trong nước</h1>
      {/* Home
      <Button
        type="primary"
        onClick={() => history.push(ROUTERS.LOGIN)}
      >
        Go to Product list
      </Button> */}
      <Row gutter={[8,8]}>

      {renderProductHotelList()}
      </Row>
      <ToDoListPage/>

    </div>
    
  );
    
 
}
const mapStateToProps = (state) => {
  const { productHotelList } = state.productHotelReducer;
  return {
    productHotelList: productHotelList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductHotelList: (params) => dispatch(getProductHotelListAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
