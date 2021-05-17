import ListRoom from "../ListRoom";
import { Col } from 'antd';
import {bookingHotelRoomAction} from '../../redux/actions';
import { useEffect} from 'react';
import { connect } from 'react-redux';




function historyPage(){
     
//   useEffect(() => {
//     bookingHotelRoom({
//       page: 1,
//       limit: 10
//     });
//   }, []);


// const columns = [
//   {
//     title: 'ID',
//     dataIndex: 'ID',
//   },
//   {
//     title: 'Check-in',
//     dataIndex: 'Check-in',
//   },
//   {
//     title: 'Check-out',
//     dataIndex: 'Check-out',
//   },
// ];

    function renderHistoryPage(){
        <div>MINH</div>
    //     // return ListRoom.data.bookingRooms.map((item,index)=>{
    //     //     <div>
    //     //           {item.id}
    //     //   </div>
    // }
    // )
}
return(
    <Col>
    {renderHistoryPage()}
    </Col>
)

}
// const mapStateToProps = (state) => {
//     const { listRoom } = state.productHotelReducer;
//     console.log("🚀 ~ file: index.jsx ~ line 126 ~ mapStateToProps ~ listRoom", listRoom)
//     return {
//       listRoom,
//     }
//   };
  
//   const mapDispatchToProps = (dispatch) => {
//     return {
      
//       bookingHotelRoom: (params) => dispatch(bookingHotelRoomAction(params)),
//     };
//   }


export default  historyPage;