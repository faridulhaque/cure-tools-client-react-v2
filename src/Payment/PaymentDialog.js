import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import { useDialog } from "react-st-modal";
import CheckOutForm from "./CheckOutForm";
import './Payment.css'
const stripePromise = loadStripe(
  "pk_test_51L3zbSHYptib3ECRXqn80aSoDZo6n2bun6iK9smVf009L6V8CO7ea4QY8K04fovPZtqTUIFBSnuTd8s5mM0cFs0p00etTdcWed"
);

const PaymentDialog = ({mo}) => {
    
  const dialog = useDialog();
  const data = {...mo, dialog}

  return (
    <div className="payment-dialog mt-10 ml-10">
      <Elements stripe={stripePromise}>
        <CheckOutForm data={data} ></CheckOutForm>
      </Elements>
    </div>
  );
};

export default PaymentDialog;
