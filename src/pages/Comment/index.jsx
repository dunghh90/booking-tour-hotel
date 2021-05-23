import { Form, Input, Button, Rate,Col } from 'antd';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import './style.css'
import {
    addTaskAction,
    deleteTaskAction,
    getCommentHotelAction
  } from '../../redux/actions';

function Comment(props) {
    const {  commentHotelList,addTask, deleteTask, getCommentHotelList, hotelId } = props;
    const [form] =Form.useForm();

    useEffect(() => {
      getCommentHotelList({
        page: 1,
        limit: 4,
        hotelId: parseInt(hotelId) 
      });
    },[])

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    function handleAddtask(values){
        addTask(values);
        form.resetFields();
    }
    function renderComment() {
        return commentHotelList.data.map((item, index) => {
          return (
            <>
            Tên người đánh giá:
            <p>{item.user.name}</p>
            Sao bao nhiêu:
            <p>{item.rate}</p>
            Nội dung đánh giá: 
           <p>{item.comment}</p>
           </>
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
            <p>Đánh giá gần đây</p>
            {renderComment()}
                </Col>
        </>
    )



}
const mapStateToProps = (state) => {
  const  {commentHotelList}  = state.commentReducer;
    return {
      commentHotelList: commentHotelList,
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      addComment: (params) => dispatch(addTaskAction(params)),
      deleteTask: (params) => dispatch(deleteTaskAction(params)),
      getCommentHotelList: (params) => dispatch(getCommentHotelAction(params)),
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Comment);