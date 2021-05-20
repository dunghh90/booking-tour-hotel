import { Row, Col, List, Card } from 'antd';
// import {List } from '@ant-design/icons';
import './Siderba.css';
import { getRateListAction ,getListHotelAction} from '../../redux/actions';
import { connect } from 'react-redux';
import { useState,useEffect } from 'react';
import { Rate } from 'antd';


const { Meta } = Card;

function Siderba({
  // getHotelList,
  getRateList,
  rateList,
  // listHotel
  
}) {

  const [locationSelected, setLocationSelected] = useState(0);
  useEffect(() => {
    // getRateList();
    getRateList({
      page: 1,
      limit: 4,
      
    });
  }, []);


  function handleFilterLocation(id) {
    console.log("🚀 ~ file: index.jsx ~ line 20 ~ handleFilterLocation ~ id", id)
    setLocationSelected(id);
    getRateList({
      page: 1,
      limit: 4,
      rateId: id,

    });
  }

  return (
    <>
      <Row gutter={16} style={{ padding: '0 16px' }}>
        {/* <Col span={24} >
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>,
       </Col> */}
        <Col span={24}>
          <List
            size="small"
            header={<div>Tìm kiếm </div>}
            bordered
            dataSource={[
              ...rateList.data,
            ]}
            renderItem={(item) => (
              <List.Item className ="list"
                onClick={() => handleFilterLocation(item.id)}
                style={{ color: locationSelected === item.id ? 'red' : 'black' }}
              >     
                  <Rate disabled defaultValue={item.rate} /> 
                 
              </List.Item>
            )}
          />
        </Col>
      </Row>
      {/* <Row gutter={16} style={{ padding: '0 16px' }}>
        {/* <Col span={24} >
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>,
       </Col> */}
        {/* <Col span={24}>
          <List
            size="small"
            header={<div>Tìm kiếm </div>}
            bordered
            dataSource={[
              ...listHotel.data.rooms,
            ]}
            renderItem={(item) => (
              <List.Item
                onClick={() => handleFilterLocation(item.id)}
                style={{ color: locationSelected === item.id ? 'red' : 'black' }}
              >     
                  {item.name} 
                 
              </List.Item>
            )}
          />
        </Col>
      </Row> */} 

    </>

  )
}
const mapStateToProps = (state) => {
  const { rateList } = state.productHotelReducer;
  // const { listHotel } = state.productHotelReducer;
  console.log("🚀 ~ file: index.jsx ~ line 69 ~ mapStateToProps ~ rateList", rateList)
  
  return {
    rateList: rateList,
    // listHotel: listHotel,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRateList: (params) => dispatch(getRateListAction(params)),
    // getHotelList: (params) => dispatch(getListHotelAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Siderba);