import { Card, Col, Row, Form, Input, Button, DatePicker, Space, InputNumber } from "antd";
import { useEffect, useState  } from "react";
import { connect } from "react-redux";

import { getProductTourDetailAction, getProductTourListAction } from "../../redux/actions";
import { HomeOutlined } from '@ant-design/icons';
import moment from 'moment';

import './style.css'
import { Content } from "antd/lib/layout/layout";


function TourDetailPage({
  productTourDetail,
  getProductTourDetail,
  match,
}) {
  const [orderTourForm] = Form.useForm();
  const productId = match.params.id;
  // const [optionSelected, setOptionSelected] = useState({});

  const [ money, setMoney] = useState(0);
  
  const onFinish = (values) => {
  };
  const dateFormat = 'DD/MM/YYYY';
  
  useEffect(() => {
    getProductTourDetail({id: productId});
    setMoney(productTourDetail.data.price);
  }, [])

  var d = new Date();
  useEffect(() => {
    if (productTourDetail.data.id) {
      setMoney(productTourDetail.data.price);
      //setOptionSelected(productDetail.data.productOptions[0] || {})
    }
  }, [productTourDetail.data])
  
  function setTotalMoney(params) {
    console.log("🚀 ~ file: index.jsx ~ line 43 ~ setTotalMoney ~ params", params && params.dateStart.format('DD/MM/YYYY'))
    // const { child, adults  } = params;
    console.log("🚀 ~ file: index.jsx ~ line 4666 ~ setTotalMoney ~ adults", params)
  }
  return (
    <Content className="site-layout" style={{ padding: '0 50px'}}>
      <div style={{width:1000}}>
      <Row span={24} gutter={24}>
      <div className="content-header">
        <ol className="breadcrumb" itemscope="" itemtype="http://schema.org/BreadcrumbList">
          <Space><HomeOutlined /></Space>
          <li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">
            <a className="item" href="/du-lich/">
                <i class="fa fa-home"></i> <span itemprop="name">Trang chủ</span>
            </a>
            {/* <meta itemprop="position" content="1"> */}
          </li>
          <i style={{margin: "0px 10px"}}>|</i>
          <li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">
              <a className="item" href="/du-lich/tour-da-nang">
                  <span itemprop="name">Đà Nẵng</span>
              </a>
              {/* <meta itemprop="position" content="2"> */}
          </li>
          <i style={{margin: "0px 10px"}}>|</i>
          <li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem" class="active hidden-xs">

              <a className="item" class="link-detail-value" href="/du-lich/tour-da-nang-4n3d-hcm-da-nang-ba-na-hoi-an-hue-quang-binh/1189">
                  <span itemprop="name">Tour Đà Nẵng 4N3D: TP. HCM - Đà Nẵng - Bà Nà - Hội An - Huế - Quảng Bình</span>
              </a>
              {/* <meta itemprop="position" content="3"> */}
          </li>
        </ol>
      </div>
      </Row>
      <Row span={24} gutter={24}>
        <Col span={19}>
          <h2>{productTourDetail.data.name}</h2>
          <div dangerouslySetInnerHTML={{__html:productTourDetail.data.information}}></div>
        </Col>
        <Col span={5}>
        <div class="order-form-container">
            <Form
              form={orderTourForm}
              // {...layout}
              name="basic"
              initialValues={{ remember: true }}
              // onFinish={(values) => login(values)}
              onFinish={(values) => {
                setTotalMoney(values);
              }}
            >
              <Form.Item
                label={<label style={{ color: "white" }}>Chọn ngày khởi hành:</label>}
                name="dateStart"
              >
                <DatePicker defaultValue={moment(d.toLocaleDateString(), dateFormat)} format={dateFormat} />
              </Form.Item>
              <Form.Item
                label={<label style={{ color: "white" }}>Người lớn:</label>}
                name="adults"
              >
                <InputNumber min={1} max={10} defaultValue={3} onChange={setTotalMoney()}/>
                {/* <InputNumber /> */}
              </Form.Item>

              <Form.Item
                label={<label style={{ color: "white" }}>Trẻ em:</label>}
                name="child"
                
              >
                <InputNumber min={1} max={10} defaultValue={3} onChange={setTotalMoney()}/>
              </Form.Item>

              {/* <Form.Item> {...tailLayout}> */}
              {money && money.toLocaleString('it-IT',{
              style: 'currency',
              currency: 'VND',
              })}
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit">
                    Đặt tour
                  </Button>
                </Space>
              </Form.Item>
            </Form>
            
          </div>

        </Col>
        
      </Row>
      </div>
    </Content>
  );
}

const mapStateToProps = (state) => {
  const { productTourDetail } = state.productTourReducer;
  return {
    productTourDetail,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductTourDetail: (params) => dispatch(getProductTourDetailAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TourDetailPage);
