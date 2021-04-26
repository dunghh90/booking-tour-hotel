import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getProductTourListAction } from '../../redux/actions';

function ProductTourListPage({ getProductTourList, productTourList }) {
  useEffect(() => {
    getProductTourList({
      page: 1,
      limit: 10,
    });
  }, []);

  function renderProductTourList() {
    if (productTourList.load) return <p>Loading...</p>;
    return productTourList.data.map((productTourItem, productTourIndex) => {
      return <p>{productTourItem.name}</p>
    })
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