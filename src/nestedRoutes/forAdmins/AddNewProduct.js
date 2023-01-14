import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Alert } from "react-st-modal";
import useUserInfo from "../../hooks/useUserInfo";
import Loading from "../../Shared/Loading";
import "../NestedRoutes.css";

const AddNewProduct = () => {
  const { userInfo } = useUserInfo();
  const { email, loading } = userInfo;

  const [minQuantity, setMinQuantity] = useState(0);
  const [avlQuantity, setAvlQuantity] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const price = e.target.price.value;
    const img = e.target.img.value;
    const name = e.target.name.value;
    const description = e.target.description.value;
    if (!img.includes("http")) {
      Alert("Invalid image URL", "error!");
    }

    if (price <= 0) {
      return Alert("Price must be a positive number", "Error!");
    }
    if (avlQuantity <= 0) {
      return Alert("Input a positive number for product quantity", "Error!");
    }
    if (minQuantity > avlQuantity || minQuantity <= 0) {
      return Alert(
        "Minimum quantity must be a positive number as well as smaller than the product quantity",
        "Invalid Minimum Quantity"
      );
    }

    const data = {
      email,
      name,
      price,
      img,
      avlQuantity,
      minQuantity,
      description,
    };
    addingNewProduct(data);
  };
  const addingNewProduct = (data) => {
    console.log(data);
    fetch("https://cure-tools.up.railway.app/tools", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Product added successfully", { id: "new product" });
          setTimeout(() => {
            window.location.reload(false);
          }, 1000);
        }
      });
  };
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="addProduct-form">
      <h1 className="text-center text-4xl text-primary mb-5">Add a Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="my-10 addProduct-form-top">
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
              className="input input-bordered input-addProduct-form"
              name="email"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Name</span>
            </label>
            <input
              required
              type="text"
              placeholder="Product's name"
              className="input input-bordered input-addProduct-form"
              name="name"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              required
              type="number"
              placeholder="Add a price"
              className="input input-bordered input-addProduct-form"
              name="price"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Image</span>
            </label>
            <input
              required
              type="text"
              placeholder="Add a image URL"
              className="input input-bordered input-addProduct-form"
              name="img"
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
              className="input input-bordered input-addProduct-form"
              onChange={(e) => setAvlQuantity(parseInt(e.target.value))}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Minimum Quantity</span>
            </label>
            <input
              required
              type="number"
              placeholder="Input minimum quantity to order"
              className="input input-bordered input-addProduct-form"
              onChange={(e) => setMinQuantity(parseInt(e.target.value))}
            />
          </div>
        </div>
        <div className="addProduct-form-bottom">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Short Description</span>
            </label>
            <textarea
              required
              type="text"
              placeholder="Add a description of your product"
              className="input input-bordered textarea-addProduct-form"
              name="description"
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
  );
};

export default AddNewProduct;
