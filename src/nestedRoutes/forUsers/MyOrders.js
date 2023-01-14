import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../../Shared/Loading";
import { auth } from "../../firebase/firebase.init";
import { Confirm, CustomDialog } from "react-st-modal";
import { toast } from "react-hot-toast";

import PaymentDialog from "../../Payment/PaymentDialog";

const MyOrders = () => {
  const [user, loading, error] = useAuthState(auth);
  const [myOrders, setMyOrders] = useState([]);
  const email = user?.email;

  useEffect(() => {
    fetch(`https://cure-tools.up.railway.app/myOrders?email=${email}`, {
      headers: {
        authorization: `Bearer: ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMyOrders(data);
      });
  }, [email, myOrders]);
  // payment option implemented
  const handlePayment = async ({ mo }) => {
    const result = await CustomDialog(<PaymentDialog mo={mo} />, {
      title: `pay $ ${parseInt(mo.price) * parseInt(mo.quantity)} for ${
        mo.productName
      }`,
      showCloseIcon: true,
    });
  };

  const handleDelete = async (id) => {
    const result = await Confirm(
      "You can't undo this action.",
      "Are you sure?"
    );

    if (result) {
      fetch(`https://cure-tools.up.railway.app/order/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success("Successfully deleted!", { id: "deleteItem" });
        });
    }
  };
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h2 className="text-center text-4xl text-primary mb-5">My Orders</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Item Price</th>
              <th>Quantity</th>

              <th>Total Price</th>
              <th>Payment Status</th>
              <th>Transaction ID</th>

              <th>Payment</th>
              <th>Cancellation</th>
            </tr>
          </thead>
          <tbody>
            {myOrders.map((mo) => (
              <tr key={mo._id} className="hover">
                <td>{mo.productName}</td>
                <td>$ {mo.price}</td>
                <td>
                  {mo.quantity} <sub>unit</sub>
                </td>
                <td>$ {parseInt(mo.price) * parseInt(mo.quantity)}</td>
                <td
                  className={
                    mo.paymentStatus === "paid"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }
                >
                  {mo.paymentStatus}
                </td>
                <td className="text-red-500">{mo.transaction}</td>
                <td>
                  <button
                    onClick={() => handlePayment({ mo })}
                    className="btn btn-success text-white"
                    disabled={mo.paymentStatus === "paid"}
                  >
                    Pay Now
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(mo._id)}
                    className="btn btn-danger text-white"
                    disabled={mo.paymentStatus === "paid"}
                  >
                    Cancel Order
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

export default MyOrders;
