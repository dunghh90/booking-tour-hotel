import { Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getTourListAction } from '../../redux/actions';
import ItemTour from './components/ItemTour'

function TourHomePage({ getTourList, tourList }) {
  useEffect(() => {
    getTourList({
      page: 1,
      limit: 10,
    });
  }, []);

  function renderTourList() {
    if (tourList.load) return <p>Loading...</p>;
    
    return (
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
      <Row gutter={[24, 24]}>
        {
          tourList.data.map((item, index) => {
            return (
              <ItemTour
                key={index}
                title={item.name}
                link={item.link}
                description={item.description}
                price={item.price}
                time={item.time}
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
      {renderTourList()}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { tourList } = state.tourReducer;
  return {
    tourList: tourList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTourList: (params) => dispatch(getTourListAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TourHomePage);
  
  