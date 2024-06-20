/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* ts-nocheck */
// @ts-nocheck

import React, { Fragment } from "react";
import { useFormik } from "formik";
import { loginValidationSchema, registerValidationSchema } from "../../schema";
import { TextField } from "../../components/input";
import { useHandleverify } from "../../hooks";
type FieldPropsTypes<K extends keyof AllowedMapValuesType> = {
  name: keyof AllowedMapValuesType[K];
  type: string;
  label: string;
  inputType: string;
};

const fieldList = [
  {
    name: "firstName",
    type: "text",
    label: "First Name",
    inputType: "textfield",
    placeholder: "first name",
  },
  {
    name: "lastName",
    type: "text",
    label: "First Name",
    inputType: "textfield",
    placeholder: "last name",
  },
  {
    name: "username",
    type: "text",
    label: "Username",
    inputType: "textfield",
    placeholder: "username",
  },
  {
    name: "email",
    type: "text",
    label: "Email",
    inputType: "textfield",
    placeholder: "name@company.com",
  },

  {
    name: "password",
    type: "password",
    label: "Password",
    inputType: "textfield",
  },
];

type AllowedMapValuesType = {
  signup: typeof initialSignUpValues;
  login: typeof initialSignInValues;
};

const initialSignUpValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
};

const initialSignInValues = {
  email: "",
  password: "",
};

type FormPropsObjectType<K extends keyof AllowedMapValuesType> = {
  signup: {
    initialValues: AllowedMapValuesType[K];
    handleSubmit: (values: any, resetForm: any) => void;
    initialFieldValues: any[];
    validationSchema: typeof registerValidationSchema;
    isDisabledFormFirstForm: boolean;
    isDisabled: boolean;
    disableAutoComplete: boolean;
    typeForm: K;
    otherDetails: React.ReactNode | null;
  };
  login: {
    initialValues: AllowedMapValuesType[K];
    handleSubmit: (values: any, resetForm: any) => void;
    initialFieldValues: any[];
    validationSchema: typeof loginValidationSchema;
    isDisabledFormFirstForm: boolean;
    isDisabled: boolean;
    disableAutoComplete: boolean;
    typeForm: K;
    otherDetails: React.ReactNode | null;
  };
};

export default function Form<K extends keyof FormPropsObjectType<K>>({
  handleSubmit,
  initialFieldValues,
  initialValues,
  validationSchema,
  isDisabled,
  isDisabledFormFirstForm,
  disableAutoComplete,
  typeForm,
  otherDetails = null,
}: FormPropsObjectType<K>[K]) {
  const [loading, confirmed, errorVer, handleUpdateText] = useHandleverify();

  const hnadleVerifyFunction = (value: string, type: string) => {
    handleUpdateText({ value, type });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values, resetForm);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 gap-6">
        {initialFieldValues.map((f) => (
          <Fragment key={f.name}>
            {f.inputType === "textfield" && (
              <div className="col-span-1" key={f.name}>
                <>
                  <TextField
                    name={f.name}
                    type={f.type}
                    label={f.label}
                    value={formik.values?.[f.name]}
                    handleChange={(e) => {
                      if (f.name === "email") {
                        if (!formik.errors?.[f.name]) {
                          hnadleVerifyFunction(e.target.value, f.name);
                        }
                        formik.handleChange(e);
                      } else {
                        formik.handleChange(e);
                      }
                    }}
                    touched={formik.touched?.[f.name]}
                    error={
                      formik.errors?.[f.name] ||
                      f.name === "email" ||
                      f.name === "username"
                        ? errorVer
                        : null
                    }
                    handleBlur={formik.handleBlur}
                    placeholder={f.label}
                    disabled={isDisabled || isDisabledFormFirstForm}
                    disableAutoComplete={disableAutoComplete}
                    isfetching={loading}
                    confirmed={confirmed}
                    typeForm={typeForm}
                  />
                </>
              </div>
            )}
          </Fragment>
        ))}
        {otherDetails}
      </div>
    </form>
  );
}
