import { Row, Col, List } from 'antd';
import history from '../../utils/history';
import { connect } from 'react-redux';
import SimpleSlider from '../../components/slick';

import { getLocationListAction } from '../../redux/actions';
import { useEffect } from 'react';


import "./Home.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomePage({ getLocationList, locationList }) {


  // const [locationSelected, setLocationSelected] = useState(null);

  useEffect(() => {
    // getLocationList({
    //   page: 1,
    //   limit: 10
    // });
    getLocationList();

  }, []);





  function renderLocationList() {
    return locationList.data.map((item, index) => {
      return (
        <>
          <Col span={8}
            key={index}>
              <div className="noteHome">
            <img className="item" src={item.img}
              onClick={() => history.push(`/locations/${item.id}`)} />
            <h2 className="thongtin">{item.name}</h2>
            </div>
          </Col>
        </>
      )
    })
  }

  return (
    <div className="homepage">
      <Row className="slidercenter" justify="center">
        <div>
          <h1>Ưu đãi tốt nhất hôm nay</h1>
          <p>Du lịch để hiểu biết nhiều hơn</p>
          <img src="//cdn1.ivivu.com/iVivu/2021/04/02/18/anantara-1140x250.jpg" alt="" />
        </div>
      </Row>
      <div className="headerdanhgia">
        <h1>Những khách sạn nổi tiếng</h1>
        <p>Được đánh giá chất lượng quốc tế</p>
      </div>
      
        <SimpleSlider />
      <h1>Điểm điến trong nước</h1>
      <p>Những khu vực đến nhiều nhất trong năm</p>
      <Row gutter={[8, 8]}>

        {renderLocationList()}
      </Row>

    </div>

  );


}
const mapStateToProps = (state) => {
  const { locationList } = state.hotelReducer;
  return {
    locationList: locationList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLocationList: (params) => dispatch(getLocationListAction(params))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
