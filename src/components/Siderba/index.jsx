import { Row, Col, List, Card } from 'antd';
// import {List } from '@ant-design/icons';
import './Siderba.css';
import { getRateListAction} from '../../redux/actions';
import { connect } from 'react-redux';
import { useState,useEffect } from 'react';
import { Rate } from 'antd';


const { Meta } = Card;

function Siderba({
  // getHotelList,
  getRateList,
  rateList,
  getListHotelByRate,
  listHotel
  
}) {

  const [rateSelected, setRateSelected] = useState(0);
  useEffect(() => {
    getRateList();
  }, []);


  function handleFilterLocation(id) {
    setRateSelected(id);
    getListHotelByRate(id);
  }

  return (
    <>
      <Row gutter={16} style={{ padding: '0 16px' }}>
        <Col span={24}>
          <List
            size="small"
            header={<div>Tìm kiếm </div>}
            bordered
            dataSource={[ 1, 2, 3, 4, 5 ]}
            renderItem={(item) => 
              (
              <List.Item className ="list"
                onClick={() => handleFilterLocation(item)}
                style={{ color: rateSelected === item ? 'red' : 'black' }}
              >     
                  <Rate disabled defaultValue={item} /> 
                 
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>

  )
}
const mapStateToProps = (state) => {
  const { rateList, listHotel } = state.productHotelReducer;
  return {
    rateList: rateList,
    listHotel: listHotel,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRateList: (params) => dispatch(getRateListAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Siderba);