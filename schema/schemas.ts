import { number, object, string } from 'yup';


export const userSchema = object().shape({
  username: string().min(6, "username must be atleast 6 characters").required("username is required"),
  email: string().email().required("email is required"),
  password: string().required("password is required").min(6, "password must be atleast 6 characters")
});

export const contactSchema = object().shape({
  name: string().required("name is required"),
  email: string().email().required("email is required"),
  contact: string()
    .typeError("Phone number must be a string")
    .matches(/^\d+$/, "invalid phone number")
    .required("phone number is required")
    .min(10, "phone number must be at least 10 digits")
    .max(13, "phone number cannot exceed 13 digits"),
  message: string().required("message is required")
});

export const orderSchema = object().shape({
  name: string().required("name is required"),
  contact: string()
    .typeError("Phone number must be a string")
    .matches(/^\d+$/, "invalid phone number")
    .required("phone number is required")
    .min(10, "phone number must be at least 10 digits")
    .max(13, "phone number cannot exceed 13 digits"),
  address: string().required("address is required"),
  city: string().required("city is required"),
  province: string().required("province is required"),
  postalCode: string()
  .typeError("Phone number must be a string")
  .matches(/^\d+$/, "invalid phone number")
  .required("phone number is required")
  .length(5, "invalid postal code"),
  instructions: string()
});

export const productSchema = object().shape({
  title: string().required("title is required"),
  description: string().required("description is required"),
  category: string().required("category is required"),
  image: string().required("image url is required")
});