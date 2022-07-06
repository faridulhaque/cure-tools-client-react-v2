import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.init";
import "./entry.css";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import Loading from "../Shared/Loading";
import useToken from "../hooks/useToken";

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const name = data.name;
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({
      displayName: name,
      photoURL: "https://i.ibb.co/6YK1cXs/avatar.jpg",
    });
    reset();
  };
  const navigate = useNavigate();
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const [token] = useToken(user || gUser);

  if (loading || gLoading || updating) {
    return <Loading></Loading>;
  }
  if (token) {
    navigate("/");
  }
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: "url(https://i.ibb.co/VxvZH7F/banner.png)" }}
      >
        <div className="hero-content text-neutral-content">
          <form className="form-entry" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group-entry">
              <h1 className="text-4xl text-center text-primary mb-5">
                Sign Up Now!
              </h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  placeholder="your full name"
                  className="input input-bordered"
                  {...register("name", {
                    required: {
                      value: true,
                    },
                  })}
                />
              </div>
              <small className="text-danger">
                {errors.name?.type === "required" && "Name is required"}
              </small>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  placeholder="your email"
                  className="input input-bordered"
                  {...register("email", {
                    required: {
                      value: true,
                    },
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                    },
                  })}
                />
              </div>
              <small className="text-danger">
                {(errors.email?.type === "required" && "Email is required") ||
                  (errors.email?.type === "minLength" &&
                    "password must be at least 8 characters")}
              </small>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="****************"
                  className="input input-bordered"
                  {...register("password", {
                    required: {
                      value: true,
                    },
                    minLength: {
                      value: "8",
                    },
                  })}
                />
              </div>
              <small className="text-danger">
                {(errors.password?.type === "required" &&
                  "Password is required") ||
                  (errors.password?.type === "minLength" &&
                    "password must be at least 8 characters")}
              </small>
              <br />
              <small style={{ color: "black" }}>
                Already have an account?{" "}
                <Link className="entry-link" to="/signIn">
                  Click Here!
                </Link>{" "}
              </small>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              </div>
              <div className="form-control mt-6">
                <button
                  type="button"
                  onClick={() => signInWithGoogle()}
                  className="btn btn-primary btn-outline"
                >
                  Sign Up With Google
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
