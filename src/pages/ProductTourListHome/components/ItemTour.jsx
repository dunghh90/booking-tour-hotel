// import { useState } from 'react';
import { Col, Card } from 'antd';

import history from '../../../utils/history';

function ItemTour(props) {
  const { title, link, description, price } = props;

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
        style={{ width: 370,marginRight:30, marginTop:30}}
        cover={<img alt="example" src={link} />}
        onClick={() => {
          history.push("/login")
        }}
      >
        <Meta title={title} description={renderUrlTour()} />
        <p style={{color: "#00C1DE", fontSize:22, fontWeight:"bold", float:"right"}}>{price}</p>
      </Card>
      </Col>
  );
}

export default ItemTour;
