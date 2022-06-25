import React from "react";
import "./Home.css";

const Banner = () => {
  return (
    <div>
      <div
        class="hero hero-main"
        style={{
          backgroundImage: "url(https://i.ibb.co/VxvZH7F/banner.png)",
        }}
      >
        <div class="hero-overlay"></div>
        <div class="hero-content text-center text-neutral-content">
          <div class="max-w-md">
            <h1 class="mb-5 text-5xl font-bold">Cure Tools</h1>
            <p class="mb-5">
              We have been providing medical equipments
              all over the state for twenty years!
            </p>
            <button class="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
