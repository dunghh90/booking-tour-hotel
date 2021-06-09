import React, { useState } from 'react';
import { connect } from 'react-redux';
import { UserOutlined,SendOutlined, DownOutlined } from '@ant-design/icons';
import { VscAccount } from "react-icons/vsc";

import { Input, Layout, Row, Col, Button, Space, Dropdown, Menu,Form,DatePicker } from 'antd';
import moment from 'moment';
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
                            <Col xxl={4} xl={4} md={5} sm={4} xs={0}>

                               <img src="https://res.ivivu.com/hotel/img/logo.svg" alt="" />

                            </Col>
                           
                            <Col className="centerheader" xxl={15} xl={14} md={10} xm={0} xs={0}>
                                <div className="menu">
                                      <ul className= "menu-cha">
                                          <li className="menu1">
                                              <Link className="menu2" to ={ROUTERS.HOTEL_HOME}>Khách sạn</Link>
                                          </li>
                                          <li className="menu1">
                                              <Link className="menu2"   to={ROUTERS.TOUR_HOME}>Tour</Link>
                                          </li>
                                          <li className="menu1">
                                              <Link className="menu2" to={ROUTERS.REVIEW} >Giới thiệu</Link>
                                          </li>
                                      </ul>
                                </div>
                                
                            </Col>
                            <Col xxl={5} xl={6} md={9} sm={20} xs={24}>
                                    <div>
                                        { 
                                        userInfo.data?.id 
                                            ? (
                                                <Dropdown overlay={menu} >
                                                     <div style={{ display:'flex', alignItems:"center", color:"white"}}>
                                                     <VscAccount size={26} />
                                                     <a style={{fontSize:16, paddingLeft:10, color:"white"}} onClick={e => e.preventDefault()}>
                                                      {userInfo.data.name} <DownOutlined />
                                                     </a>
                                                     </div>
                                                 </Dropdown>
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
    return {
      userInfo,
    }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(HeaderPage);