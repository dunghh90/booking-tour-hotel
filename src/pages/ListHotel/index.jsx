import { Button, Card, Col, Row } from 'antd';

import { connect } from 'react-redux';
import { getListHotelAction } from '../../redux/actions';
import { useEffect, useState } from 'react';
import history from '../../utils/history';
import { Rate } from 'antd';
import './styles.css';
import { ThunderboltOutlined } from '@ant-design/icons';
import  Slipder from '../../components/slickHotel';

import Siderba from '../../components/Siderba';


function ListHotelPage({
  listHotel,
  getListHotel,
  match,
}) {
  const locationId = match.params.id;
  const [roomSelected, setRoomSelected] = useState({});
 
  
  useEffect(() => {
   
    getListHotel({
      page: 1,
      limit: 4,
      id: locationId
    });
  }, [])

  useEffect(() => {
    if (listHotel.data.id) {
      setRoomSelected(listHotel.data.hotels[0] || {})
    }
  }, [listHotel.data])

   

  function loadmoreHotel(){
    getListHotel({
      more: true,
      // page: page + 1,
      page: listHotel.page + 1,
      limit: 4,
      id: locationId,
    });
  }

  function renderListHotel() {
    return listHotel.data.map((item, index) => {
      return (
        <>
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Card
                hoverable
                title = {item.combo}
                cover={<div alt="example" src="" />}
                style ={{marginTop: 16 }}
                onClick={() => history.push(`/hotels/${item.id}`)}
              >
                <div className="optiondetail">
                  <img className="img1" src={item.img} alt="" />
                  <div className="option">
                    <h2 className ="name" > {item.name} </h2>
                    <Rate disabled value={item.rate} />
                    <h5 className="adr"><ThunderboltOutlined />.{item.Title}</h5>
                    {/* <button>{item.note}</button> */}
                     <div
                      dangerouslySetInnerHTML={{
                        __html: item.note
                      }}>
                      </div>
                    <span className="price1">{item.Price.toLocaleString()} VND</span>
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
       < Slipder/>
       <h1 className="hotel">Khách sạn</h1>
       <span className="hotro">Cần hỗ trợ liên hệ: 0702321494</span>
      <Row gutter={[8, 8]} justify="center">
        <Col span={7}>
          < Siderba locationId={locationId} />
        </Col>
        <Col span={17}>
          {renderListHotel()}
        </Col>
        {listHotel.data.length % 4 === 0 && (
            <Button onClick={()=>loadmoreHotel()}>Xem thêm khách sạn</Button>
        )
      }
      </Row>
  
    </>
  );
}

const mapStateToProps = (state) => {
console.log("🚀 ~ file: index.jsx ~ line 102 ~ mapStateToProps ~ state", state)
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



