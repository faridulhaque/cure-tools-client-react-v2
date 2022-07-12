import React from "react";
import error from "../assets/error.png";

const NoFound = () => {
  return (
    <div>
      <div>
        <img
          style={{ width: "100%", height: "100vh" }}
          src={error}
          alt="error"
        ></img>
      </div>
    </div>
  );
};

export default NoFound;
