import * as yup from "yup";
import "yup-phone";
export const validateUserInfo = yup.object().shape({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  username: yup.string().required(),
});
export const validateBio = yup.object().shape({
  email: yup.string().required().email(),
  phone: yup.string().phone().required(),
  date_of_birth: yup.date().required(),
});
export const validateAddress = yup.object().shape({
  country: yup.string().required(),
  state: yup.string().required(),
  city: yup.string().required(),
});
export const validationPasswordSchema = yup.object({
  gender: yup.string().required(),
  password: yup.string().required("Password is required"),
  password2: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

// password: yup.required('Password is required'),
// password2: yup.ref('password')

export const LoginUserSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required("Password is required"),
});
export const ForgetPasswordSchema = yup.object({
  email: yup.string().required().email(),
});

export const createPostSchema = yup.object({
  description: yup.string(),
  visibility: yup.string(),
  myId: yup.string(),
  // img: yup.array().yup.mixed()
});
export const addCommentSchema = yup.object({
  comment: yup.string().required(),
});

export const validateChangePassword = yup.object({
  oldpassword: yup.string().required(),
  password: yup.string().required("Password is required"),
  password2: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
