import React from "react";
import useAllUsers from "../../hooks/useAllUsers";

const ManageOrdersDialog = ({ order }) => {
  const { users } = useAllUsers();
  const {
    email,
    productName,
    paymentStatus,
    shipmentStatus,
    price,
    quantity,
    phn,
    address,
  } = order;
  const orderer = users.find((user) => user?.email === email);
  const name = orderer?.profileName
    ? orderer?.profileName
    : orderer?.primaryName;
  return (
    <div className="manage-orders-dialog ml-10 mt-10">
      <p>Client Name: {name}</p>
      <p>Product Name: {productName}</p>
      <p>Price: {price}</p>
      <p>Quantity: {quantity}</p>
      <p>Total Price: {parseInt(price) * parseInt(quantity)}</p>
      <p>
        Payment Status:{" "}
        <span
          className={
            paymentStatus === "paid" ? "text-green-700" : "text-red-500"
          }
        >
          {paymentStatus === "paid" ? paymentStatus : " pending"}
        </span>
      </p>
      <p>Phone: {phn}</p>
      <p>Address: {address}</p>
      <p>
        Shipment Status:{" "}
        <span
          className={shipmentStatus ? "text-green-500" : "text-yellow-500"}
        ></span>
        {shipmentStatus ? shipmentStatus : "pending"}
      </p>
      <button
        className="btn btn-success text-white mt-5"
        disabled={paymentStatus !== "paid"}
      >
        Shipped
      </button>{" "}
      <button
        className="btn btn-danger ml-5 mt-5"
        disabled={paymentStatus === "paid"}
      >
        Cancel
      </button>
    </div>
  );
};

export default ManageOrdersDialog;
