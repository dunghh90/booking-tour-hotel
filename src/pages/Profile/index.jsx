import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Space, Card, InputNumber , Button } from 'antd';

function ProfilePage({
  getBookingTours,
  bookingTours
}) {
  let totalPrice = 0;

  function renderBookingTours(params) {
    return bookingTours.data.map((bookingItem, bookingIndex) => {
      totalPrice = bookingItem.id
        ? totalPrice + (bookingItem.price + bookingItem.option.price) * bookingItem.count
        : totalPrice + bookingItem.price * bookingItem.count;
      return (
        <Card>
          <Space size={32}>
            <p>{bookingItem.name}</p>
            {bookingItem.option.id && (
              <p>{bookingItem.option.title}</p>
            )}
            <p>{(bookingItem.price + (bookingItem.option.id ? bookingItem.option.price : 0)).toLocaleString() + ' VND'}</p>
            <InputNumber value={bookingItem.count} />
          </Space>
        </Card>
      )
    })
  }

  return (
    <div>
      {renderBookingTours()}
      <p>Total: {totalPrice.toLocaleString() + ' VND'}</p>
      <Button>Thanh Toán</Button>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { bookingTours } = state.bookingReducer;
  return {
    bookingTours,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingPage);
