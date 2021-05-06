import { Col, Layout, Menu, Row, List } from 'antd';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

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

  function renderProductTourList() {
    if (productTourList.load) return <p>Loading...</p>;

    return (
      <div>

        <Row gutter={16} style={{padding: '10px 50px'}}>
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
          <Col span={17}>
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
console.log("🚀 ~ file: index.jsx ~ line 141 ~ mapStateToProps ~ state", state)
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
  
  