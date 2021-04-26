import { Row, Col } from 'antd';
import history from '../../utils/history';

import SimpleSlider from '../../components/slick';
import ToDoListPage from '../ToDoListTemp'
import "./Home.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function HomePage(props) {
  const { productList } = props;
  
  function renderProductList() {
    return productList.map((item, index) => {
      return (
        <>
        
          <Col span='8'>
          <img className="item" src={item.img}
          key={index}
          onClick={() => history.push(`/product/${item.id}`)}/>
          <h2 className="thongtin">{item.name}</h2>
          </Col>
        </>
      )
    })
  }

  
  

  return (
    <div>
        <SimpleSlider/>
      <h1>Điểm đến ưa thích trong nước</h1>
      {/* Home
      <Button
        type="primary"
        onClick={() => history.push(ROUTERS.LOGIN)}
      >
        Go to Product list
      </Button> */}
      <Row gutter={[8,8]}>

      {renderProductList()}
      </Row>
      <ToDoListPage/>

    </div>
    
  );
    
 
}
export default HomePage;
