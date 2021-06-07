import { Button, Card, Col, Row } from 'antd';

import { connect } from 'react-redux';
import { getListHotelAction } from '../../redux/actions';
import { useEffect, useState } from 'react';
import history from '../../utils/history';
import { Rate, BackTop } from 'antd';
import './styles.css';
import { EnvironmentOutlined, TeamOutlined, ArrowUpOutlined } from '@ant-design/icons';
import Slipder from '../../components/slickHotel';
import Header from '../../components/layouts/Header';
import Siderba from '../../components/Siderba';


const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
};
function ListHotelPage({
  listHotel,
  getListHotel,
  match,
}) {
  const locationId = match.params.id;
  const [roomSelected, setRoomSelected] = useState({});


  useEffect(() => {

    getListHotel({
      page: 1,
      limit: 10,
      id: locationId
    });
  }, [])

  useEffect(() => {
    if (listHotel.data.id) {
      setRoomSelected(listHotel.data.hotels[0] || {})
    }
  }, [listHotel.data])



  function loadmoreHotel() {
    console.log("🚀 ~ file: index.jsx ~ line 42 ~ loadmoreHotel ~ loadmoreHotel", loadmoreHotel)
    getListHotel({
      more: true,
      // page: page + 1,
      page: listHotel.page + 1,
      limit: 10,
      id: locationId,
    });
  }

  function renderListHotel() {
    if (listHotel.load) return <p>Loading...</p>;
    return listHotel.data.map((item, index) => {
      return (
        <>
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Card
                hoverable
                title={item.area}
                cover={<div alt="example" src="" />}
                style={{ marginTop: 16 }}
                onClick={() => history.push(`/hotels/${item.id}`)}

              >
                <Row>
                  <div className="optiondetail">
                    <img className="imgAll" src={item.img} alt="" />
                    <div className="option">
                      <h2 className="name" > {item.name} </h2>
                      <Rate disabled value={item.rate} />
                      <h5 className="adr"><EnvironmentOutlined />.{item.address}</h5>
                      {/* <button>{item.note}</button> */}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.note
                        }}>
                      </div>
                      <h4 className="comment12"><TeamOutlined />.{item.comment}</h4>
                      <div className="priceandnote">
                      
                          <div className="pricerenhat">Giá 1 đêm của khách sạn từ:</div>
                        <div className="price1">{item.Price.toLocaleString()} VND</div>
                        <div className="pricerenhat12" > Lưu ý: Giá của khách sạn cao theo số người và chất lượng phòng  </div>
                      </div>
                    </div>
                  </div>
                </Row>
              </Card>
            </Col>
          </Row>
        </>
      )
    });
  }

  return (
    <>
      <div className="allList">
        <Header />
        <div>
          <div>
            < Slipder />
            <h1 className="hotel">Khách sạn</h1>
            <span className="hotro">Cần hỗ trợ liên hệ: 0702321494</span>
            <Row gutter={[8, 8]} justify="center">
              <Col span={7}>
                < Siderba locationId={locationId} />
              </Col>
              <Col span={17}>
                {renderListHotel()}
              </Col>
              <Row>
                <BackTop className="backtop">
                  <div style={style}><ArrowUpOutlined /></div>
                </BackTop>
              </Row>
              {listHotel.data.length % 10 === 0 && (
                <Button onClick={() => loadmoreHotel()}>Xem thêm khách sạn</Button>
              )
              }
            </Row>
          </div>
        </div>
      </div>

    </>
  );
}

const mapStateToProps = (state) => {
  const { listHotel } = state.hotelReducer;
  return {
    listHotel,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListHotel: (params) => dispatch(getListHotelAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListHotelPage);



