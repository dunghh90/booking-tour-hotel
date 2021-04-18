import { useState } from 'react';
import { Row, Col, Card, Form, Input, Button } from 'antd';
import { connect } from 'react-redux';

import Item from './components/Item';

import {
  addTaskAction,
  editTaskAction,
  deleteTaskAction,
} from '../../redux/actions';

function ToDoListPage(props) {
  const { toDoList, addTask, editTask, deleteTask } = props;

  const [searchKey, setSearchKey] = useState('');

  const filterToDoList = toDoList.filter((item) => {
    return item.title.trim().toLowerCase().indexOf(searchKey.trim().toLowerCase()) !== -1;
  });

  function handleAddTask(values) {
    addTask(values);
  }

  function handleEditTask(values, index) {
    editTask({ ...values, index: index })
  }

  function handleDeleteTask(index) {
    deleteTask({ index: index })
  }

  function renderToDoList() {
    return filterToDoList.map((item, index) => {
      return (
        <Item
          key={index}
          title={item.title}
          description={item.description}
          index={index}
          editTask={handleEditTask}
          deleteTask={handleDeleteTask}
        />
      );
    })
  }

  return (
    <Row gutter={24} style={{ maxWidth: 1000, width: '100%', margin: '16px auto 0' }}>
      <Col span={8}>
        <Card title="Add task" size="small">
          <Form
            layout="vertical"
            name="addTask"
            initialValues={{ title: '', description: '' }}
            onFinish={(values) => handleAddTask(values)}
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

            <Button type="primary" htmlType="submit" block>
              Add
            </Button>
          </Form>
        </Card>
      </Col>
      <Col span={16}>
        <Input.Search
          onChange={(e) => setSearchKey(e.target.value)}
          placeholder="Search..."
        />
        {renderToDoList()}
      </Col>
    </Row>
  );
}

const mapStateToProps = (state) => {
  const { toDoList } = state.taskReducer;
  return {
    toDoList: toDoList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (params) => dispatch(addTaskAction(params)),
    editTask: (params) => dispatch(editTaskAction(params)),
    deleteTask: (params) => dispatch(deleteTaskAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoListPage);
