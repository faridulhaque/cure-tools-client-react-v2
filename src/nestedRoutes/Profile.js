import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.init";
import Loading from "../Shared/Loading";
import "./NestedRoutes.css";
import { useForm } from "react-hook-form";
import useUserInfo from "../hooks/useUserInfo";

const Profile = () => {
  const {
    register,
    formState: { errors },

    handleSubmit,
  } = useForm();

  const [isEditing, setEditing] = useState(false);
  const { userInfo, loading } = useUserInfo();

  const { email, name, img, address, phn } = userInfo;

  // getting data for profile page

  // updating data for profile page
  const onSubmit = async (data) => {
    // updating image
    const formData = new FormData();

    formData.append("img", data.img[0]);

    fetch(
      "https://api.imgbb.com/1/upload?key=778aabdeab4b1469f4ccd5b8085229fb",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(data);
      });
    // updating-image related code ended
    sendingProfileData(data);
    setEditing(false);
  };
  const sendingProfileData = (data) => {
    const updatedData = data;
    fetch(`http://localhost:5000/profile/${email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json)
      .then((data) => {});
  };

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="nested-route-wrapper">
      <h1 className="text-center text-4xl text-primary my-5">{name}</h1>
      {!isEditing && (
        <div className="card card-side bg-base-100 shadow-xl profile-container">
          <figure>
            <img
              style={{ width: "200px", height: "250px" }}
              src={img}
              alt="profile-pic"
            />
          </figure>
          <div className="card-body">
            <ul className="text-primary profile-item-list">
              <li className="align-center profile-item">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <span className="profile-item-name">{email}</span>
              </li>
              <li className="profile-item">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </span>
                <span className="profile-item-name">
                  {phn ? phn : "Not available"}
                </span>
              </li>
              <li className="profile-item">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>
                <span className="profile-item-name">
                  {address ? address : "Not available"}
                </span>
              </li>
            </ul>
            <div className="card-actions justify-end">
              <button
                onClick={() => setEditing(true)}
                className="btn btn-primary"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}
      {isEditing && (
        <div className="nested-route-wrapper-editing">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                defaultValue={name}
                type="text"
                placeholder="Your name"
                className="input input-bordered"
                {...register("name", {
                  required: {
                    value: false,
                  },
                })}
              />
            </div>
            <div className="form-control">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                htmlFor="file_input"
              >
                Upload Image
              </label>
              <input
                className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                type="file"
                {...register("img", {})}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                defaultValue={phn}
                type="text"
                placeholder="Your phone number"
                className="input input-bordered"
                {...register("phn", {
                  required: {
                    value: false,
                  },
                })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Your Full Address (Please add all details like division,
                  district, locality, road no, house no, and other additional
                  information so the delivery person can easily find out the
                  exact location)
                </span>
              </label>
              <textarea
                defaultValue={address}
                type="text"
                placeholder="Your Full Address"
                className="input input-bordered contact-text-area"
                {...register("address", {
                  required: {
                    value: false,
                  },
                })}
              />
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
