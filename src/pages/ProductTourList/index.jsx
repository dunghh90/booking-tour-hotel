import { Col, Layout,  Input, Form, Button, Row, List, DatePicker } from 'antd';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { EnvironmentOutlined, SendOutlined } from '@ant-design/icons';

import moment from 'moment';

import { getProductTourListAction, getCategoryListAction } from '../../redux/actions';
import SearchTourPage from '../SearchTour';
import ItemTour from './components/ItemTour'
import './styleTour.css'

const { Sider, Content } = Layout;

function ProductTourListPage({ 
  getProductTourList, 
  getCategoryList,
  productTourList,
  categoryList
}) {

  const [categorySelected, setCategorySelected] = useState(null);

  useEffect(() => {
    getCategoryList();
    getProductTourList({
      page: 1,
      limit: 10,
    });
  }, []);

  function handleFilterCategory(id) {
    setCategorySelected(id);
    getProductTourList({
      page: 1,
      limit: 10,
      categoryId: id,
    })
  }
  function findTour() {

  }
  const currentDate = new Date();
  function renderProductTourList() {
    if (productTourList.load) return <p>Loading...</p>;

    return (
      <div style={{padding: '10px 50px'}}>
        <Row gutter={16} style={{margin:'0 80px', fontSize:20, padding:"15px 10px", borderRadius:4, backgroundColor:"#bae7ff"}}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          layout="inline"
          onFinish={findTour}
        >
          <Col span={7}>
              <Form.Item
                name="username"
              >
                <Input labelFontSize={100} fontSize={100} prefix={<EnvironmentOutlined />} style={{padding: '10px 50px', height:50, borderRadius:4, backgroundColor:"white"}} placeholder="Bạn muốn đi đâu?" />
              </Form.Item>
            </Col>
          <Col span={7}>
            <Form.Item
                name="dateBooking"
              >
            <DatePicker style={{padding: '10px 50px', width:'100%', height:50, borderRadius:4, backgroundColor:"white"}} defaultValue={moment(currentDate)} format="DD/MM/YYYY"/>
            </Form.Item>
          </Col>
          <Col span={7}>
          <Form.Item
                name="placeFrom"
              >
            <Input labelFontSize={100} fontSize={100} prefix={<SendOutlined />} style={{padding: '10px 50px', height:50, borderRadius:4, backgroundColor:"white"}} placeholder="Khởi hành từ" />
          </Form.Item>
          </Col>
          <Col span={3} >
            <Row style={{width:"100%"}} justify="end">
              <Button style={{padding: '10px 50px', height:50, borderRadius:4, backgroundColor:"#ffe58f", color:"#003a8c", fontWeight:600}} >
                Tìm
              </Button>
            </Row>
          </Col>
          </Form>
        </Row>
        <Row gutter={16}>
          <Col span={7}>
            <List
              size="small"
              header={<h4 style={{fontSize:18, color:"#333", borderColor: "#ddd"}}>Địa điểm HOT trong nước</h4>}
              bordered
              dataSource={[
                { name: "Tất cả" },
                ...categoryList.data,
              ]}
              renderItem={(item) => (
                <List.Item
                  onClick={() => handleFilterCategory(item.id)}
                  style={{ color: categorySelected === item.id ? 'red': 'black' }}
                >
                  {item.name}
                </List.Item>
              )}
            />

            <List
              size="small"
              header={<h4 style={{fontSize:18, color:"#333", borderColor: "#ddd"}}>Địa điểm HOT trong nước</h4>}
              bordered
              style={{marginTop:20}}
              dataSource={[
                { name: "Tất cả" },
                ...categoryList.data,
              ]}
              renderItem={(item) => (
                <List.Item
                  onClick={() => handleFilterCategory(item.id)}
                  style={{ color: categorySelected === item.id ? 'red': 'black' }}
                >
                  {item.name}
                </List.Item>
              )}
            />
          </Col>
          <Col span={17} style={{marginTop:16}}>
            {
              productTourList.load ? (<p>Loading...</p>) 
              :(productTourList.data.map((item, index) => {
                return (
                  <ItemTour
                    key={index}
                    title={item.name}
                    link={item.linkList}
                    description={item.description}
                    price={item.price}
                    time={item.time}
                    id={item.id}
                  />
                )
              }))
            }
          </Col>

        </Row>
        {/* <Content className="site-layout" style={{ padding: '0 50px'}}>
        <SearchTourPage productTourList={productTourList} />
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
            style={{backgroundColor:"#ecf0f5"}}
          >
            <div className="logo" />
            <Menu mode="inline" >
              <Menu.Item key="1" >
                <a href="google.com" >Hà Nội</a>
              </Menu.Item>
              <Menu.Item key="2">
                Sài Gòn
              </Menu.Item>
              <Menu.Item key="3" >
                Đà Nẵng
              </Menu.Item>
              <Menu.Item key="4" >
                Huế
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content className="site-layout" style={{ padding: '0 25px' }}>
              
              {
                productTourList.data.map((item, index) => {
                  return (
                    <ItemTour
                      key={index}
                      title={item.name}
                      link={item.linkList}
                      description={item.description}
                      price={item.price}
                      time={item.time}
                    />
                  )
                })
              }
            </Content>
          </Layout>
        </Layout>
        </Content> */}
      </div>
    )
  }

  return (
    <div>
      {renderProductTourList()}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { productTourList } = state.productTourReducer;
  const { categoryList } = state.productHotelReducer;
  return {
    productTourList: productTourList,
    categoryList: categoryList

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductTourList: (params) => dispatch(getProductTourListAction(params)),
    getCategoryList: (params) => dispatch(getCategoryListAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductTourListPage);
  
  