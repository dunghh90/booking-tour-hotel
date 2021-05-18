import { Layout, List } from 'antd';
// import {List } from '@ant-design/icons';
import './Siderba.css';

const {Sider } = Layout;
// function handleFilterCategory(id) {
//   setCategorySelected(id);
//   getProductTourList({
//     page: 1,
//     limit: 10,
//     categoryId: id,
//   })
// }


function Siderba(){
    return(
      <>
      <List
        size="small"
        header={<h4 style={{fontSize:18, color:"#333", borderColor: "#ddd"}}>Địa điểm HOT trong nước</h4>}
        bordered
        // dataSource={[
        //   { name: "Tất cả" },
        //   ...categoryList.data,
        // ]}
        renderItem={(item) => (
          <List.Item
            // onClick={() => handleFilterCategory(item.id)}
            // style={{ color: categorySelected === item.id ? 'red': 'black' }}
          >
            {item.name}
          </List.Item>
        )}
      />

      <List
        size="small"
        header={<h4 style={{fontSize:18, color:"#333", borderColor: "#ddd"}}>Địa điểm HOT trong nước</h4>}
        bordered
        style={{marginTop:20}}
        // dataSource={[
        //   { name: "Tất cả" },
        //   ...categoryList.data,
        // ]}
        renderItem={(item) => (
          <List.Item
            // onClick={() => handleFilterCategory(item.id)}
            // style={{ color: categorySelected === item.id ? 'red': 'black' }}
          >
            {item.name}
          </List.Item>
        )}
      />
    </>

    )
}
export default Siderba;