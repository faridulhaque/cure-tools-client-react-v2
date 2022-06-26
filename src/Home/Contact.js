import React from "react";

const Contact = () => {
  return (
    <div className='my-10' id='contact'>
      <div className="contact-main">
      <h2 className="text-4xl text-center text-primary my-5">
        Want To Say Something?
      </h2>
        <p className="contact-text">If you have any query or you want to give any feedback, please fill out the form below</p>
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name (Optional)</span>
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="input input-bordered"
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
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone Number (Optional)</span>
            </label>
            <input
              type="text"
              placeholder="Your phone number"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Message</span>
            </label>
            <textarea
            cl
              type="text"
              placeholder="Your message"
              className="input input-bordered contact-text-area"
            />
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
