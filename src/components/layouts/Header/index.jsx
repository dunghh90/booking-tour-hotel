import React, { useState } from 'react';
import { connect } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';
import { Input, Layout, Row, Col, Button, Space } from 'antd';

import 'antd/dist/antd.css';
import { Link}   from 'react-router-dom';
import './Header.css'

import { ROUTERS } from '../../../constants/router';
import history from '../../../utils/history';
import { logoutAction } from '../../../redux/actions';


const { Header } = Layout;
const onSearch = value => console.log(value);


function HeaderPage(props) {
    // const [seachKey,setSeachkey]= useState('')
    const { userInfo, logout } = props;
    return (
        <>
                <Header className="headers">
                    <div className="container-fulid">
                        <Row>
                            <Col span={6}>

                                <UserOutlined style={{ fontSize: '50px', color: '#08c' }} />

                            </Col>
                            <Col className='minh' span={8}>

                                <Input.Search placeholder="Nhập vào đây" onSearch={onSearch} enterButton />

                            </Col>
                            <Col span={6}>
                                <div className="menu">
                                      <ul className= "menu-cha">
                                          <li className="menu1">
                                              <Link to ={ROUTERS.HOME}>Khách sạn</Link>
                                          </li>
                                          <li className="menu1">
                                              <Link to={ROUTERS.TOUR}>Tour</Link>
                                          </li>
                                          <li className="menu1">
                                              <Link to={ROUTERS.REVIEW} >Giới thiệu</Link>
                                          </li>
                                      </ul>
                                </div>
                            </Col>
                            <Col span={4}>
                                    <div>
                                        {userInfo.data.id 
                                            ? (
                                            <Space>
                                                <p>{`Tên đăng nhập: ${userInfo.data.name}`}</p>
                                                <Button onClick={() => logout()}>Đăng xuất</Button>
                                            </Space>
                                            )
                                            : <Button onClick={() => history.push('/login')}>Đăng nhập</Button>
                                        }
                                    </div>
                            </Col>
                        </Row>
                    </div>
                </Header>
            
        </>
    );


}

const mapDispatchToProps = (dispatch) => {
    return {
      logout: (params) => dispatch(logoutAction(params)),
    };
  }
  
  const mapStateToProps = (state) => {
    const { userInfo } = state.userReducer;
    // console.log('🚀 ~ file: index.jsx ~ line 13 ~ mapStateToProps ~ userInfo', userInfo);
    return {
      userInfo,
    }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(HeaderPage);