// import { useState } from 'react';
import { Row, Col, Card, Image, Space } from 'antd';
import { FieldTimeOutlined } from '@ant-design/icons';
import { IoAirplaneOutline, IoCarOutline } from "react-icons/io5";


import history from '../../../utils/history';

function ItemTour(props) {
  const { title, link, description, price, time, id } = props;

  // const [isEdit, setIsEdit] = useState(false);
  // const [isShowDescription, setIsShowDescription] = useState(false);
  // const [editForm] = Form.useForm();
  const { Meta } = Card;

  function renderUrlTour() {
    return description.map((item, index) => {
          return (
            <ul>
            <li>
              <a href="google.com.vn" style={{color: "#00C1DE"}}>{item}</a>
            </li>
            </ul>
          )
        })
    
  }
  
  return (
    <div style={{padding:17, marginBottom: 10, backgroundColor:"white"}}>
      <Row gutter={24}>
        <Col span={6}>
          {/* <Image
            width={200}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            preview={false}
            onClick={() => {
              history.push("./login")
            }}
          /> */}
          <a ></a>
          <img 
            src={link} alt=""
            href="google.com"
            style={{width:204}}
            onClick={() => {
              history.push(`/tours/${id}`)
            }}
          />
        </Col>
        <Col span={12} style={{marginTop:10}}>
          <Row>
            <Col>
              <div className="tourItemName">
                <a href="google.com">
                  {title}
                </a>
              </div>
            </Col>
          </Row>
          <Row style={{margin:"10px 0px"}}>
            <Col span={6}>
              Mã: sdfsd
            </Col>
            <Col span={10}>
            <Space><FieldTimeOutlined />{time}</Space>
            </Col>
            <Col span={8}>
              Phương tiện: <IoAirplaneOutline/><IoCarOutline />
            </Col>
          </Row>
          <Row>
            <Col>
              {renderUrlTour()}
            </Col>
          </Row>
        </Col>
        <Col span={6} style={{marginTop:10}}>
          <p style={{color: "#00C1DE", fontSize:22, fontWeight:"bold", float:"right"}}>{price}</p>
        </Col>
      </Row>
    </div>
      /* <Card
        hoverable
        style={{ width: 370,marginRight:30, marginTop:30}}
        cover={<img alt="example" src={link} />}
        onClick={() => {
          history.push("/login")
        }}
      >
        <Meta title={title} description={renderUrlTour()} />
        <p style={{color: "#00C1DE", fontSize:22, fontWeight:"bold", float:"right"}}>{price}</p>
      </Card> */
      // </Col>
  );
}

export default ItemTour;
