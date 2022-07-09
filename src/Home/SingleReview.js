import React from "react";
import ReactStars from "react-rating-stars-component";
import useAllUsers from "../hooks/useAllUsers";
import useUserInfo from "../hooks/useUserInfo";

const SingleReview = ({ review }) => {
  const { avatar } = useUserInfo();
  const { users } = useAllUsers();
  const reviewer = users.find((user) => user?.email === review?.email);
  const image = reviewer?.profilePic
    ? reviewer?.profilePic
    : reviewer?.primaryPic || avatar;
  const name = reviewer?.profileName
    ? reviewer?.profileName
    : reviewer?.primaryName;

  return (
    <div className="review-card">
      <div className="info-reviews">
        <div className="name-img-wrapper-reviews">
          <img className="review-img" src={image} alt="" />
          <span className="user-name-review">
            {" "}
            <b>{name}</b>
          </span>
        </div>
        <div>
          <span>
            <ReactStars
              count={5}
              value={review.ratingStar}
              edit={false}
              size={20}
              activeColor="#ffd700"
            />
          </span>
        </div>
      </div>
      <div className="comment-reviews">
        <p>{review.ratingText}</p>
      </div>
    </div>
  );
};

export default SingleReview;
