import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Input, Layout, Row, Col, Button } from 'antd';

import 'antd/dist/antd.css';
import { Link}   from 'react-router-dom';
import './Header.css'

import { ROUTERS } from '../../../constants/router';


const { Header } = Layout;
const onSearch = value => console.log(value);


function HeaderPage() {
    // const [seachKey,setSeachkey]= useState('')
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
                                              <Link to={ROUTERS.LOGIN}>Tour</Link>
                                          </li>
                                          <li className="menu1">
                                              <Link to={ROUTERS.REVIEW} >Giới thiệu</Link>
                                          </li>
                                      </ul>
                                </div>
                            </Col>
                            <Col span={4}>
                                      <Button>Tài khoản</Button>
                                      </Col>
                        </Row>
                    </div>
                </Header>
            
        </>
    );


}

export default  HeaderPage;