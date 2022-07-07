import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../../Shared/Loading";
import { auth } from "../../firebase/firebase.init";
import { Confirm } from "react-st-modal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const MyOrders = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [myOrders, setMyOrders] = useState([]);
  const email = user?.email;

  useEffect(() => {
    fetch(`http://localhost:5000/myOrders?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setMyOrders(data);
      });
  }, [email, myOrders]);

  const handleDelete = async (id) => {
    const result = await Confirm(
      "You can't undo this action.",
      "Are you sure?"
    );

    if (result) {
      fetch(`http://localhost:5000/order/${id}`, {
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
          {myOrders.map((mo) => (
            <tr key={mo._id} className="hover">
              <td>{mo.name}</td>
              <td>$ {mo.price}</td>
              <td>
                {mo.quantity} <sub>unit</sub>
              </td>
              <td>$ {parseInt(mo.price) * parseInt(mo.quantity)}</td>
              <td>{mo.paymentStatus}</td>
              <td></td>
              <td>
                <button
                  onClick={() => handleDelete(mo._id)}
                  className="btn btn-success"
                >
                  Pay Now
                </button>
              </td>
              <td>
                <button className="btn btn-danger">Cancel Order</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
