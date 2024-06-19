/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* ts-nocheck */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { Link } from "react-router-dom";

import { registerValidationSchema } from "../../schema";
import CheckBox from "../reusable/check-box";
import Form from "./form";
import { useSignUpuser } from "../../hooks";

const initialFieldValues = {
  firstName: "",
  lastName: "",
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
    name: FieldNames.firstName,
    type: "text",
    label: "First Name",
    inputType: "textfield",
    placeholder: "first name",
  },
  {
    name: FieldNames.lastName,
    type: "text",
    label: "First Name",
    inputType: "textfield",
    placeholder: "last name",
  },
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
export default function SignUpForm() {
  const [isLoading, handleRegister] = useSignUpuser();

  const handleSubmit = async (values: any, resetForm: any) => {
    console.log("values", values);
    const res = await handleRegister(values);
    if (res) {
      resetForm();
    }
  };
  return (
    <>
      <div className="">
        <Form
          handleSubmit={handleSubmit}
          initialFieldValues={fieldList}
          initialValues={initialFieldValues}
          validationSchema={registerValidationSchema}
          isDisabledFormFirstForm={false}
          isDisabled={false}
          disableAutoComplete
          typeForm="signup"
          otherDetails={
            <>
              <div className="flex items-center h-5">
                <CheckBox id="terms" label="terms" />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="terms"
                  className="font-light text-gray-500 dark:text-gray-300"
                >
                  I accept the{" "}
                  <a
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    href="#"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </>
          }
        />
      </div>
    </>
  );
}
