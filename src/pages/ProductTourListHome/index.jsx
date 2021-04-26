import { Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getProductTourListAction } from '../../redux/actions';
import SearchTourPage from '../SearchTour';
import ItemTour from './components/ItemTour'

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
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
      <SearchTourPage />
      <Row gutter={24}>
        {
          productTourList.data.map((item, index) => {
            return (
              <ItemTour
                key={index}
                title={item.name}
                link={item.link}
                description={item.description}
                price={item.price}
              />
            )
          })
        }
      </Row>
      </Content>
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
  
  