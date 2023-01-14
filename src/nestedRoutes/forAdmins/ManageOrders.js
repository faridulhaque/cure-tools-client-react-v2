import React, { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { CustomDialog } from "react-st-modal";
import ManageOrdersDialog from "./ManageOrdersDialog";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    fetch("https://cure-tools.up.railway.app/orders", {
      headers: {
        authorization: `Bearer: ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPageCount(Math.ceil(parseInt(data.length) / 5));
        setOrders(data);
      });
  }, [orders]);
  const handleDetails = async ({ order }) => {
    const result = await CustomDialog(
      <ManageOrdersDialog order={order}></ManageOrdersDialog>,
      {
        title: "Details",
        showCloseIcon: true,
      }
    );
  };
  return (
    <div>
      <h1 className="text-center text-4xl text-primary mb-5">Manage Orders</h1>
      <p className="text-center mb-5">
        Click view button to see details about the order like client name,
        phone, address etc.{" "}
      </p>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="text-center">Client email</th>
              <th className="text-center">Product Name</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Payment Status</th>
              <th className="text-center">Shipment Status</th>
              <th className="text-center">Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order?._id}>
                <td>{order?.email}</td>
                <td>{order?.productName}</td>
                <td>{order.quantity}</td>
                <td
                  className={
                    order?.paymentStatus === "paid"
                      ? "text-center text-green-500"
                      : "text-center text-yellow-500"
                  }
                >
                  {order?.paymentStatus ? order?.paymentStatus : "pending"}
                </td>
                <td
                  className={
                    order?.shipmentStatus
                      ? "text-green-500 text-center"
                      : "text-center text-yellow-500"
                  }
                >
                  {order.shipmentStatus ? "Shipped" : "pending"}
                </td>
                <td className="text-center">
                  <button
                    onClick={() => handleDetails({ order })}
                    className="btn btn-primary text-center"
                  >
                    view
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
