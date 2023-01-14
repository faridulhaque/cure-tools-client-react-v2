import React, { useEffect, useState } from "react";
import "./inventory.css";
import { useNavigate, useParams } from "react-router-dom";
import useUserInfo from "../hooks/useUserInfo";

import { Alert, Confirm } from "react-st-modal";
import Loading from "../Shared/Loading";

const Inventory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  const { userInfo, loading } = useUserInfo({});
  const { email, address, phn, profileName, primaryName } = userInfo;
  const name = profileName ? profileName : primaryName;
  useEffect(() => {
    fetch(`https://cure-tools.up.railway.app/tool/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const productName = product.name;
    const price = product.price;
    const paymentStatus = "pending";

    const phn = e.target.phn.value;
    const address = e.target.address.value;
    const email = e.target.email.value;
    const data = {
      name,
      email,
      phn,
      address,
      productName,
      quantity,
      price,
      paymentStatus,
    };

    if (
      parseInt(data.quantity) >= parseInt(product.minQuantity) &&
      parseInt(data.quantity) <= parseInt(product.avlQuantity)
    ) {
      fetch("https://cure-tools.up.railway.app/orders", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            confirmationModal();
          }
        });
    } else {
      Alert(
        `The quantity must be from ${product.minQuantity} or above to ${product.avlQuantity} or less.`,
        "Please check your quantity!"
      );
    }
  };

  const confirmationModal = async () => {
    const result = await Confirm(
      'Visit "My Orders" page to confirm your payment.',
      "Item added to the cart!"
    );

    if (result) {
      navigate("/dashboard/myOrders");
    }
  };
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      {userInfo?.role !== "Admin" && (
        <h2 className="text-center text-3xl my-10">Order Product</h2>
      )}
      {userInfo?.role === "Admin" && (
        <h2 className="text-center text-3xl my-10">
          Details <br />{" "}
          <button onClick={()=>(navigate('/dashboard/manageProducts'))} className="btn btn-primary mt-5">view all products</button>
        </h2>
      )}

      <div className="inventory-single-detail">
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <figure>
            <img
              className="inventory-single-img"
              src={product.img}
              alt="Album"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product.name}</h2>
            <p>{product.description}</p>
            <p>
              Price: <span className="font-bold">{product.price} per unit</span>
            </p>
            <p>
              Available Quantity:{" "}
              <span className="font-bold">{product.avlQuantity} unit</span>
            </p>
            <p>
              Minimum order Quantity:{" "}
              <span className="font-bold">{product.minQuantity} unit</span>
            </p>
          </div>
        </div>
      </div>

      {/* above codes are for the details of a single product */}
      {/* --------------------------------------------------- */}
      {/* below codes are for the address of the client */}
      {userInfo?.role !== "Admin" && (
        <div className="inventory-order-form">
          <h2 className="text-center text-3xl my-5">Order Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="my-10 inventory-order-form-top">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your name</span>
                </label>
                <input
                  defaultValue={name}
                  required
                  type="text"
                  placeholder="your full name"
                  className="input input-bordered input-inventory-order-form"
                  name="name"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product"s Quantity</span>
                </label>
                <input
                  required
                  type="number"
                  placeholder="input a quantity for your product"
                  className="input input-bordered input-inventory-order-form"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Phone No.</span>
                </label>
                <input
                  defaultValue={phn}
                  required
                  type="text"
                  placeholder="Your phone number"
                  className="input input-bordered input-inventory-order-form"
                  name="phn"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  value={email}
                  disabled
                  required
                  type="text"
                  placeholder="your email"
                  className="input input-bordered input-inventory-order-form"
                  name="email"
                />
              </div>
            </div>
            <div className="inventory-order-form-bottom">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Your Address (Please add all details like division,
                    district, locality, road no, house no, and other additional
                    information so the delivery person can easily find out the
                    exact location)
                  </span>
                </label>
                <textarea
                  required
                  type="text"
                  placeholder="your full address"
                  className="input input-bordered textarea-inventory-order-form"
                  defaultValue={address}
                  name="address"
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Inventory;
