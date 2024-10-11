import * as yup from "yup";
import { subYears } from "date-fns"; // To handle date calculations

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const step1ValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Firstname is Too Short!")
    .max(20, "Firstname is Too Long!")
    .matches(/^[a-zA-Z\s]+$/, "Name should only contain letters")
    .required("This Field is Required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Contact Number Is Not Valid")
    .required("Contact Number is required"),
  email: yup
    .string()
    .matches(emailRegExp, "Email Address is Not Valid")
    .required("This Field is Required"),
  pan: yup
    .string()
    .matches(
      /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      "PAN must be exactly 10 characters: first 5 letters in uppercase followed by 4 digits and 1 letter."
    )
    .required("This Field is required"),
  city: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, "City name should only contain letters")
    .min(3, "City name is too short")
    .max(30, "City name is too long")
    .required("City name is required"),
  occupation_type: yup.string().required("This Field is required"),
  dob: yup
    .date()
    .nullable()
    .typeError("Invalid date")
    // Custom validation for future or present date
    .test("not-future", "Invalid age", (value) => {
      return value ? value < new Date() : true;
    })
    // Age should not be less than 20 years
    .max(
      subYears(new Date(), 20),
      "You are under age to apply. Minimum age should be 20"
    )
    .required("Date of birth is required"),
});

export default step1ValidationSchema;
