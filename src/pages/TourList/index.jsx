import { Col, Layout,  Input, Form, Button, Row, List, DatePicker } from 'antd';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { EnvironmentOutlined, SendOutlined } from '@ant-design/icons';

import moment from 'moment';

import { getTourListAction, getLocationListAction } from '../../redux/actions';
import ItemTour from './components/ItemTour'
import './styleTour.css'

function TourListPage({ 
  getTourList, 
  getLocationList,
  tourList,
  locationList,
  match
}) {
  console.log("🚀 ~ file: index.jsx ~ line 19 ~ match", match.params.keySearch)

  const [locationSelected, setLocationSelected] = useState(null);
  
  const [keySearchLocation, setKeySearchLocation] = useState(match.params.keySearch?match.params.keySearch:'');

  

  const locationId = match.params.id;

  useEffect(() => {
    getLocationList();
    getTourList({
      page: 1,
      limit: 10,
      locationId
    });
  }, []);

  useEffect(() => {
    getTourList({
      page: 1,
      limit: 10
    });
  }, [keySearchLocation]);

  const filterTourList = tourList.data.filter((item) => {
    return item.location.name.trim().toLowerCase().indexOf(keySearchLocation.trim().toLowerCase()) !== -1
  })
  let filterLocationById = locationList.data.filter((item) => {
    return item.id == locationSelected;
  })

  function handleFilterLocaiton(id) {
    setKeySearchLocation('');
    setLocationSelected(id);
    getTourList({
      page: 1,
      limit: 10,
      locationId: id,
    })
  }
  const currentDate = new Date();
  function renderTourList() {
    if (tourList.load) return <p>Loading...</p>;

    return (
      <div style={{display:"flex", justifyContent:"center"}}>
        <div style={{padding: '10px 50px', maxWidth:1400, width:"100%"}}>
          <Row gutter={16} style={{margin:'0 80px', fontSize:20, padding:"15px 10px", borderRadius:4, backgroundColor:"#bae7ff"}}>
          <Form
            name="basic"
            initialValues={{ location: '' }}
            layout="inline"
            onFinish={(values) => {
              setLocationSelected(null);
              setKeySearchLocation(values.location); 
              getTourList({
                page: 1,
                limit: 10
              });
            }}
          >
            <Col span={7}>
                <Form.Item
                  name="location"
                >
                  <Input labelFontSize={100} fontSize={100} prefix={<EnvironmentOutlined />} style={{padding: '10px 50px', height:50, borderRadius:4, backgroundColor:"white"}} placeholder="Bạn muốn đi đâu?" />
                </Form.Item>
              </Col>
            <Col span={7}>
              <Form.Item
                  name="dateBooking"
                >
              <DatePicker style={{padding: '10px 50px', width:'100%', height:50, borderRadius:4, backgroundColor:"white"}} defaultValue={moment(currentDate)} format="DD/MM/YYYY"/>
              </Form.Item>
            </Col>
            <Col span={7}>
            <Form.Item
                  name="placeFrom"
                >
              <Input labelFontSize={100} fontSize={100} prefix={<SendOutlined />} style={{padding: '10px 50px', height:50, borderRadius:4, backgroundColor:"white"}} placeholder="Khởi hành từ" />
            </Form.Item>
            </Col>
            <Col span={3} >
              <Row style={{width:"100%"}} justify="end">
                <Button htmlType="submit" style={{padding: '10px 50px', height:50, borderRadius:4, backgroundColor:"#ffe58f", color:"#003a8c", fontWeight:600}} >
                  Tìm
                </Button>
              </Row>
            </Col>
            </Form>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <List
                size="small"
                header={<h4 style={{fontSize:18, color:"#333", borderColor: "#ddd"}}>Địa điểm HOT trong nước</h4>}
                bordered
                dataSource={[
                  { name: "Tất cả" },
                  ...locationList.data,
                ]}
                renderItem={(item) => 
                  (
                  <List.Item
                    onClick={() => handleFilterLocaiton(item.id)}
                    // style={{color: locationSelected === item.id ? 'red': 'black' }}
                    className ="list"
                  >
                    {item.name}
                  </List.Item>
                )}
              />

              <List
                size="small"
                header={<h4 style={{fontSize:18, color:"#333", borderColor: "#ddd"}}>Tours theo chủ đề</h4>}
                bordered
                style={{marginTop:20}}
                dataSource={[
                  "Tour cao cấp",
                  "Tour trải nghiệm",
                  "Trải nghiệm địa phương",
                  "Tour nội địa hot",
                  "Tour sông nước miền tây",
                  "Tour truyền thống",
                  "Tour biển đảo",
                  "Tour nước ngoài"
                ]}
                renderItem={(item, index) => 
                  (
                  <List.Item
                    onClick={() => handleFilterLocaiton(index + 1)}
                    // style={{ color: locationSelected === item.id ? 'red': 'black'}}
                    className="list"
                  >
                    {item}
                  </List.Item>
                )}
              />

              
            </Col>
            <Col span={18} style={{marginTop:16}}>
              {keySearchLocation && <Row style={{fontSize:28, fontWeight:600, color:"#69c0ff"}}>Tour du lịch "{keySearchLocation}" </Row>}
              {filterLocationById.length !== 0 && <Row style={{fontSize:28, fontWeight:600, color:"#69c0ff"}}>Tour du lịch "{filterLocationById[0].name}" </Row>}
              {
                filterTourList.load ? (<p>Loading...</p>) 
                :(filterTourList.map((item, index) => {
                  return (
                    <ItemTour
                      key={index}
                      title={item.name}
                      link={item.linkList}
                      description={item.description}
                      price={item.price}
                      time={item.time}
                      rate={item.rate}
                      startDate={item.dateStart}
                      id={item.id}
                    />
                  )
                }))
              }
            </Col>

          </Row>
        </div>
      </div>
    )
  }

  return (
    <div>
      {renderTourList()}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { tourList } = state.tourReducer;
  const { locationList } = state.hotelReducer;
  return {
    tourList: tourList,
    locationList: locationList

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTourList: (params) => dispatch(getTourListAction(params)),
    getLocationList: (params) => dispatch(getLocationListAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TourListPage);
  
  