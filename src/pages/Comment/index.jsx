import { Form, Input, Button, Rate,Col, Row, Space } from 'antd';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import './style.css'
import {
    getCommentAction,
    addCommentAction,
  } from '../../redux/actions';

function Comment(props) {
    const {  commentList, addComment, deleteTask, getCommentList, hotelId, tourId} = props;
    const [form] =Form.useForm();

    useEffect(() => {
      hotelId ? 
      getCommentList({
        page: 1,
        limit: 4,
        hotelId: parseInt(hotelId) 
      }) :
      getCommentList({
        page: 1,
        limit: 4,
        tourId: parseInt(tourId) 
      })
    },[])

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // const layout = {
    //     labelCol: { span: 8 },
    //     wrapperCol: { span: 16 },
    // };
    // const tailLayout = {
    //     wrapperCol: { offset: 8, span: 16 },
    // };

    function handleAddComment(values){
      if (!userInfo) {
        alert('Bạn cần đăng nhập!');
      } else {
        hotelId ? 
        addComment({...values, hotelId: hotelId, userId: userInfo.id }) 
        :
        addComment({...values, tourId: tourId, userId: userInfo.id });
        form.resetFields();
      }
    }
    function renderComment() {
        return commentList.data.map((item, index) => {
          return (
            <div style={{width: "auto"}}>
                <div class="horizontalLine"></div>
                <Row>
                  <Col span={6}>
                    <h4>{item.user.name}</h4>
                  </Col>
                  <Col span={16}>
                    <Space>
                      <Rate disabled value={item.rate} />
                      <span>{item.creatDate}</span>
                    </Space>
                    <p>
                    {item.comment}
                    </p>
                  </Col>
                </Row>
           </div>
          );
        })
      }
 
    return (
        <>

            <Form
                // {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={(values) => handleAddComment(values)}
            >
                <Form.Item
                    label="Rate"
                    name="rate"
                    rules={[{ required: true, message: 'vui lòng nhập!' }]}
                >

                {/* <Rate className ="rate" allowHalf defaultValue={5} /> */}
                <Rate allowHalf defaultValue={5} />
                </Form.Item>
                <Form.Item
                    label="Đánh giá"
                    name="comment"
                    placeholder="Nhập vào đây"
                    rules={[{ required: true, message: 'vui lòng nhập!' }]}
                >
                    <Input.TextArea />
                </Form.Item>


                {/* <Form.Item {...tailLayout}> */}
                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Đánh giá
          </Button>
                </Form.Item>
            </Form>
            {/* <Col span={24}> */}
            <p><h3>Đánh giá gần đây</h3></p>
            {renderComment()}
            {/* </Col> */}
        </>
    )



}
const mapStateToProps = (state) => {
  const  {commentList}  = state.commentReducer;
    return {
      commentList: commentList,
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      addComment: (params) => dispatch(addCommentAction(params)),
      getCommentList: (params) => dispatch(getCommentAction(params)),
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Comment);