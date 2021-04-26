import { useState } from 'react';
import { Row, Col, Space, Card, Form, Input, Button } from 'antd';


function Item(props) {
  const { title, index, editTask, deleteTask } = props;

  const [isEdit, setIsEdit] = useState(false);
  const [editForm] = Form.useForm();
  


  function renderItemView() {
    return (
      <Row>
        <Col span={8}>Title:</Col>
        <Col span={16}>{title}</Col>
       
      </Row>
    )
  }
  function dateTime(){
    const currentDay = new Date()
    const date = currentDay.getFullYear() + "- " + (currentDay.getMonth() + 1) + "- " + currentDay.getDate() + " " + currentDay.getHours() + ": " + currentDay.getMinutes() + ":" + currentDay.getSeconds();
    const newCurrentDay = "Recorded: " + " " + date;
    return (
      <p> {newCurrentDay}</p>
    )
  }

  function renderItemEdit() {
    return (
      <Form
        form={editForm}
        layout="vertical"
        name={`item-${index}`}
        initialValues={{ title: title}}
        onFinish={(values) => {
          editTask(values, index);
          setIsEdit(false);
        }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input your title!' }]}
        >
          <Input />
        </Form.Item>

      </Form>
    )
  }

  return (
    <>
    <Card size="small" style={{ marginTop: 16 }}>
   <p style={{paddingLeft:400}}> {dateTime()}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        {/* <Button type="primary" onClick={() => history.push(ROUTERS.PRODUCT_DETAIL)}>
          Detail
        </Button> */}
        <Space>
          {isEdit
            ? (
              <>
                <Button
                  type="primary"
                  onClick={() => editForm.submit()}
                >
                  Confirm
                </Button>
                <Button onClick={() => setIsEdit(false)}>
                  Cancel
                </Button>
              </>
            )
            : (
              <>
               
                <Button
                  type="primary"
                  ghost
                  onClick={() => setIsEdit(true)}
                >
                  Edit
                </Button>
                <Button danger onClick={() => deleteTask(index)}>Delete</Button>
              </>
            )
          }
        </Space>
      </div>

      {isEdit ? renderItemEdit() : renderItemView()}
    </Card>
  
      </>
  );
}

export default Item;
