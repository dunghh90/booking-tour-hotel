import { Button, Card, Col, Row, List } from 'antd';

import { connect } from 'react-redux';
import { getListHotelAction } from '../../redux/actions';
import { useEffect, useState } from 'react';
import history from '../../utils/history';
import { Rate } from 'antd';
import './styles.css';
import { ThunderboltOutlined } from '@ant-design/icons';
import SearchTourPage from '../SearchTour';

function ListHotelPage({
  listHotel,
  getListHotel,
  match,
}) {
  const [categorySelected, setCategorySelected] = useState(undefined);
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


  function handleFilterLocation(id) {
    setCategorySelected(id);
    getListHotel({
      page: 1,
      limit: 4,
      id: locationId,
      rate: id
    });
  }

  function loadmoreHotel(){
    getListHotel({
      more: true,
      // page: page + 1,
      page: listHotel.page + 1,
      limit: 4,
      id: locationId,
      rate: categorySelected
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
                style ={{marginTop: 16}}
                onClick={() => history.push(`/hotels/${item.id}`)}
              >
                <div className="optiondetail">
                  <img className="img1" src={item.img} alt="" />
                  <div className="option">
                    <h2 > {item.name} </h2>
                    <Rate disabled defaultValue={item.rate} />
                    <h5 className="adr"><ThunderboltOutlined />.{item.Title}</h5>

                   


                    <span className="price">{item.Price} VND</span>
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
      <SearchTourPage/>
      <Row gutter={[8, 8]} justify="center">
        <Col span={7}>
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
                  >     
                      <Rate disabled defaultValue={item} /> 
                    
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </Col>
        <Col span={17}>
          {renderListHotel()}
        </Col>
        {listHotel.data.length % 4 === 0  && (
            <Button onClick={()=>loadmoreHotel()}>Xem thêm khách sạn</Button>
        )}
  
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
    getListHotel: (params) => dispatch(getListHotelAction(params))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListHotelPage);



