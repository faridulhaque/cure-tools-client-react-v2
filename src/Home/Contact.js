import React from "react";
import { useForm } from "react-hook-form";
import "./Home.css";

const Contact = () => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="my-10" id="contact">
      <div className="contact-main">
        <h2 className="text-4xl text-center text-primary my-5">
          Want To Say Something?
        </h2>
        <p className="contact-text">
          If you have any query or you want to give any feedback, please fill
          out the form below
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name (Optional)</span>
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="input input-bordered"
              {...register("name", {
                required: {
                  value: false,
                }
              })}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email (Required)</span>
            </label>
            <input
              type="email"
              placeholder="Your email"
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
            {errors.email?.type === "required" && "Email is required"}
          </small>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone Number (Optional)</span>
            </label>
            <input
              type="text"
              placeholder="Your phone number"
              className="input input-bordered"
              {...register("phn", {
                required: {
                  value: false,
                }
              })}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Message</span>
            </label>
            <textarea
              
              type="text"
              placeholder="Your message"
              className="input input-bordered contact-text-area"
              {...register("text", {
                required: {
                  value: true,
                },
              })}
            />
          </div>
          <small className="text-danger">
            {errors.text?.type === "required" &&
              "This field must have some text"}
          </small>

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
