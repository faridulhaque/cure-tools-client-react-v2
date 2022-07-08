import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import { useDialog } from "react-st-modal";
const stripePromise = loadStripe('pk_test_51L3zbSHYptib3ECRXqn80aSoDZo6n2bun6iK9smVf009L6V8CO7ea4QY8K04fovPZtqTUIFBSnuTd8s5mM0cFs0p00etTdcWed');

const CustomDialogContent = () => {
  const dialog = useDialog();

  const [value, setValue] = useState();
  return (
    <div className="custom-dialog mt-10 ml-10">
      <input
        className="input input-bordered w-full max-w-xs"
        type="text"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />

      <br />

      <button
        className="btn btn-success text-white ml-10"
        onClick={() => {
          dialog.close(value);
        }}
      >
        Pay Now
      </button>
    </div>
  );
};

export default CustomDialogContent;
