import { Row, Col, List, Card } from 'antd';
// import {List } from '@ant-design/icons';
import './Siderba.css';
import { getRateListAction ,getListHotelAction} from '../../redux/actions';
import { connect } from 'react-redux';
import { useState,useEffect } from 'react';
import { Rate } from 'antd';


const { Meta } = Card;

const RATING_LIST = [1, 2, 3, 4, 5];

function Siderba({
  getHotelList,
  getRateList,
  locationId,
  listHotel
  
}) {
  console.log("🚀 ~ file: index.jsx ~ line 21 ~ locationId", locationId)

  const [locationSelected, setLocationSelected] = useState(0);
  useEffect(() => {
    // getRateList();
    getRateList({
      page: 1,
      limit: 4,
      
    });
    getHotelList({
      page: 1,
      limit: 4,
    })
  }, []);


  function handleFilterLocation(rate) {
    setLocationSelected(rate);
    getHotelList({
      page: 1,
      limit: 4,
      id: locationId,
      rate: rate,
    });
  }

  return (
    <>
      <Row gutter={16} style={{ padding: '0 16px' }}>
        <Col span={24}>
          <List
            size="small"
            header={<div>Tìm kiếm </div>}
            bordered
            dataSource={RATING_LIST}
            renderItem={(item) => (
              <List.Item className ="list"
                onClick={() => handleFilterLocation(item)}
                style={{ color: locationSelected === item ? 'red' : 'black' }}
              >     
                  <Rate disabled defaultValue={item} /> 
              </List.Item>
            )}
          />
        </Col>
      </Row>
       <Row gutter={16} style={{ padding: '0 16px' }}>
   
         <Col span={24}>
          <List
            size="small"
            header={<div>Tìm kiếm </div>}
            bordered
            dataSource={[
              ...listHotel.data,
            ]}
            renderItem={(item) => (
              <List.Item className ="list"
                onClick={() => handleFilterLocation(item.Title)}
                style={{ color: locationSelected === item.Title ? 'red' : 'black' }}
              >     
                  {item.Title}  
              </List.Item>
            )}
          />
        </Col>
      </Row> 

    </>

  )
}
const mapStateToProps = (state) => {
  const { rateList } = state.productHotelReducer;
  const { listHotel } = state.productHotelReducer;
  console.log("🚀 ~ file: index.jsx ~ line 69 ~ mapStateToProps ~ rateList", rateList)
  
  return {
    rateList: rateList,
    listHotel: listHotel,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRateList: (params) => dispatch(getRateListAction(params)),
    getHotelList: (params) => dispatch(getListHotelAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Siderba);