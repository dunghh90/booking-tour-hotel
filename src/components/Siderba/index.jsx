import { Row, Col, List, Card } from 'antd';
// import {List } from '@ant-design/icons';
import './Siderba.css';
import {getListHotelAction} from '../../redux/actions';
import { connect } from 'react-redux';
import { useState,useEffect } from 'react';
import { Rate } from 'antd';


const { Meta } = Card;

const RATING_LIST = [1, 2, 3, 4, 5];

function Siderba({
  getHotelList,
  locationId
}) {
  const [locationSelected, setLocationSelected] = useState(0);
  const [addressSelected, setAddressSelected] = useState(null);
  useEffect(() => {
    getHotelList({
      page: 1,
      limit: 4,
    })
  }, []);

  function handleFilterLocation(rate,address)
   {
  console.log("🚀 ~ file: index.jsx ~ line 31 ~ rate", rate)
  console.log("🚀 ~ file: index.jsx ~ line 31 ~ address", address)
  setLocationSelected(rate);
  setAddressSelected(address);
    getHotelList({
      page: 1,
      limit: 4,
      id: locationId,
      rate: rate,
      address: address,
    });
  }

  return (
    <>
      <Row gutter={16} style={{ padding: '0 16px' }}>
        <Col span={24}>
          <List
            size="small"
            header={<div>Tìm kiếm theo chất lượng</div>}
            bordered
            dataSource={RATING_LIST}
            renderItem={(item) => (
              <List.Item className ="list"
                onClick={() => handleFilterLocation(item)}
                // style={{ color: locationSelected === item ? 'red' : 'black' }}
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
            header={<div>Tìm kiếm theo tên đường</div>}
            bordered
            dataSource={[
              "Võ Nguyên Giáp",
              "Hàng Đẩy",
              "Nguyễn Văn Linh",
              "Lê Duẩn",
              "Tô Hiệu",
              "Điện Biên Phủ",
              "Trần Cao Vân"
            ]}
            renderItem={(item) => 
              (
              <List.Item className ="list"
                onClick={() => handleFilterLocation(item)}
                // style={{ color: locationSelected === item ? 'red' : 'black' }}
              >    
              {item} 
              </List.Item>
            )}
          />
        </Col>
      </Row> 

    </>

  )
}
const mapStateToProps = (state) => {
  const {  listHotel } = state.hotelReducer;
  console.log("🚀 ~ file: index.jsx ~ line 100 ~ mapStateToProps ~ listHotel",listHotel)
  
  return {
    
    listHotel: listHotel,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHotelList: (params) => dispatch(getListHotelAction(params)),

    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Siderba);