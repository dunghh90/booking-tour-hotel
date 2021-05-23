import { Card, Col, Row, Form, Input, Button, DatePicker, Space, InputNumber, Rate } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import history from '../../utils/history';

import { getProductTourDetailAction, getProductTourListAction, bookingTourAction } from "../../redux/actions";
import { HomeOutlined } from '@ant-design/icons';
import moment from 'moment';

import './style.css'
import './css/animate.min.css'
import './css/custom-home.css'
import './css/daterangepicker.css'
import './css/font-awesome.min.css'
import './css/ivivu_icons.min.css'
import './css/owl.carousel.min.css'
import './css/owl.theme.default.min.css'
import './css/sweetalert.css'

import { Content } from "antd/lib/layout/layout";


function TourDetailPage({
  productTourDetail,
  getProductTourDetail,
  bookingTour,
  match,
}) {
  const [orderTourForm] = Form.useForm();
  const { TextArea } = Input;
  const tourId = match.params.id;
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const [money, setMoney] = useState(productTourDetail.data.price);
  const [countAdults, setCountAdults] = useState(1);
  const [countChild, setCountChild] = useState(0);
  var d = new Date();
  const [dateSelected, setDateSelected] = useState(moment(d).format('YYYY/MM/DD'));

  const [rateTourForm] = Form.useForm();


  useEffect(() => {
    getProductTourDetail({ id: tourId });
  }, [])

  const dateFormat = 'DD/MM/YYYY';
  useEffect(() => {
    if (productTourDetail.data.id) {
      setMoney(productTourDetail.data.price);
    }
  }, [productTourDetail.data])

  function setMoneyAdults(values) {
    setMoney(productTourDetail.data.price * values + productTourDetail.data.price * countChild * 0.5);
  }
  function setMoneyChild(values) {
    setMoney(productTourDetail.data.price * countAdults + productTourDetail.data.price * values * 0.5);
  }

  function handleBookingTour() {
    if (!userInfo) {
      alert('Bạn cần đăng nhập!');
    } else if (!dateSelected) {
      alert('Cần chọn ngày đặt tour!');
    } else {
      // localStorage.setItem('carts', JSON.stringify(newCartList));
      // TODO Check tourId và startDate nếu tồn tại trong db thì ko add booking
      bookingTour({
        userId: userInfo.id,
        tourId: parseInt(tourId),
        startDate: dateSelected,
        numberAdults: countAdults,
        numberChild: countChild,
      })
    }
  }

  function handleSelectedDate(value) {
    console.log("🚀 ~ file: index.jsx ~ line 68 ~ handleSelectedDate ~ value", value)
    // const { startDate } = value;
    // setDateSelected(moment(startDate).format('YYYY/MM/DD'));
  }

  return (
    <>
      <Content className="site-layout" style={{ padding: '0 50px', display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ maxWidth: 1400, width: "100%" }}>
          <Row span={24} gutter={24}>
            <div className="content-header">
              <ol className="breadcrumb"  >
                <Space><HomeOutlined /></Space>
                <li  >
                  <a className="item" href="/du-lich/">
                    <i className="fa fa-home"></i> <span>Trang chủ</span>
                  </a>
                </li>
                <i style={{ margin: "0px 10px" }}>|</i>
                <li  >
                  <a className="item" href="/du-lich/tour-da-nang">
                    <span>Đà Nẵng</span>
                  </a>
                </li>
                <i style={{ margin: "0px 10px" }}>|</i>
                <li className="active hidden-xs">

                  <a className="item" href="/du-lich/tour-da-nang-4n3d-hcm-da-nang-ba-na-hoi-an-hue-quang-binh/1189">
                    <span >Tour Đà Nẵng 4N3D: TP. HCM - Đà Nẵng - Bà Nà - Hội An - Huế - Quảng Bình</span>
                  </a>
                </li>
              </ol>
            </div>
          </Row>
          <Row span={24} gutter={24}>
            <Col span={16} xl={{ order: 1 }} lg={{ order: 1 }} md={{ order: 2 }} sm={{ order: 2 }} xs={{ order: 2 }}>
              <div style={{ backgroundColor: "white", padding: 30, textAlign: "justify" }}>
                <h2>{productTourDetail.data.name}</h2>
                <div dangerouslySetInnerHTML={{ __html: productTourDetail.data.information }}></div>
              </div>
              <div style={{backgroundColor:"white", padding:16, marginTop:16}}>
                <Form
                  form={rateTourForm}
                  
                  name="rateTourForm"
                  style={{marginTop:16}}
                  // initialValues={productSelected.id
                  //   ? {...productSelected, hasOption: false }
                  //   : {}
                  // }
                >
                  <Form.Item name="rateTour" label="Chọn sao:">
                    <Rate allowHalf />
                  </Form.Item>
                  <Form.Item layout="vertical" name="rateDescription" label="Đánh giá">
                    <TextArea rows={4} />
                  </Form.Item>
                  
                  <Row justify="end">
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Đánh giá
                      </Button>
                    </Form.Item>
                  </Row>
                </Form>

                {/* <Row> */}
                <p><h3>Đánh giá gần đây</h3></p>
                <div class="horizontalLine"></div>
                {/* </Row> */}
                <Row>
                  <Col span={6}>
                    <h4>Hoang Huu dung</h4>
                  </Col>
                  <Col span={16}>
                    <p>
                      Tuyệt vời
                    </p>
                    <p>
                      Mình hài long về tour
                    </p>
                  </Col>
                </Row>
              </div>

              <Card title="Tours du lịch Phú Quốc liên quan" style={{width: "100%", marginTop:16}}>
                <Row gutter={[8,8]}>
                  <Col span={8}>
                    <Card 
                      hoverable
                      cover={<img alt="Phú Quốc" src="https://cdn2.ivivu.com/2020/07/10/17/ivivu-phu-quoc-bia-360x225.gif" />}
                    >

                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card 
                      hoverable
                      cover={<img alt="Phú Quốc" src="https://cdn2.ivivu.com/2020/07/10/17/ivivu-phu-quoc-bia-360x225.gif" />}
                    >
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card 
                      hoverable
                      cover={<img alt="Phú Quốc" src="https://cdn2.ivivu.com/2020/07/10/17/ivivu-phu-quoc-bia-360x225.gif" />}
                    >

                    </Card>
                  </Col>
              </Row>
            </Card>
            </Col>
            <Col span={8} xl={{ order: 2 }} lg={{ order: 2 }} md={{ order: 1 }} sm={{ order: 1 }} xs={{ order: 1 }}>
              <div className="order-form-container">
                <Row span={24} gutter={[10, 10]}>
                  <Col span={10}>Chọn ngày khởi hành:</Col>
                  <Col span={14}><DatePicker defaultValue={moment(d)} format={dateFormat} onChange={(value) => setDateSelected(value)} /></Col>
                  <Col span={10}>Người lớn:</Col>
                  <Col span={14}><InputNumber min={1} defaultValue={1} onChange={(values) => { setCountAdults(values); setMoneyAdults(values); }} /></Col>
                  <Col span={10}>Trẻ em:</Col>
                  <Col span={14}><InputNumber min={0} onChange={(values) => { setCountChild(values); setMoneyChild(values); }} /></Col>
                  <Col span={24} ><div style={{ fontSize: 24, color: "#ffbd00", float: "right", fontWeight: "bold" }}>{money && (money.toLocaleString() + " VND")}</div></Col>
                  <Col span={24}>
                    <Button type={{ width: "100%" }} type="primary" htmlType="submit" onClick={() => handleBookingTour()}>
                      Đặt tour
            </Button>
                  </Col>
                </Row>
              </div>

            </Col>

          </Row>
        </div>
      </Content>
    </>
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
    bookingTour: (params) => dispatch(bookingTourAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TourDetailPage);
