import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Confirm } from "react-st-modal";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://cure-tools.up.railway.app/products", {
      headers: {
        authorization: `Bearer: ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [products]);
  const handleDelete = async (id) => {
    const result = await Confirm(
      "You can't undo this action.",
      "Are you sure?"
    );

    if (result) {
      const url = `https://cure-tools.up.railway.app/tool/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success("Successfully deleted!", { id: "deleteItem" });
        });
    }
  };
  return (
    <div>
      <h1 className="text-center text-4xl text-primary mb-5">
        Manage Products
      </h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th scope="col">Product Name</th>
              <th scope="col">Available Quantity</th>
              <th scope="col">Price (per Unit)</th>
              <th scope="col" className="text-center">
                Manage
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.avlQuantity}</td>
                <td>{product.price}</td>

                <td className="text-center">
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn text-white btn-primary"
                  >
                    Remove
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

export default ManageProducts;
