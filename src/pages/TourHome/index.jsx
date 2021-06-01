import { Col, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getTourListAction, getTopicTourListAction } from '../../redux/actions';

import SearchTour from '../../components/SearchTour';
import ItemTour from './components/ItemTour'
import { AiFillCheckCircle } from 'react-icons/ai';

import './styleTour.css'

function TourHomePage({ getTourList, tourList, getTopicTourList, topicTourList }) {
  
  useEffect(() => {
    getTourList({
      page: 1,
      limit: 10,
    });
    getTopicTourList();
  }, []);
  
  const [keySearchLocation, setKeySearchLocation] = useState('');

  let filterTourList = tourList.data.filter((item) => {
    return item.location.name.trim().toLowerCase().indexOf(keySearchLocation.trim().toLowerCase()) !== -1
  })

  function renderTourFolowTopic() {
    return topicTourList.data.map((item, index) => {
      {filterTourList = tourList.data.filter((itemTour) => {
        return itemTour.topicTourId == item.id
      })}
      return filterTourList.length != 0 && (
      <>
      <Row justify="space-between" align="bottom" className="localHeadLine">
          <div>{item.name}</div>
          <div style={{fontSize:12, fontWeight:500}}>XEM THÊM TOUR ></div>
      </Row>
      <Row gutter={[24, 24]} style={{marginTop:10}}>
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
     </>)
    })
  }

  function renderTourList() {
    if (tourList.load) return <p>Loading...</p>;
    
    return (
      <>
      <div className="container-search">
        <SearchTour setKeySearchLocation={setKeySearchLocation}/>
      </div>
      <div style={{backgroundColor:"#e0e7ef", display:"flex", justifyContent:"center"}}>
        <Row justify="space-between" align="middle" style={{ textAlign:"center", fontSize:16, fontWeight:400, color:"#003C71", maxWidth:1400, width:"100%", padding:'15px 50px'}}>
          <Col style={{alignItems:"center", justifyContent:"center", display:"flex"}}><AiFillCheckCircle style={{fontSize:46, fontWeight:600}}/> Tour chọn lọc chất lượng nhất</Col>
          <Col style={{alignItems:"center", justifyContent:"center", display:"flex"}}><AiFillCheckCircle style={{fontSize:46, fontWeight:600}}/> Bảo đảm giá tốt nhất</Col>
          <Col style={{alignItems:"center", justifyContent:"center", display:"flex"}}><AiFillCheckCircle style={{fontSize:46, fontWeight:600}}/> Đội ngũ tư vấn chi tiết và tận tình</Col>
        </Row>
      </div>
      <div style={{display:"flex", justifyContent:"center"}}>
        <div style={{padding: '10px 50px', maxWidth: 1400, width: "100%" }}>
          {renderTourFolowTopic()}
          {/* <Row justify="space-between" align="bottom" className="localHeadLine">
              <div>Mùa hè rực rỡ</div>
              <div style={{fontSize:12, fontWeight:500}}>XEM THÊM TOUR ></div>
          </Row>
          <Row gutter={[24, 24]} style={{marginTop:10}}>
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
          </Row> */}
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
  const { tourList, topicTourList } = state.tourReducer;
  console.log("🚀 ~ file: index.jsx ~ line 115 ~ mapStateToProps ~ topicTourList", topicTourList)
  return {
    tourList: tourList,
    topicTourList: topicTourList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTourList: (params) => dispatch(getTourListAction(params)),
    getTopicTourList: (params) => dispatch(getTopicTourListAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TourHomePage);