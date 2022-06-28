import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Banner = () => {
  return (
    <div>
      <div
        className="hero hero-main min-h-screen"
        style={{
          backgroundImage: "url(https://i.ibb.co/VxvZH7F/banner.png)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Cure Tools</h1>
            <p className="mb-5">
              We have been providing medical equipments
              all over the state for twenty years!
            </p>
            <Link to='/signUp' className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
