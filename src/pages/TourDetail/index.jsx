import { Breadcrumb, Card, Col, Row, Form, Input, Button, DatePicker, Space, InputNumber, Modal, List} from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import history from '../../utils/history';

import { EnvironmentOutlined , HistoryOutlined, DingtalkOutlined } from '@ant-design/icons';

import { getTourDetailAction, getTourListAction, bookingTourAction } from "../../redux/actions";
import { HomeOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import CommentPage from '../../components/Comment'
import moment from 'moment';

import './style.css'

import { Content } from "antd/lib/layout/layout";


function TourDetailPage({
  tourDetail,
  getTourDetail,
  bookingTour,
  userInfo,
  match,
}) {
  const [orderTourForm] = Form.useForm();
  const { TextArea } = Input;
  const tourId = match.params.id;
  // const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const [money, setMoney] = useState(tourDetail.data.price);
  const [countAdults, setCountAdults] = useState(1);
  const [countChild, setCountChild] = useState(0);
  var d = new Date();
  const [dateSelected, setDateSelected] = useState(moment(d).format('YYYY/MM/DD'));

  const [rateTourForm] = Form.useForm();


  useEffect(() => {
    getTourDetail({ id: tourId });
  }, [])

  const dateFormat = 'DD/MM/YYYY';
  useEffect(() => {
    if (tourDetail.data.id) {
      setMoney(tourDetail.data.price);
    }
  }, [tourDetail.data])

  function setMoneyAdults(values) {
    setMoney(tourDetail.data.price * values + tourDetail.data.price * countChild * 0.5);
  }
  function setMoneyChild(values) {
    setMoney(tourDetail.data.price * countAdults + tourDetail.data.price * values * 0.5);
  }

  function renderConfirmTour() {
    return (
      <>
        <Row ><h3>{tourDetail.data.name}</h3></Row>
        <Row>
          <Col span={10}>Số lượng người lớn: </Col>
          <Col span={14}>{countAdults}</Col>
          <Col span={10}>Số lượng trẻ em: </Col>
          <Col span={14}>{countChild}</Col>
          <Col span={24}>Tổng tiền: {money.toLocaleString()} VNĐ</Col>
        </Row>
      </>
    )
  }

  function showConfirmBooking() {
    Modal.confirm({
      title: 'Thông tin tour đã đặt:',
      icon: <ExclamationCircleOutlined />,
      content: renderConfirmTour(),//'Tour Đà Nẵng 2 ngày 3 đêm',
      okText: 'Xác nhận',
      cancelText: 'Huỷ',
      onOk() {
        console.log('OK');
        bookingTour({
          userId: userInfo.data.id,
          tourId: parseInt(tourId),
          startDate: dateSelected,
          numberAdults: countAdults,
          numberChild: countChild,
          totalPrice: money
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  function handleBookingTour() {
    if (!userInfo.data.id) {
      alert('Bạn cần đăng nhập!');
      history.push({
        pathname: '/login',
        state: {
          prevPath: `tours/${tourId}`
        }
      })
    } else if (!dateSelected) {
      alert('Cần chọn ngày đặt tour!');
    } else {
      // localStorage.setItem('carts', JSON.stringify(newCartList));
      // TODO Check tourId và startDate nếu tồn tại trong db thì ko add booking
      showConfirmBooking();
    }
  }

  return (
    <>
      <Content className="site-layout" style={{ padding: '0 50px', display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ maxWidth: 1300, width: "100%" }}>
          {/* <Row >
              <ul className="listPath" >
                <li><HomeOutlined  /> <a className="itemPath" href="/du-lich/">Trang chủ</a></li>
                <li><div style={{display:"inline", color:"#bfbfbf", padding:"0px 10px"}} >\</div><a className="itemPath" href="/du-lich/">Đà Nẵng</a></li>
                <li><div style={{display:"inline", color:"#bfbfbf", padding:"0px 10px"}}>\</div><a className="itemPath" href="/du-lich/">Tour Đà Nẵng 4N3D: TP. HCM - Đà Nẵng - Bà Nà - Hội An - Huế - Quảng Bình</a></li>
              </ul>
          </Row> */}
          <Row>
            <Breadcrumb>
              <Breadcrumb.Item><HomeOutlined  /> Trang chủ</Breadcrumb.Item>
              <Breadcrumb.Item><a href="">Đà Nẵng</a></Breadcrumb.Item>
              <Breadcrumb.Item><a href="">Tour Đà Nẵng 4N3D: TP. HCM - Đà Nẵng - Bà Nà - Hội An - Huế - Quảng Bình</a></Breadcrumb.Item>
            </Breadcrumb>
          </Row>
          <Row style={{fontSize:37, fontWeight:600, color:"#10239e", fontFamily:"'Helvetica Neue',Helvetica,Arial,sans-serif"}}>
            {tourDetail.data.name}
          </Row>
          <Row justify="start" style={{margin:"10px 0"}}>
                <span className="score-container">
                  <span className="score">{tourDetail.data.rate}.0</span>
                  <span className="score-description">Tuyệt vời</span>
                </span>
                <span>| 1 đánh giá</span>
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
                <div dangerouslySetInnerHTML={{ __html: tourDetail.data.information }}></div>
              </div>
              <div style={{backgroundColor:"white", padding:16, marginTop:16}}>
                <CommentPage tourId={tourId} />
              </div>
            </Col>
            <Col span={8} xl={{ order: 2 }} lg={{ order: 2 }} md={{ order: 1 }} sm={{ order: 1 }} xs={{ order: 1 }}>
              <div style={{position:"sticky", top:0}}>
                <div className="order-form-container">
                  <Row span={24} gutter={[10, 10]}>
                    <Col span={10}>Chọn ngày khởi hành:</Col>
                    <Col span={14}><DatePicker defaultValue={moment(d)} format={dateFormat} onChange={(value) => setDateSelected(value)} /></Col>
                    <Col span={10}>Người lớn:</Col>
                    <Col span={14}><InputNumber min={1} defaultValue={1} onChange={(values) => { setCountAdults(values); setMoneyAdults(values); }} /></Col>
                    <Col span={10}>Trẻ em:</Col>
                    <Col span={14}><InputNumber min={0} defaultValue={0} onChange={(values) => { setCountChild(values); setMoneyChild(values); }} /></Col>
                    <Col span={24} ><div style={{ fontSize: 24, color: "#ffbd00", float: "right", fontWeight: "bold" }}>{money && (money.toLocaleString() + " VND")}</div></Col>
                    <Col span={24}>
                      <Button style={{ width: "100%", height:40, fontSize:18, backgroundColor:"#ffa940", color:"white" }}  htmlType="submit" onClick={() => handleBookingTour()}>
                        Đặt tour
                      </Button>
                    </Col>
                  </Row>
                </div>
                <div style={{minWidth:400, borderRadius:4}}>
                  <List
                    size="small"
                    // header={<h4 style={{fontSize:18, color:"#333", borderColor: "#ddd"}}></h4>}
                    bordered
                    dataSource={[
                      "CHƯƠNG TRÌNH TOUR",
                      "TRẢI NGHIỆM THEO CÁCH CỦA BẠN",
                      "ĐIỀU KHOẢN QUY ĐỊNH"
                    ]}
                    renderItem={(item) => (
                      <List.Item
                        // onClick={() => handleFilterLocaiton(item.id)}
                        // style={{color: locationSelected === item.id ? 'red': 'black' }}
                        className ="moveLocation"
                      >
                        <a style={{color:"gray"}} href="#tour-program">{item}</a>
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            </Col>

          </Row>
          <Row>
            <Card title={`Tours du lịch ${tourDetail.data.location.name} liên quan`} extra={<a className="loadMore" href="#">XEM TẤT CẢ </a>} style={{width: "100%", marginTop:16}}>
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
  const { tourDetail } = state.tourReducer;
  const { userInfo } = state.userReducer;
  return {
    tourDetail,
    userInfo
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTourDetail: (params) => dispatch(getTourDetailAction(params)),
    bookingTour: (params) => dispatch(bookingTourAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TourDetailPage);
