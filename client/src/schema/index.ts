import * as yup from "yup";

const field = {
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required."),
  // .min(8, 'Password is too short - should be 8 chars minimum.'),
  // .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
};

export const loginValidationSchema = yup.object({
  email: field.email,
  password: field.password,
});

export const registerValidationSchema = yup.object({
  firstName: yup
    .string()
    .min(3, "first name should be of minimum 3 characters length")
    .required("first anme is required"),
  lastName: yup
    .string()
    .min(3, "last name should be of minimum 3 characters length")
    .required("first anme is required"),
  email: field.email,
  password: field.password,
});
