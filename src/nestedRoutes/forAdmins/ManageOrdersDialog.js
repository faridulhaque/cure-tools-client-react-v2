import React from "react";
import toast from "react-hot-toast";
import { Confirm, useDialog } from "react-st-modal";
import useAllUsers from "../../hooks/useAllUsers";

const ManageOrdersDialog = ({ order }) => {
  const dialog = useDialog();
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
    _id,
  } = order;
  const orderer = users.find((user) => user?.email === email);
  const name = orderer?.profileName
    ? orderer?.profileName
    : orderer?.primaryName;
  const handleShipment = (id) => {
    fetch(`https://mighty-retreat-73260.herokuapp.com/shipment/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("data successfully updated", { id: "shipment" });
          dialog.close(data.acknowledged);
        }
      });
  };
  const handleDelete = async (id) => {
    const result = await Confirm(
      "You can't undo this action!",
      "Are you sure?"
    );
    if (result) {
      console.log(id);
      fetch(`https://mighty-retreat-73260.herokuapp.com/order/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast.success("Order successfully deleted", { id: "delete" });
            dialog.close(data.acknowledged);
          }
        });
    }
  };
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
        <span className={shipmentStatus ? "text-green-500" : "text-yellow-500"}>
          {shipmentStatus ? "Shipped" : "pending"}
        </span>
      </p>
      <button
        onClick={() => handleShipment(_id)}
        className="btn btn-success text-white mt-5"
        disabled={shipmentStatus === true || paymentStatus !== "paid"}
      >
        Shipped
      </button>{" "}
      <button
        onClick={() => handleDelete(_id)}
        className="btn btn-danger ml-5 mt-5"
        disabled={paymentStatus === "paid"}
      >
        Delete
      </button>
    </div>
  );
};

export default ManageOrdersDialog;
