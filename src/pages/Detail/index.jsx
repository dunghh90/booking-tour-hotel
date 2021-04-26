import {Card, Col,Row} from 'antd';
import './styles.css';
function DetailPage(props,index) {
  const { productList, match } = props;
  console.log("🚀 ~ file: index.jsx ~ line 5 ~ DetailPage ~ props", props)
  const id = match.params.id;
  const productDetail = productList.find((item) => item.id.toString() === id);
  return (
    <>
    <Row >
      <Col span ={16}>
    <Card>
      
      <img style={{width:200 , height:200}} src={productDetail.img} />
      <div className="detail">
      <h2>
      {productDetail.name}
      </h2>
      <span>{productDetail.comment}</span>
      </div>
    </Card>
      </Col>
    </Row>
    </>
  );
}

export default DetailPage;
