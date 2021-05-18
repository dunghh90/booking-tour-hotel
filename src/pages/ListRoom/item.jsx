import { useState } from 'react';
import { Row, Col, Card, Image, Space } from 'antd';
import { FieldTimeOutlined } from '@ant-design/icons';
import { IoAirplaneOutline, IoCarOutline } from "react-icons/io5";



function ItemRoom(props) {
  const {  description } = props;
  console.log("🚀 ~ file: item.jsx ~ line 10 ~ ItemRoom ~ description", description)

  // const [isEdit, setIsEdit] = useState(false);
  // const [isShowDescription, setIsShowDescription] = useState(false);
  // const [editForm] = Form.useForm();
  const { Meta } = Card;

  function renderItem() {
    return description.map((item, index) => {
      return (
        <ul>
          <li>
            <a style={{ color: "#00C1DE" }}>{item}</a>
          </li>
        </ul>
      )
    })

  }

  return (
      <Col>

          {renderItem()}
      </Col>
  );
}

export default ItemRoom;
