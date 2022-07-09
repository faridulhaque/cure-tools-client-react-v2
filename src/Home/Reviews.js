import React, { useEffect, useState } from "react";


import SingleReview from "./SingleReview";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
 

  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, [reviews]);
  return (
    <>
      <h2 className="text-4xl text-center text-primary mt-10">
        Our Clients' opinions
      </h2>
      <div id="reviews" className="reviews-wrapper my-10">
        {reviews.map((review) => (
          <SingleReview key={review._id} review={review}></SingleReview>
        ))}
      </div>
    </>
  );
};

export default Reviews;
