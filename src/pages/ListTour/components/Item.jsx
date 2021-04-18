import { useState } from 'react';
import { Row, Col, Space, Card, Form, Input, Button } from 'antd';
import history from '../../../utils/history';

function Item(props) {
  const { title, description, index, editTask, deleteTask } = props;

  const [isEdit, setIsEdit] = useState(false);
  const [isShowDescription, setIsShowDescription] = useState(false);
  const [editForm] = Form.useForm();

  function renderItemView() {
    return (
      <Row>
        <Col span={8}>Title:</Col>
        <Col span={16}>{title}</Col>
        {isShowDescription && (
          <>
            <Col span={8}>Description:</Col>
            <Col span={16}>{description}</Col>
          </>
        )}
      </Row>
    )
  }

  function renderItemEdit() {
    return (
      <Form
        form={editForm}
        layout="vertical"
        name={`item-${index}`}
        initialValues={{ title: title, description: description }}
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

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input your description!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    )
  }

  return (
    <Card size="small" style={{ marginTop: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Button type="primary" onClick={() => history.push(`/task/${index}`)}>
          Detail
        </Button>
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
                  onClick={() => setIsShowDescription(!isShowDescription)}
                >
                  {isShowDescription ? 'Hide' : 'Show'}
                </Button>
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
  );
}

export default Item;
