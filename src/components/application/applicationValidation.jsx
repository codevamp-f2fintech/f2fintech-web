import * as yup from "yup";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const applicationValidation = yup.object().shape({
  name: yup
    .string()
    .min(2, "Firstname is Too Short!")
    .max(20, "Firstname is Too Long!")
    .required("This Field is Required"),
  number: yup
  
    .string()
    .matches(phoneRegExp, "Phone Number Is Not Valid")
    .required("This Field is Required"),
  email: yup
    .string()
    .matches(emailRegExp, "Email Address is Not Valid")
    .required("This Field is Required"),
  pincode1: yup.string().required("This Field is Required"),
  pan: yup.string().required("This Field is Required"),
  gst: yup.string().required("This Field is Required"),
  company_name: yup.string().required("This Field is Required"),
  entity_type: yup.string().required("This Field is Required"),
  bank_account_type: yup.string().required("This Field is Required"),
  industry_type: yup.string().required("This Field is Required"),
  sub_industry_type: yup.string().required("This Field is Required"),
});

export default applicationValidation;
