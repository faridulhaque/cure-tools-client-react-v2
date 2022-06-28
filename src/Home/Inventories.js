import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInventories } from "../hooks/useInventories";
import "./Home.css";

const Inventories = () => {
  // const [inventories, setInventories] = useState([]);
  const navigate = useNavigate()
  const {inventories} = useInventories();

  // useEffect(() => {
  //   fetch("http://localhost:5000/tools")
  //     .then((res) => res.json())
  //     .then((data) => setInventories(data));
  // }, []);
  return (
    <div className="" id="inventories">
      <h1 className="text-primary text-center text-4xl my-10">Inventories</h1>
      <div className="cards-group">
        {inventories.slice(0, 6).map((inventory) => (
          <div key={inventory._id} className="inventory-card text-white">
            <div>
              <h2 className="text-center font-bold text-white py-5">
                {inventory.name}
              </h2>
            </div>
            <div className="inventory-image-container">
              <img className="inventory-img" src={inventory.img} alt="tool" />
              <button
                onClick={() =>(navigate(`/home/${inventory._id}`))}
                className="inventory-button tooltip tooltip-bottom"
                data-tip="Order"
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
            <div className="mt-4">
              <p className="mt-3 text-center font-bold">Price</p>
              <p className="text-center">$ {inventory.price}</p>
              <p className="mt-3 text-center font-bold">Available Quantity</p>
              <p className="text-center">
                {inventory.avlQuantity} <sub>unit</sub>
              </p>
              <p className="mt-3 text-center font-bold">
                Minimum Order Quantity
              </p>
              <p className="text-center">
                {inventory.minQuantity} <sub>unit</sub>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventories;
