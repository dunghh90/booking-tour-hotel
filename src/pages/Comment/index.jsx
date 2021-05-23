import { Form, Input, Button, Rate,Col } from 'antd';
import { connect } from 'react-redux';
import './style.css'
import {
    addTaskAction,
    deleteTaskAction,
  } from '../../redux/actions';

function Comment(props) {
    const {  toDoList,addTask, deleteTask } = props;
    const [form] =Form.useForm();
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    function handleAddtask(values){
        console.log("🚀 ~ file: index.jsx ~ line 21 ~ handleAddtask ~ values", values)
        addTask(values);
        form.resetFields();
    }
    function renderComment() {
        return toDoList.map((item, index) => {
          console.log("🚀 ~ file: index.jsx ~ line 27 ~ returntoDoList.map ~ item", item)
          return (
           <p>{item}</p>
          );
        })
      }
 
    return (
        <>

            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={(values) => handleAddtask(values)}
           
            // onFinishFailed={}
            >
                <Form.Item
                    label="Đánh giá"
                    name="name"
                    placeholder="Nhập vào đây"
                    rules={[{ required: true, message: 'vui lòng nhập!' }]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Rate className ="rate" allowHalf defaultValue={5} />
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
          </Button>
                </Form.Item>
            </Form>
            <Col span={16}>
            {renderComment()}
                </Col>
        </>
    )



}
const mapStateToProps = (state) => {
    const  toDoList  = state.taskReducer.toDoList;
    return {
      toDoList: toDoList,
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      addTask: (params) => dispatch(addTaskAction(params)),
      deleteTask: (params) => dispatch(deleteTaskAction(params)),
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Comment);