
import 'antd/dist/antd.css';
import './style.css';
import { IeOutlined } from "@ant-design/icons";
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

                        <h2>Thông tin địa điểm</h2>
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
                        <h2>Thông tin cần biết</h2>
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
                        <h2>Thông tin cần biết</h2>
                        <div>
                            <div>

                            <span>Khách sạn 5 sao</span>
                            </div>
                            <div>

                            <span>Khách sạn 4 sao</span>
                            </div>
                            <div>

                            <span>Khách sạn 3 sao</span>
                            </div>
                            <span>Resort</span>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}
export default FooterPage;