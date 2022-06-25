import React from "react";

const Specialty = () => {
  return (
    <div className="specialty mt-10">
      <div className="specialty-card">
        
        <h2 className="text-3xl text-center text-primary mb-5">Delivery</h2>
        <p className="text-center">We delivery your products within 48 hours</p>
      </div>
      <div className="specialty-card">
        <h2 className="text-3xl text-center text-primary mb-5">Support</h2>
        <p className="text-center">
          Call 12111 for any query from 9 am to 6 pm
        </p>
      </div>
      <div className="specialty-card">
        <h2 className="text-3xl text-center text-primary mb-5">Return</h2>
        <p className="text-center">Return the products within a week</p>
      </div>
      <div className="specialty-card">
        <h2 className="text-3xl text-center text-primary mb-5">Exchange</h2>
        <p className="text-center">Exchange offer is available for anytime</p>
      </div>
    </div>
  );
};

export default Specialty;
