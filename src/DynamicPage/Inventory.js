import React, { useEffect, useState } from "react";
import "./inventory.css";
import { useParams } from "react-router-dom";
import useUserInfo from "../hooks/useUserInfo";

const Inventory = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const { userInfo } = useUserInfo({});
  const { email, name, address, phn } = userInfo;
  useEffect(() => {
    fetch(`http://localhost:5000/tool/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [id]);

  return (
    <div>
      <h2 className="text-center text-3xl my-10">Order Product</h2>
      <div className="inventory-single-detail">
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <figure>
            <img className="inventory-single-img" src={data.img} alt="Album" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{data.name}</h2>
            <p>{data.description}</p>
            <p>
              Price: <span className="font-bold">{data.price} per unit</span>
            </p>
            <p>
              Available Quantity:{" "}
              <span className="font-bold">{data.avlQuantity} unit</span>
            </p>
            <p>
              Minimum order Quantity:{" "}
              <span className="font-bold">{data.minQuantity} unit</span>
            </p>
          </div>
        </div>
      </div>

      {/* above codes are for the details of a single product */}
      {/* --------------------------------------------------- */}
      {/* below codes are for the address of the client */}
      <div className="inventory-order-form">
        <h2 className="text-center text-3xl my-5">Order Form</h2>
        <div className="my-10 inventory-order-form-top">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Your name</span>
            </label>
            <input
              defaultValue={name}
              required
              type="text"
              placeholder="your full name"
              className="input input-bordered input-inventory-order-form"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Product"s Quantity</span>
            </label>
            <input
              required
              type="number"
              placeholder="input a quantity for your product"
              className="input input-bordered input-inventory-order-form"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Your Phone No.</span>
            </label>
            <input
              defaultValue={phn}
              required
              type="text"
              placeholder="Your phone number"
              className="input input-bordered input-inventory-order-form"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Your Email</span>
            </label>
            <input
              value={email}
              disabled
              required
              type="text"
              placeholder="your email"
              className="input input-bordered input-inventory-order-form"
            />
          </div>
        </div>
        <div className="inventory-order-form-bottom">
          <div class="form-control">
            <label class="label">
              <span class="label-text">
                Your Address (Please add all details like division, district,
                locality, road no, house no, and other additional information so
                the delivery person can easily find out the exact location)
              </span>
            </label>
            <textarea
              type="text"
              placeholder="your full address"
              className="input input-bordered textarea-inventory-order-form"
              defaultValue={address}
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
