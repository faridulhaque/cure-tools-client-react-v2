import React, { useState } from "react";
import "./entry.css";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.init";
import useToken from "../hooks/useToken";
import Loading from "../Shared/Loading";
import { Alert, Prompt } from "react-st-modal";
import { sendPasswordResetEmail } from "firebase/auth";

const SignIn = () => {
  const [viewPassword, setViewPassword] = useState(true);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);

    reset();
  };
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [token] = useToken(user || gUser);

  if (loading || gLoading) {
    return <Loading></Loading>;
  }
  if (error) {
  }
  if (token) {
    navigate(from, { replace: true });
  }

  const handleForgotPassword = async () => {
    const email = await Prompt("Please input your registerer email", {
      isRequired: true,
    });

    if (/\S+@\S+\.\S+/.test(email)) {
      await sendPasswordResetEmail(auth, email)
        .then(() => {})
        .catch((error) => {});
      await Alert(
        `A verification email has been sent to ${email}`,
        "Verification email sent"
      );
    } else {
      await Alert("Please input a valid email address", "Invalid email");
    }
  };
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
                Sign In to continue!
              </h1>

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
                  {!viewPassword ? (
                    <svg
                      style={{ cursor: "pointer" }}
                      onClick={() => setViewPassword(!viewPassword)}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="rgb(39,50,84)"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      style={{ cursor: "pointer" }}
                      onClick={() => setViewPassword(!viewPassword)}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="rgb(39,50,84)"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </label>
                <input
                  type={viewPassword ? "password" : "text"}
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
              <label className="label">
                <small style={{ color: "black" }}>
                  Not a member?{" "}
                  <Link className="entry-link" to="/signUp">
                    Click Here!
                  </Link>{" "}
                </small>
                <small>
                  <button
                    onClick={handleForgotPassword}
                    type="button"
                    className="text-primary"
                  >
                    Forgot Password?
                  </button>
                </small>
              </label>

              <br />
              {error && (
                <small className="text-red-500">
                  {error.message.includes("auth/wrong-password") &&
                    "Incorrect password"}
                </small>
              )}
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Sign In
                </button>
              </div>
              <div className="form-control mt-6">
                <button
                  onClick={() => signInWithGoogle()}
                  type="button"
                  className="btn btn-primary btn-outline"
                >
                  Sign In With Google
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
