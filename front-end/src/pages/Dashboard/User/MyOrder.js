import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyOrders } from "../../../globalState/GlobalStateSlice";
import Loading from "../../Shared/Loading";

const OrderItem = ({
  orderType,
  numClothes,
  pickUpdate,
  isPaid,
  totalCost,
  index,
}) => {
  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{orderType}</td>
      <td>{numClothes}</td>
      <td>{pickUpdate}</td>
      <td>{totalCost}</td>
      <td>{isPaid ? "Paid" : "Not Paid"}</td>
    </tr>
  );
};

const MyOrder = () => {
  const dispatch = useDispatch();
  const { isOrderDataLoading, myOrders, user } = useSelector(
    (state) => state.globalState
  );

  console.log(myOrders);
  useEffect(() => {
    dispatch(getMyOrders(user.uid));
  }, []);
  if (isOrderDataLoading) {
    return <Loading />;
  }

  if (myOrders.length === 0) {
    return (
      <>
        <h1>You haven't made any order yet!</h1>
      </>
    );
  }
  return (
    <>
      <div className="container">
        <h1>My Orders</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Order Type</th>
              <th scope="col">Total Clothes</th>
              <th scope="col">Pickup Date</th>
              <th scope="col">Cost</th>
              <th scope="col">Payment</th>
            </tr>
          </thead>
          <tbody>
            {myOrders.map((item, index) => (
              <OrderItem key={item._id} {...item} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyOrder;
