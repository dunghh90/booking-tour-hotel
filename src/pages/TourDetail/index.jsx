import { Card, Col, Row, Form, Input, Button, DatePicker, Space, InputNumber, Rate} from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import history from '../../utils/history';

import { EnvironmentOutlined , HistoryOutlined, DingtalkOutlined } from '@ant-design/icons';

import { getProductTourDetailAction, getProductTourListAction, bookingTourAction } from "../../redux/actions";
import { HomeOutlined } from '@ant-design/icons';
import CommentPage from '../Comment'
import moment from 'moment';

import './style.css'

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

  return (
    <>
      <Content className="site-layout" style={{ padding: '0 50px', display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ maxWidth: 1300, width: "100%" }}>
          <Row span={24} gutter={24}>
            <div className="content-header">
              <ol className="breadcrumb"  >
                <Space><HomeOutlined  /></Space>
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
          <Row style={{fontSize:40, fontWeight:"bold", fontFamily:"'Helvetica Neue',Helvetica,Arial,sans-serif"}}>
            {productTourDetail.data.name}
          </Row>
          <Row>
            <div style={{height:60, display:"flex", alignItems:"center", justifyContent:"center"}}>
            <span>Tuyệt vời</span>
            | 8 đánh giá
            </div>
          </Row>
          <Row span={24} gutter={24}>
            <Col span={16} xl={{ order: 1 }} lg={{ order: 1 }} md={{ order: 2 }} sm={{ order: 2 }} xs={{ order: 2 }}>
              <Row>
                <div style={{
                  width:"100%",
                  height:390,
                  backgroundRepeat: "no-repeat",
                  backgroundSize:"cover",
                  backgroundImage: "url('https://cdn2.ivivu.com/2020/01/15/17/ivivu-nam-dao-phu-quoc-750x390.gif')"
                  
                }}>

                </div>
              </Row>
              <Row style={{padding: "10px 10px", backgroundColor:"#d9d9d9"}}>
                  <Col span={6}><EnvironmentOutlined /> Phú Quốc</Col>
                  <Col span={6}><HistoryOutlined /> 3 ngày 2 đêm</Col>
                  <Col span={6}><DingtalkOutlined /> Phương tiện</Col>
                  <Col span={6} align="right">Mã tour: TO516</Col>
              </Row>
              <div style={{ backgroundColor: "white", padding: "10px 30px 30px 30px", textAlign: "justify" }}>
                <div dangerouslySetInnerHTML={{ __html: productTourDetail.data.information }}></div>
              </div>
              <div style={{backgroundColor:"white", padding:16, marginTop:16}}>
                <CommentPage tourId={tourId} />
              </div>
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
                    <Button style={{ width: "100%", height:40, fontSize:18, backgroundColor:"#ffa940", color:"white" }}  htmlType="submit" onClick={() => handleBookingTour()}>
                      Đặt tour
                    </Button>
                  </Col>
                </Row>
              </div>

            </Col>

          </Row>
          <Row>
            <Card title="Tours du lịch Phú Quốc liên quan" extra={<a className="loadMore" href="#">XEM TẤT CẢ </a>} style={{width: "100%", marginTop:16}}>
                  <Row gutter={[28,28]}>
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
