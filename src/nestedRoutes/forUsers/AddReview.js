import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactStars from "react-rating-stars-component";
import { Alert } from "react-st-modal";
import useUserInfo from "../../hooks/useUserInfo";
import Loading from "../../Shared/Loading";
import "../NestedRoutes.css";

const AddReview = () => {
  const { userInfo, loading, avatar } = useUserInfo(0);
  const { profileName, primaryName, email, profilePic, primaryPic } = userInfo;
  const name = profileName ? profileName : primaryName;
  const img = profilePic ? profilePic : primaryPic || avatar;

  const [ratingStar, setRatingStar] = useState(0);
  const [ratingInfo, setRatingInfo] = useState({});
  const [isEditing, setEditing] = useState(false);

  //   getting review data to show in the page

  useEffect(() => {
    fetch(`https://cure-tools.up.railway.app/myReview/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setRatingInfo(data);
      });
  }, [email, ratingInfo]);

  const handleRatingStar = (newRating) => {
    setRatingStar(newRating);
  };

  //   sending updated review to server
  const handleReview = async (e) => {
    e.preventDefault();
    const ratingText = e.target.ratingText.value;
    const reviewData = {
      email,
      name,
      img,
      ratingStar,
      ratingText,
    };

    if (ratingStar === 0) {
      await Alert(
        "Select any of the stars to give rating. If they look selected please select again. ",
        "Rate with the stars!"
      );
    } else if (ratingText === "") {
      await Alert(
        "Please write something in the box",
        "Don't leave the box empty!"
      );
    } else if(ratingText.length >= 101){
      await Alert("Keep your text below 100 characters!", "your text is too long!")
    }
     else {
      fetch(`https://cure-tools.up.railway.app/myReview/${email}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(reviewData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            setTimeout(() => {
              setEditing(false);
              toast.success("Successfully added!", { id: "review" });
            }, 1000);
          }
        });
    }
  };
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <>
      {!ratingInfo._id && !isEditing && (
        <>
          <h1 className="text-center text-primary text-3xl">Add a Review</h1>
          <form onSubmit={handleReview} className="rating-wrapper">
            <div className="card w-96 bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <textarea
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs text-area-review"
                  name="ratingText"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title mb-3">
                  {" "}
                  <ReactStars
                    count={5}
                    value={0}
                    onChange={handleRatingStar}
                    size={25}
                    activeColor="#ffd700"
                  />
                </h2>

                <div className="card-actions">
                  <button className="btn btn-primary">Submit</button>
                </div>
              </div>
            </div>
          </form>
        </>
      )}

      {isEditing && ratingInfo._id && (
        <>
          <h1 className="text-center text-primary text-3xl">
            Edit your review!
          </h1>
          <p className="text-center text-primary text-1xl">as {name}</p>
          <form onSubmit={handleReview} className="rating-wrapper">
            <div className="card w-96 bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <textarea
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs text-area-review"
                  name="ratingText"
                  defaultValue={ratingInfo.ratingText}
                />
              </figure>

              <div className="card-body items-center text-center">
                <h2 className="card-title mb-3">
                  {" "}
                  <ReactStars
                    count={5}
                    value={0}
                    onChange={handleRatingStar}
                    size={25}
                    activeColor="#ffd700"
                  />
                </h2>

                <div className="card-actions">
                  <button type="submit" className="btn btn-primary">
                    Add new review
                  </button>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
      {!isEditing && ratingInfo._id && (
        <>
          <h1 className="text-center text-primary text-3xl">
            You have added a review already!
          </h1>
          <p className="text-center text-primary text-1xl">as {name}</p>
          <div className="rating-wrapper">
            <div className="card w-96 bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <img src={img} alt="avatar" className="img-review" />
              </figure>
              <p className="text-center text-primary">
                {ratingInfo.ratingText}
              </p>
              <div className="card-body items-center text-center">
                <h2 className="card-title mb-3">
                  <ReactStars
                    count={5}
                    value={ratingInfo.ratingStar}
                    edit={false}
                    size={25}
                    activeColor="#ffd700"
                  />
                </h2>

                <div className="card-actions">
                  <button
                    onClick={() => setEditing(true)}
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddReview;
