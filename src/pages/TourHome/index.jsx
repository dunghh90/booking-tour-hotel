import { Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getTourListAction } from '../../redux/actions';

import SearchTour from '../../components/SearchTour';
import ItemTour from './components/ItemTour'

function TourHomePage({ getTourList, tourList }) {
  
  useEffect(() => {
    getTourList({
      page: 1,
      limit: 10,
    });
  }, []);
  
  const [keySearchLocation, setKeySearchLocation] = useState('');

  const filterTourList = tourList.data.filter((item) => {
    return item.location.name.trim().toLowerCase().indexOf(keySearchLocation.trim().toLowerCase()) !== -1
  })

  function renderTourList() {
    if (tourList.load) return <p>Loading...</p>;
    
    return (
      <>
      <div style={{display:"flex", justifyContent:"center"}}>
        <div style={{padding: '10px 50px', maxWidth: 1400, width: "100%" }}>
          <SearchTour setKeySearchLocation={setKeySearchLocation}/>
          <Row gutter={[24, 24]} style={{marginTop:10, width:"100%"}}>
            {
              filterTourList.map((item, index) => {
                return (
                  <ItemTour
                    key={index}
                    id={item.id}
                    title={item.name}
                    link={item.link}
                    description={item.description}
                    price={item.price}
                    rate={item.rate}
                  />
                )
              })
            }
          </Row>
        </div>
      </div>
      </>
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
  
  