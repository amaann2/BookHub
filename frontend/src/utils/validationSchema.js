import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(8).required("please enter your passwod"),
});

export const registerSchema = Yup.object({
  firstName: Yup.string().required("Please enter First Name"),
  lastName: Yup.string().required("Please enter Last Name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(8).required("please enter your passwod"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password are not the same"
  ),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string().email().required("please enter your email"),
});

export const resetPasswordSchema = Yup.object({
  password: Yup.string().min(8).required("please enter your passwod"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password are not the same"
  ),
});

export const updatePasswordSchema = Yup.object({
  currentPassword: Yup.string()
    .min(8)
    .required("please enter your current passwod"),
  password: Yup.string().min(8).required("please enter your passwod"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password are not the same"
  ),
});
