
import 'antd/dist/antd.css';
import './style.css';
import {FacebookOutlined,IeOutlined,TwitterOutlined  } from "@ant-design/icons";
import { Row, Col } from 'antd';


function FooterPage() {
    return (
        <Row>
            <Col span={24}>
                <div className="buttom">
                    {/* <div>
                        <IeOutlined style={{ fontSize: '20px', color: 'red' }} />
                    </div> */}
                    <div className="keyword">
                        <h2 className="noteFooter">Thông tin địa điểm</h2>
                        <div>
                            <span>Khu vực</span>
                        </div>
                        <div>

                            <span>Sân bay</span>
                        </div>
                        <div>

                            <span>Khách sạn</span>
                        </div>
                        <span>Điểm được quan tâm</span>

                    </div>
                    <div className="keyword">
                        <h2 className="noteFooter">Thông tin cần biết</h2>
                        <div>
                            <div>

                                <span>Điều Kiện và Điều khoản</span>
                            </div>
                            <div>

                                <span>Quy chế thường gặp</span>
                            </div>
                            <div>

                                <span>Câu hỏi thường gặp</span>
                            </div>
                            <span>Điểm được quan tâm</span>
                        </div>
                    </div>
                    <div className="keyword">
                        <h2 className="noteFooter">Đối tác</h2>
                        <div>
                            <div>

                            <span>Quy chế bảo hiểm</span>
                            </div>
                            <div>

                            <span>Yêu cầu bồi thường</span>
                            </div>
                            <div>

                            <span>Quy chế trả góp</span>
                            </div>
                            <span>Resort</span>
                        </div>
                    </div>
              {/* <div>
                    <h1 style={{marginBottom: 10, fontWeight: 700}}>Các trang mạng xã hội</h1>
                    <div className="chuaicon">
                <div>
                    <a href="https://facebook.com/iVIVU"></a>
                    <FacebookOutlined className="iconMXH" style={{marginRight: 50}}/>
                </div>
                <div>
                    <a href=""></a>
                    <IeOutlined  className="iconMXH" style={{marginRight: 50}}/>
                </div>
                <div>
                    <a href=""></a>
                     <TwitterOutlined className="iconMXH" style={{marginRight: 50}}/>
                </div>
              </div> */}
              {/* </div> */}
                </div>
                
            </Col>
        </Row>
    )
}
export default FooterPage;