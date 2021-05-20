import React, { useState } from 'react';
import { connect } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';
import { Input, Layout, Row, Col, Button, Space, Dropdown, Menu } from 'antd';

import 'antd/dist/antd.css';
import { Link}   from 'react-router-dom';
import './Header.css'

import { ROUTERS } from '../../../constants/router';
import history from '../../../utils/history';
import { logoutAction } from '../../../redux/actions';
import { createFromIconfontCN,ImportOutlined } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});


const { Header } = Layout;
const onSearch = value => console.log(value);


function renderInfoUser(userInfo, logout) {

    const menu = (
        <Menu>
        <Menu.Item key="0">
          <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            Thông tin cá nhân
          </a>
        </Menu.Item>
        <Menu.Item key="1" onClick={logout()}>
          
            Đăng xuất
          
        </Menu.Item>
      </Menu>
    );
    return (
    <Dropdown
        overlay={menu}
        // onVisibleChange={this.handleVisibleChange}
        // visible={this.state.visible}
    >
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        {`Tên đăng nhập: ${userInfo.data.name}`}
        </a>
    </Dropdown>
    );
}


function HeaderPage(props) {
    const [seachKey,setSeachkey]= useState('')
    
    const { userInfo, logout } = props;

    const menu = (
        <Menu>
        <Menu.Item key="0" onClick={() => history.push(`/profile/${userInfo.data.id}`)}>
            Thông tin cá nhân
        </Menu.Item>
        <Menu.Item key="1" onClick={() => logout()}>
            Đăng xuất
        </Menu.Item>
      </Menu>
    );

    return (
        <>
                <Header className="headers">
                    <div className="container-fulid">
                        <Row>
                            <Col span={4}>

                                <UserOutlined style={{ fontSize: '50px', color: '#08c' }} />

                            </Col>
                            <Col className='minh' span={8}>

                                <Input.Search placeholder="Nhập vào đây" onSearch={onSearch} enterButton />

                            </Col>
                            <Col span={7}>
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
                            <Col span={5}>
                                    <div style={{color:"#1890FF"}}>
                                        {console.log("🚀 ~ file: index.jsx ~ line 25 ~ value", userInfo.data.id)}
                                        {
                                        
                                        userInfo.data.id 
                                            ? (
                                            <Space>
                                                
                                                <Button type="primary" className="logout" onClick={() => logout()}>{`Đăng xuất(${userInfo.data.name})`}
                                                <IconFont type="icon-tuichu" />
                                                </Button>
                                            </Space>
                                            )
                                            : <Button type="primary" onClick={() => history.push('/login')}> 
                                                Đăng nhập
                                                <ImportOutlined />
                                                </Button>
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