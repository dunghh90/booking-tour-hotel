import { Layout, Menu } from 'antd';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getProductTourListAction } from '../../redux/actions';
import SearchTourPage from '../SearchTour';
import ItemTour from './components/ItemTour'
import './styleTour.css'

const { Sider, Content } = Layout;

function ProductTourListPage({ getProductTourList, productTourList }) {
  useEffect(() => {
    getProductTourList({
      page: 1,
      limit: 10,
    });
  }, []);

  function renderProductTourList() {
    if (productTourList.load) return <p>Loading...</p>;

    return (
      <div>
        <Content className="site-layout" style={{ padding: '0 50px'}}>
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
        </Content>
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
  return {
    productTourList: productTourList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductTourList: (params) => dispatch(getProductTourListAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductTourListPage);
  
  