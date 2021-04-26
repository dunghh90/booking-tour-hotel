import {
  Form, Input, DatePicker,Button, Space,
  Row,
  Col,
  ConfigProvider
} from 'antd';
import { useState } from "react";

import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';

// import { connect } from 'react-redux';

// import history from '../../utils/history';
// import { loginAction, registerAction } from '../../redux/actions';
import './styleSearchTour.css';


function SearchTourPage(props) {
  const { productTourList } = props;


  const [searchKey, setSearchKey] = useState({});
  function checkDateStart(param) {
    return item.dateStart.trim().format("DD/MM/YYYY") === param.placeTravel.trim().toLowerCase())
  }

  function searchTour(params){
  console.log("🚀 ~ file: index.jsx ~ line 20 ~ searchTour ~ params", params)
  console.log("🚀 ~ file: index.jsx ~ line 20 ~ searchTour ~ params", params.dateStart.format("DD/MM/YYYY"))
    const filterTourList = productTourList.filter((item) => {
      return item.title.trim().toLowerCase().indexOf(params.placeTravel.trim().toLowerCase()) !== -1 && true;
    });
    
  }

  return (
    <div className="where-togo-area">
      <div className="container">
        <div className="row align-items-center">
          <Row>
          <Col span={6}>
              <div className="form_area">
                <h3>Bạn muốn đi đâu?</h3>
              </div>
          </Col>

          <Col span={18}>
            <div className="search_wrap">
            
            <Form
              // {...layout}
              name="search_form"
              initialValues={{ remember: true }}
              onFinish={(values) => searchTour(values)}
            >
              <Space direction="horizontal">
              <Form.Item
                // label={<label style={{ color: "white" }}>Email</label>}
                name="placeTravel"
              >
                <Input placeholder="Nơi đến?"/>
              </Form.Item>

              <Form.Item name="dateStart">
                {/* <ConfigProvider locale={locale}>
                  <DatePicker defaultValue={moment('2015-01-01', 'YYYY-MM-DD')} />
                </ConfigProvider> */}
                <DatePicker placeholder="Chọn ngày bắt đầu" style={{width:170}} />
              </Form.Item>
              <Form.Item
                // label={<label style={{ color: "white" }}>Email</label>}
                name="placeStart"
              >
                <Input placeholder="Khởi hành từ"/>
              </Form.Item>
              <Form.Item>
              <Button type="primary" htmlType="submit">
                    Search
              </Button>
              </Form.Item>
              </Space>
            </Form>
            </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default SearchTourPage;