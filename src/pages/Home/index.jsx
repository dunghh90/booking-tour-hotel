import { Row, Col, List } from 'antd';
import history from '../../utils/history';
import { connect } from 'react-redux';
import SimpleSlider from '../../components/slick';
import ToDoListPage from '../ToDoListTemp';

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
          <Col span='8'
            key={index}>
            <img className="item" src={item.img}

              onClick={() => history.push(`/locations/${item.id}`)} />
            <h2 className="thongtin">{item.name}</h2>
          </Col>
        </>
      )
    })
  }

  return (
    <div>
      <SimpleSlider />
      <h1>Điểm điến trong nước</h1>
     
        <Row gutter={[8, 8]}>

          {renderLocationList()}
        </Row>
      {/* </Row> */}

    </div>

  );


}
const mapStateToProps = (state) => {
  const { locationList } = state.productHotelReducer;
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
