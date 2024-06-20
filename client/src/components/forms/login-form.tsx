/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* ts-nocheck */
// @ts-nocheck

import React from "react";
import { Link } from "react-router-dom";
import CheckBox from "../reusable/check-box";
import { registerValidationSchema } from "../../schema";
import Form from "./form";
import { useLoginUser } from "../../hooks";

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
  const [loading, handleLogin] = useLoginUser();

  const handleSubmit = async (values: any, resetForm: any) => {
    console.log(values);
    const res = await handleLogin(values);
    if (res) {
      resetForm();
    }
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      initialFieldValues={fieldList}
      initialValues={initialFieldValues}
      validationSchema={registerValidationSchema}
      isDisabledFormFirstForm={false}
      isDisabled={false}
      disableAutoComplete
      typeForm="login"
      otherDetails={
        <>
          <div className="flex items-center justify-between">
            <CheckBox id="rememberme" label="Remeber me" />
            <a
              href="#"
              className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Sign in
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <Link
              to="/signup"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign up
            </Link>
          </p>
        </>
      }
    />
  );
}
