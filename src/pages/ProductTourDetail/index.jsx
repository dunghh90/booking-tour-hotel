import { Card, Col, Row } from "antd";
import { useEffect, useState  } from "react";
import { connect } from "react-redux";

import { getProductTourDetailAction, getProductTourListAction } from "../../redux/actions";
import { HomeOutlined } from '@ant-design/icons';
import { Space } from 'antd';

import './style.css'
import { Content } from "antd/lib/layout/layout";


function TourDetailPage({
  productTourDetail,
  getProductTourDetail,
  match,
}) {
  const productId = match.params.id;
  // const [optionSelected, setOptionSelected] = useState({});
  
  useEffect(() => {
    getProductTourDetail({id: productId});
    console.log("🚀 ~ file: index.jsx ~ line 69 ~ productTourDetail.data", productTourDetail.data)
  }, [])

  // useEffect(() => {
  //   if (productTourDetail.data.id) {
  //     setOptionSelected(productDetail.data.productOptions[0] || {})
  //   }
  // }, [productTourDetail.data])

  return (
    <Content className="site-layout" style={{ padding: '0 50px'}}>
      <div className="content-header">
        <ol className="breadcrumb" itemscope="" itemtype="http://schema.org/BreadcrumbList">
          <Space><HomeOutlined /></Space>
          <li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">
            <a className="item" href="/du-lich/">
                <i class="fa fa-home"></i> <span itemprop="name">Trang chủ</span>
            </a>
            {/* <meta itemprop="position" content="1"> */}
          </li>
          <i style={{margin: "0px 10px"}}>|</i>
          <li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">
              <a className="item" href="/du-lich/tour-da-nang">
                  <span itemprop="name">Đà Nẵng</span>
              </a>
              {/* <meta itemprop="position" content="2"> */}
          </li>
          <i style={{margin: "0px 10px"}}>|</i>
          <li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem" class="active hidden-xs">

              <a className="item" class="link-detail-value" href="/du-lich/tour-da-nang-4n3d-hcm-da-nang-ba-na-hoi-an-hue-quang-binh/1189">
                  <span itemprop="name">Tour Đà Nẵng 4N3D: TP. HCM - Đà Nẵng - Bà Nà - Hội An - Huế - Quảng Bình</span>
              </a>
              {/* <meta itemprop="position" content="3"> */}
          </li>
        </ol>
      </div>
      {/* <Card >
        <span>Hãng:</span>
        <span>
          Giá

        </span>
      </Card> */}
      <h2>{productTourDetail.data.name}</h2>
      <Row span={24} gutter={24}>
        <Col span={16}>
          <h3>{productTourDetail.data.tourDescription.titleOverView}</h3>
          <p>{productTourDetail.data.tourDescription.descriptionOverView}</p>
          <h3>{productTourDetail.data.tourDescription.titleFeel}</h3>
          <p>{productTourDetail.data.tourDescription.descriptionFeel}</p>
          <h3>{productTourDetail.data.tourDescription.titleSchedule}</h3>
          <p>{productTourDetail.data.tourDescription.descriptionSchedule}</p>
        </Col>
        <Col span={8}></Col>
        
      </Row>
    </Content>
  );
}

const mapStateToProps = (state) => {
  const { productTourDetail } = state.productTourReducer;
  return {
    productTourDetail,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductTourDetail: (params) => dispatch(getProductTourDetailAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TourDetailPage);
