// import { useState } from 'react';
import { Col, Card, Row } from 'antd';

import history from '../../../utils/history';

function ItemTour(props) {
  const { title, link, description, time, price } = props;

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
      <Col span={8}>
      <Card
        hoverable
        style={{ width: 370, minHeight: 500}}
        cover={<img alt="example" src={link} />}
        onClick={() => null }
      >
        {/* <Meta title="Europe Street beat" description="www.instagram.com" /> */}
        <Row>
          <Col span={24} style={{color:"#003C71", fontSize:16, fontWeight:"bold"}}>
            {title}
          </Col>
          <Col span={12} style={{fontSize:13, color:"#4E4E4E"}}>{time}</Col><Col span={12}></Col>
          <Col span={24}>{renderUrlTour()}</Col>
        <Col span={12}></Col><Col span={12} style={{display:"flex", alignItems:"right", color: "#00C1DE", fontSize:20, fontWeight:"bold", float:"right"}}>{price}</Col>
        </Row>
      </Card>
      </Col>
  );
}

export default ItemTour;
