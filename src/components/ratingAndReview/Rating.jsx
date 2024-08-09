import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { Box, Typography, Button, TextField, Rating } from "@mui/material";
import { Formik, Form } from "formik";
import Toast from "../toast/Toast";
import { Utility } from "../utility";
import { RatingRevAPI } from "../../apis/RatingRevAPI";

const RatingReview = () => {
  const [rating, setRating] = useState(0);
  const toastInfo = useSelector((state) => state.toastInfo);

  const dispatch = useDispatch();
  const { toastAndNavigate, getLocalStorage } = Utility();
  const customer = getLocalStorage("customerInfo");

  const initialValues = {
    comment: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    const ratingData = {
      rating: rating,
      review: values.comment,
      customer_id: customer.id,
    };
    RatingRevAPI.createRating(ratingData).then((response) => {
      console.log("response", response);
      toastAndNavigate(dispatch, true, "success", "Review Submitted");
    });

    setRating(0);
    resetForm();
  };

  return (
    <Box
      sx={{
        backgroundImage: "url('ratingthum1.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "6vh",
        borderRadius: "30px",
        margin: "40px auto",
        maxWidth: "97%",
        transition: "transform 0.3s ease",
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;",
        },
      }}
    >
      <Typography
        sx={{
          fontSize: "2.5rem",
          textShadow: "1px 1px 2px gray",
          fontFamily: "cursive",
          fontWeight: "500",
        }}
        gutterBottom
      >
        Rating and Review
      </Typography>
      <Typography
        sx={{
          fontSize: "1.2rem",
          color: "white",
          fontWeight: "500",
          textShadow: "1px 1px 2px gray",
        }}
        gutterBottom
      >
        How are you feeling?
      </Typography>
      <Typography
        sx={{
          fontSize: "1.2rem",
          fontWeight: "400",
          textShadow: "1px 1px 2px gray",
          marginTop: "2vh",
        }}
        gutterBottom
      >
        Your input is valuable in helping us better understand your needs and
        tailor our service accordingly.
      </Typography>
      <Box display="flex" justifyContent="center" my={2}>
        <Rating
          sx={{ fontSize: "3rem" }}
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
      </Box>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          values,
          setErrors,
        }) => (
          <Form
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <TextField
              name="comment"
              label="Add a Comment.."
              variant="outlined"
              value={values.comment}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              sx={{
                width: "30vw",
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "lightgray", // Set background color to white
                  borderRadius: "15px", // Customize border radius
                  "& fieldset": {
                    borderColor: "lightgray", // Default border color
                    borderRadius: "15px", // Ensure border radius applies to fieldset as well
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "lightgray", // Border color on focus
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "black", // Default label color
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "black", // Label color on focus
                },
              }}
              InputLabelProps={{
                sx: {
                  fontSize: "1rem", // Increase label size
                },
              }}
              error={touched.name && !!errors.name}
              helperText={touched.name && errors.name}
            />
            <Button
              sx={{ width: "12vw", borderRadius: "20px", marginTop: "2vh" }}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      <Toast
        alerting={toastInfo.toastAlert}
        message={toastInfo.toastMessage}
        severity={toastInfo.toastSeverity}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </Box>
  );
};

export default RatingReview;
