/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* ts-nocheck */
// @ts-nocheck

import React from "react";

import { registerValidationSchema } from "../../schema";
import Form from "./form";

const initialFieldValues = {
  email: "",
  password: "",
};

enum FieldNames {
  firstName = "firstName",
  lastName = "lastName",
  username = "username",
  email = "email",
  password = "password",
}

const fieldList = [
  {
    name: FieldNames.email,
    type: "text",
    label: "Email",
    inputType: "textfield",
    placeholder: "name@company.com",
  },

  {
    name: FieldNames.password,
    type: "password",
    label: "Password",
    inputType: "textfield",
  },
];
export default function LoginForm() {
  // const [showReferralInput, setShowReferralInput] = useState(false);

  // const [isLoading, isLoaded, userDetails, phoneOTPRef, checkRegisterDetails] =
  // useCheckRegisterDetails();
  return (
    <Form
      handleSubmit={(values: any, resetForm: any) => {}}
      initialFieldValues={fieldList}
      initialValues={initialFieldValues}
      validationSchema={registerValidationSchema}
      isDisabledFormFirstForm={false}
      isDisabled={false}
      disableAutoComplete
      typeForm="signup"
      otherDetails={null}
    />
  );
}
