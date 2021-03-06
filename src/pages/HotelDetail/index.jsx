import {
  Button,
  Card,
  DatePicker,
  Row,
  Col,
  Form,
  Input,
  Space,
  Modal,
  Divider,
  Tag,
  Descriptions,
} from "antd";

import { connect } from "react-redux";
import { useEffect, useState } from "react";
import {
  SendOutlined,
  HomeOutlined,
  GlobalOutlined,
  UsergroupAddOutlined,
  VideoCameraOutlined,
  BankOutlined,
  AimOutlined,
  CarOutlined,
  ArrowUpOutlined,
  InsertRowRightOutlined,
  FieldTimeOutlined,
  EnvironmentOutlined,
  FileExcelOutlined,
  HeartOutlined,
  HistoryOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Rate, Progress, BackTop } from "antd";
import Header from "../../components/layouts/Header";
import moment from "moment";
import ItemRoom from "./components/itemRoom";
import CommentPage from "../../components/Comment";
import { bookingHotelAction, getListRoomAction } from "../../redux/actions";

import "./styles.css";
import { Tabs } from "antd";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const style = {
  height: 40,
  width: 40,
  lineHeight: "40px",
  borderRadius: 4,
  backgroundColor: "#1088e9",
  color: "#fff",
  textAlign: "center",
  fontSize: 14,
};
function ListRoomPage({ listRoom, getListRoom, match, bookingHotelRoom, userInfo }) {
  const hotelId = match.params.id;
  const [roomSelected, setRoomSelected] = useState({});
  const [dateSelected, setDateSelected] = useState();
  // const [totalPrice, setTotalPrice] = useState(0);
  
  const currentDate = new Date();

  const [searchKey, setSearchKey] = useState({ userNum: "", price: "" });

  useEffect(() => {
    getListRoom({ id: hotelId });
  }, []);

  useEffect(() => {
    if (listRoom.data.id) {
      setRoomSelected(listRoom.data.rooms[0] || {});
    }
  }, [listRoom.data]);

  const filterListRoom = listRoom.data.rooms.filter((item) => {
    return (
      item.price.toString().indexOf(searchKey.price.trim()) !== -1 &&
      item.title.toString().indexOf(searchKey.userNum.trim()) !== -1
    );
  });

  function handleDate(value) {
    const [startDate, endDate] = value;
    setDateSelected([
      moment(startDate).format("YYYY/MM/DD"),
      moment(endDate).format("YYYY/MM/DD"),
    ]);
  }

  function showConfirmBooking(item) {
    const numDate = moment
      .duration(
        moment(dateSelected[1], "YYYY/MM/DD").diff(
          moment(dateSelected[0], "YYYY/MM/DD")
        )
      )
      .asDays();
    Modal.confirm({
      title: 'X??c nh???n th??ng tin ?????t kh??ch s???n',
      icon: <ExclamationCircleOutlined />,
      width: 500,
      content: (
        <>
          <img
            alt="example"
            src={item.img}
            style={{ height: 200, width: '100%', objectFit: "cover" }}
          />
          <Descriptions bordered size="small">
            <Descriptions.Item span={3} label="T??n kh??ch s???n">{listRoom.data.name}</Descriptions.Item>
            <Descriptions.Item span={3} label="Lo???i ph??ng">{item.title}</Descriptions.Item>
            <Descriptions.Item span={3} label="Ng??y ?????t">{dateSelected[0]}</Descriptions.Item>
            <Descriptions.Item span={3} label="Ng??y tr???">{dateSelected[1]}</Descriptions.Item>
            <Descriptions.Item span={3} label="T???ng ng??y ?????t">{numDate} ????m</Descriptions.Item>
            <Descriptions.Item span={3} label="Gi?? 1 ????m">{item.price.toLocaleString()} / ????m</Descriptions.Item>
            <Descriptions.Item span={3} label="T???ng ti???n">{(numDate * item.price).toLocaleString()} VND</Descriptions.Item>
          </Descriptions>
        </>
      ),
      okText: 'X??c nh???n',
      cancelText: 'Hu???',
      onOk() {
        bookingHotelRoom({
          userId: userInfo.data.id,
          hotelId: parseInt(hotelId),
          roomId: item.id,
          startDate: dateSelected[0],
          endDate: dateSelected[1],
          totalPrice: numDate * item.price,
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  
  function handleBookingHotel(id) {
    if (!userInfo.data.id) {
      alert("B???n c???n ????ng nh???p!");
    } else if (!dateSelected) {
      alert("C???n ch???n ng??y ?????t ph??ng!");
    } else {
      showConfirmBooking(id)
    }
  }

  function renderListRoom() {
    if (filterListRoom.load) return <p>loading...</p>;
    return filterListRoom.map((item, index) => {
      let isDisabled = false;

      if (dateSelected) {
        listRoom.data.bookingHotels.forEach((bookingItem, bookingIndex) => {
          if (
            ((moment(dateSelected[0], "YYYY/MM/DD").unix() -
              moment(bookingItem.startDate, "YYYY/MM/DD").unix() >=
              0 &&
              moment(bookingItem.endDate, "YYYY/MM/DD").unix() -
                moment(dateSelected[1], "YYYY/MM/DD").unix() >=
                0) ||
              (moment(dateSelected[1], "YYYY/MM/DD").unix() -
                moment(bookingItem.startDate, "YYYY/MM/DD").unix() >
                0 &&
                moment(bookingItem.startDate, "YYYY/MM/DD").unix() -
                  moment(dateSelected[0], "YYYY/MM/DD").unix() >
                  0) ||
              (moment(bookingItem.endDate, "YYYY/MM/DD").unix() -
                moment(dateSelected[0], "YYYY/MM/DD").unix() >
                0 &&
                moment(dateSelected[1], "YYYY/MM/DD").unix() -
                  moment(bookingItem.endDate, "YYYY/MM/DD").unix() >
                  0)) &&
            bookingItem.roomId === item.id
          ) {
            isDisabled = true;
          }
        });
      }

      return (
        <Col span={6}>
          <Card
            hoverable
            size="small"
            cover={
              <img
                alt="example"
                src={item.img}
                style={{ height: 200, objectFit: "cover" }}
              />
            }
            style={{ height: 400 }}
          >
            <h2 style={{ marginBottom: 8, fontWeight: 600, color: '#003c71', width: '100%' }}>{item.title} </h2>
            <ItemRoom key={index} description={item.description} />
            {!isDisabled
              ? (
                <>
                  <span className="price">{item.price.toLocaleString()} VND</span>
                  <Button
                    type="primary"
                    className="book"
                    onClick={() => handleBookingHotel(item)}
                  >
                    ?????t Ph??ng
                  </Button>
                </>
              )
              : (
                <Button size="large" danger style={{ margin: '8px 0 0 100px', transform: 'rotate(-15deg)' }}>
                  H???t Ph??ng
                </Button>
              )
            }
          </Card>
        </Col>
      );
    });
  }

  return (
    <>
      <div>
        <Row className="timkiem">
          <div className="alltimkiem">
            <Form
              name="basic"
              initialValues={{ remember: true }}
              layout="inline"
              onFinish={(values) => {
                setSearchKey({ userNum: values.userNum, price: values.price });
              }}
            >
              <Col span={10}>
                <Form.Item name="userNum">
                  <Input
                    labelFontSize={100}
                    fontSize={100}
                    prefix={<SendOutlined />}
                    style={{
                      padding: "10px 50px",
                      height: 50,
                      borderRadius: 4,
                      backgroundColor: "white",
                    }}
                    onChange={(
                      e //setSearchKey(e.target.value)
                    ) =>
                      setSearchKey({ ...searchKey, userNum: e.target.value })
                    }
                    placeholder="B???n c???n nh???p s??? ng?????i"
                  />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item name="dateBooking">
                  <DatePicker.RangePicker
                    labelFontSize={100}
                    fontSize={100}
                    onChange={(value) => handleDate(value)}
                    style={{
                      padding: "10px 50px",
                      width: "100%",
                      height: 50,
                      borderRadius: 4,
                      backgroundColor: "white",
                    }}
                    defaultValue={moment(currentDate)}
                    format="DD/MM/YYYY"
                    disabledDate={(nowDate) =>
                      nowDate && nowDate < moment().startOf("day")
                    }
                  />
                </Form.Item>
              </Col>
              {/* <Col span={7}>
              <Form.Item
                name="price"
              >
                <Input
                  labelFontSize={100}
                  fontSize={100} prefix={<SendOutlined />}
                  disabled
                  style={{
                    padding: '10px 50px',
                    height: 50, borderRadius: 4,
                    backgroundColor: "white"
                  }}
                  onChange={(e) => //setSearchKey(e.target.value)
                    setSearchKey({ ...searchKey, price: e.target.value })
                  }
                  placeholder="Ch???n gi?? ti???n"
                />
              </Form.Item>
            </Col> */}
              <Col span={3}>
                <Row style={{ width: "100%" }} justify="end">
                  <Button
                    style={{
                      padding: "10px 40px",
                      height: 50,
                      borderRadius: 4,
                      backgroundColor: "#ffe58f",
                      color: "#003a8c",
                      fontWeight: 600,
                    }}
                  >
                    T??m
                  </Button>
                </Row>
              </Col>
            </Form>
          </div>
        </Row>

        <div className="bodyHotelDetail">
          <div className="bodyHotelDetail2">
            <div className="detailTrangchu">
              <ol className="breadcrumb" style={{ padding: "24px 0 8px" }}>
                <Space>
                  <HomeOutlined />
                </Space>
                <li>
                  <a className="item" disabled href="/du-lich/">
                    <i className="fa fa-home"></i>
                    <span>Trang ch???</span>
                  </a>
                </li>
                <i style={{ margin: "0px 10px" }}>|</i>
                <li>
                  <a className="item" disabled href="/du-lich/tour-da-nang">
                    <span>Kh??ch s???n Vi???t Nam</span>
                  </a>
                </li>
                <i style={{ margin: "0px 10px" }}>|</i>
                <li className="active hidden-xs">
                  <a
                    className="item"
                    href="/du-lich/tour-da-nang-4n3d-hcm-da-nang-ba-na-hoi-an-hue-quang-binh/1189"
                  >
                    <span>Th??ng tin v??? kh??ch s???n</span>
                  </a>
                </li>
              </ol>
              <Row gutter={[16, 16]}>
                <Col span={16}>
                  <Row gutter={[16, 16]}>
                    <Col span={14}>
                      <img
                        src={listRoom.data.src[0]}
                        alt=""
                        width="100%"
                        height={316}
                        style={{ objectFit: "cover" }}
                      />
                    </Col>
                    <Col span={10}>
                      <Row gutter={[16, 16]}>
                        <Col span={24}>
                          <img
                            src={listRoom.data.src[1]}
                            alt=""
                            width="100%"
                            height={150}
                            style={{ objectFit: "cover" }}
                          />
                        </Col>
                        <Col span={12}>
                          <img
                            src={listRoom.data.src[2]}
                            alt=""
                            width="100%"
                            height={150}
                            style={{ objectFit: "cover" }}
                          />
                        </Col>
                        <Col span={12}>
                          <img
                            src={listRoom.data.src[3]}
                            alt=""
                            width="100%"
                            height={150}
                            style={{ objectFit: "cover" }}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col span={24}>
                      <Card>
                        <Tag color="#87d068" style={{ margin: "4px 0 6px" }}>
                          {listRoom.data.area}
                        </Tag>
                        <h1 className="HotelDetailName">
                          {" "}
                          {listRoom.data.name}{" "}
                        </h1>
                        <div>
                          <Rate disabled value={listRoom.data.rate} />
                        </div>
                        <Space>
                          <EnvironmentOutlined />
                          <div>{listRoom.data.address}</div>
                        </Space>
                      </Card>
                    </Col>
                    <Col span={24}>
                      <Card>
                        <h3 className="diemnoibat">??i???m n???i b???t v??? ch??? ngh??</h3>
                        <Row gutter={32}>
                          <Col
                            span={8}
                            style={{ borderRight: "1px solid #cccccc" }}
                          >
                            <Space align="start" size={16}>
                              <HistoryOutlined
                                style={{ fontSize: 30, color: "#003a8c" }}
                              />
                              <div>
                                <div
                                  style={{
                                    fontSize: 16,
                                    fontWeight: 600,
                                    color: "#003a8c",
                                  }}
                                >
                                  B??n ti???p t??n 24H
                                </div>
                                <span className="note14">
                                  Nh???n ph??ng kh??ng ph???c t???p
                                </span>
                              </div>
                            </Space>
                          </Col>
                          <Col
                            span={8}
                            style={{ borderRight: "1px solid #cccccc" }}
                          >
                            <Space align="start" size={16}>
                              <HeartOutlined
                                style={{ fontSize: 30, color: "#003a8c" }}
                              />
                              <div>
                                <div
                                  style={{
                                    fontSize: 16,
                                    fontWeight: 600,
                                    color: "#003a8c",
                                  }}
                                >
                                  C?? c??c d???ch v??? chi???u l??ng kh??ch h??ng
                                </div>
                                <span className="note14">
                                  Massage,x??ng h??i,bida,h??? b??i...
                                </span>
                              </div>
                            </Space>
                          </Col>
                          <Col span={8}>
                            <Space align="start" size={16}>
                              <FileExcelOutlined
                                style={{ fontSize: 30, color: "#003a8c" }}
                              />
                              <div>
                                <div
                                  style={{
                                    fontSize: 16,
                                    fontWeight: 600,
                                    color: "#003a8c",
                                  }}
                                >
                                  Kh??ng h???y ph??ng
                                </div>
                                <span className="note14">
                                  ???? ?????t ph??ng th?? kh??ng ???????c h???y.?????ng xem
                                  ch??ngt??i l?? tr?? ch??i
                                </span>
                              </div>
                            </Space>
                          </Col>
                        </Row>
                        <ul style={{ paddingLeft: 20, margin: "16px 0 0" }}>
                          <li>
                            Cung c???p nhi???u d???ch v??? ch???t l?????ng v?? ti???n nghi ??a
                            d???ng ????? b???n y??n t??m t???n h?????ng k??? ngh??? c???a m??nh
                          </li>
                          <li>
                            Ch??? ngh??? n??y ???????c trang b??? nhi???u ti???n nghi ??a d???ng,
                            h???a h???n s??? l??m h??i l??ng ngay c??? nh???ng kh??ch h??ng kh??
                            t??nh nh???t
                          </li>
                          <li>
                            C??c trang thi???t b??? gi???i tr?? nh?? ph??ng th??? d???c, ph??ng
                            x??ng h??i kh??, h??? b??i trong nh??, spa, massage s??? ??em
                            l???i nh???ng gi??? ph??t th?? gi??n sau m???t ng??y b???n r???n
                          </li>
                        </ul>
                      </Card>
                    </Col>
                  </Row>
                </Col>
                <Col span={8}>
                  <Card
                    title="????nh gi?? ch???t l?????ng kh??ch s???n"
                    style={{ width: "100%", marginBottom: 16 }}
                  >
                    <div>
                      <div>
                        <label htmlFor="">Tuy???t v???i</label>
                        <Progress percent={90} status="active" />
                      </div>
                      <div>
                        <label htmlFor="">T???t</label>
                        <Progress percent={80} status="active" />
                      </div>
                      <label htmlFor="">Kh??ng ?????t y??u c???u</label>
                      <Progress percent={10} status="exception" />
                    </div>
                  </Card>
                  <Card
                    size="small"
                    title="Th??ng tin v??? tr??"
                    cover={
                      <img
                        alt="example"
                        src="https://previews.123rf.com/images/pingebat/pingebat1507/pingebat150700119/42663707-a-generic-city-map-of-an-imaginary-city-.jpg"
                        style={{ height: 200, objectFit: "cover" }}
                      />
                    }
                    style={{ width: "100%" }}
                  >
                    <div>
                      <Space>
                        <EnvironmentOutlined />
                        V??? tr?? hi???m c??
                      </Space>
                    </div>
                    <div>
                      <Space>
                        <InsertRowRightOutlined />
                        ?????a b??n ph??? bi???n
                      </Space>
                    </div>
                    <Row
                      justify="space-between"
                      style={{
                        margin: "8px 0",
                        padding: "8px 0",
                        borderTop: "1px solid #f5f5f5",
                        borderBottom: "1px solid #f5f5f5",
                      }}
                    >
                      <Space>
                        <CarOutlined />
                        ????? xe
                      </Space>
                      <span className="free">Mi???n ph??</span>
                    </Row>
                    <div>
                      <Space>
                        <AimOutlined />
                        C??c ?????a ??i???m n???i ti???ng
                      </Space>
                      <ul className="itemnote">
                        <li className="itemnote1">V???nh H??? Long</li>
                        <li className="itemnote1">Phong Nha K??? B??ng</li>
                        <li className="itemnote1">H???i An</li>
                        <li className="itemnote1">Bi???n M??? Kh?? ???? N???ng</li>
                        <li className="itemnote1">M??i n?? C?? Mau</li>
                        <li className="itemnote1">Ch??a Linh ???ng</li>
                      </ul>
                    </div>
                  </Card>
                </Col>
                <Col span={24}>
                  <Card size="small">
                    <Space size={16}>
                      <FieldTimeOutlined
                        style={{ fontSize: 40, color: "#003a8c" }}
                      />
                      <div>
                        <div style={{ fontSize: 20, color: "#003a8c" }}>
                          Ng??y qu?? kh??ch ch???n l?? ng??y ph??? bi???n ?????i v???i kh??ch du
                          l???ch
                        </div>
                        <span className="bcd">
                          C??? 60 ph??t l?? c?? kh??ch ?????t ph??ng tr??n ????y
                        </span>
                      </div>
                    </Space>
                  </Card>
                </Col>
              </Row>
            </div>

            <div style={{ width: "100%" }}>
              <Divider
                orientation="left"
                style={{ fontSize: 24, color: "#003c71" }}
              >
                Danh s??ch ph??ng c???a ch??ng t??i
              </Divider>
            </div>
            {filterListRoom.length != 0 ? (
              <Row gutter={[16, 16]}>{renderListRoom()}</Row>
            ) : (
              <Row justify="center">
                <Col span={24}>
                  <div className="khongcokq">Kh??ng c?? k???t qu???...</div>
                </Col>
              </Row>
            )}
            <Card size="small" style={{ margin: "16px 0" }}>
              <Space size={16}>
                <GlobalOutlined style={{ fontSize: 40, color: "#003a8c" }} />
                <div>
                  <div style={{ fontSize: 20, color: "#003a8c" }}>
                    ?????ng b??? l??? c?? h???i l???n n??y
                  </div>
                  <span className="bcd">
                    Nhanh tay ch???n cho m??nh 1 ph??ng y??u th??ch ????? c??ng nhau du
                    l???ch n??o
                  </span>
                </div>
              </Space>
            </Card>
            <div style={{ width: "100%" }}>
              <Divider
                orientation="left"
                style={{ fontSize: 24, color: "#003c71" }}
              >
                ????nh gi?? t???ng th???
              </Divider>
            </div>
            <Row gutter={16}>
              <Col span={18}>
                <Card>
                  <Row gutter={16}>
                    <Col span={8}>
                      <div>
                        <h3>??i???m s??? tr??n Webboking</h3>
                        <Progress percent={90} status="active" />
                      </div>
                      <div className="danhgiashow">
                        <span className="score">{listRoom.data.rate}.0</span>
                        <span className="score-description">
                          Tr??n c??? tuy???t v???i
                        </span>
                        <h3 className="score-danhgia">
                          D???a tr??n ????nh gi?? kh??ch h??ng
                        </h3>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className="danhgiacenter">
                        <label>????? s???ch s???</label>
                        <Progress
                          percent={90}
                          className="progress"
                          status="active"
                          size="small"
                        />
                        <label>Th??i ????? ph???c v???</label>
                        <Progress
                          percent={95}
                          className="progress"
                          status="active"
                          size="small"
                        />
                        <label>????nh gi?? ti???n</label>
                        <Progress
                          percent={99}
                          className="progress"
                          status="active"
                          size="small"
                        />
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className="thongtinluuy">
                        <h3>Th??ng tin c???n l??u ??</h3>
                        <div className="thongtinluuy1">
                          <div className="notethongbao">
                            <h4>S??? l?????ng ph??ng:</h4>
                            <span className="notethongbaocon">200</span>
                          </div>
                          <div className="notethongbao">
                            <h4>??i???n ??p trong ph??ng:</h4>
                            <span className="notethongbaocon">220V</span>
                          </div>
                          <div className="notethongbao">
                            <h4>Kh??ch s???n ???????c x??y v??o n??m:</h4>
                            <span className="notethongbaocon">2019</span>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card>
                <Divider
                  orientation="left"
                  style={{ fontSize: 24, color: "#003c71" }}
                >
                  Nh???n x??t t??? du kh??ch
                </Divider>
                <Card>
                  <CommentPage hotelId={hotelId} />
                </Card>
              </Col>
              <Col span={6}>
                <Card
                  title="Vourcher + Combo khuy???n m??i ng??y h??"
                  style={{ width: "100%", fontSize: 16 }}
                  cover={
                    <img
                      src={listRoom.data.src[1]}
                      alt=""
                      width="100%"
                      height={200}
                      style={{ objectFit: "cover" }}
                    />
                  }
                >
                  <div>
                    <Space>
                      <UsergroupAddOutlined />
                      T???i ??a 3 ng?????i l???n v?? 2 tr??? em
                    </Space>
                  </div>
                  <div>
                    <Space>
                      <BankOutlined />
                      R???ng 40m2
                    </Space>
                  </div>
                  <div>
                    <Space>
                      <UsergroupAddOutlined />
                      M???t gi?????ng ????i
                    </Space>
                  </div>
                  <div>
                    <Space>
                      <VideoCameraOutlined />
                      View nh??n ra bi???n
                    </Space>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <BackTop className="backtop">
        <div style={style}>
          <ArrowUpOutlined />
        </div>
      </BackTop>
    </>
  );
}

const mapStateToProps = (state) => {
  const { listRoom } = state.hotelReducer;
  const { userInfo } = state.userReducer;
  return {
    listRoom,
    userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListRoom: (params) => dispatch(getListRoomAction(params)),
    bookingHotelRoom: (params) => dispatch(bookingHotelAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListRoomPage);
