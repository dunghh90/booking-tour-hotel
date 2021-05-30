import { Col, Layout,  Input, Form, Button, Row, DatePicker } from 'antd';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { EnvironmentOutlined, SendOutlined } from '@ant-design/icons';
import history from '../../utils/history';

import { getTourListAction } from '../../redux/actions';

function SearchTour({getTourList, setKeySearchLocation}) {

  // const [keySearchLocation, setKeySearchLocation] = useState('');

  // const filterTourList = tourList.data.filter((item) => {
  //   return item.location.name.trim().toLowerCase().indexOf(keySearchLocation.trim().toLowerCase()) !== -1
  // })
  // useEffect(() => {
  //   getTourList({
  //     page: 1,
  //     limit: 10,
  //     locationId
  //   });
  // }, []);
  const currentDate = new Date();

  return (
    <Row style={{margin:'10px 0px', fontSize:20, padding:"15px 10px", borderRadius:4, backgroundColor:"#bae7ff"}}>
      <Form
        name="basic"
        initialValues={{ location: '' }}
        layout="inline"
        onFinish={(values) => {
          setKeySearchLocation(values.location); 
          getTourList({
            page: 1,
            limit: 10
          });
          console.log("🚀 ~ file: index.jsx ~ line 36 ~ SearchTour ~ values", values)
          history.push(`/listTour/${values.location}`);
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
  )

}

const mapStateToProps = (state) => {
  const { tourList } = state.tourReducer;
  return {
    tourList: tourList,

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTourList: (params) => dispatch(getTourListAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchTour);

