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
       
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "6vh",
        borderRadius: "30px",
        margin: "80px auto",
        maxWidth: "70%",
        transition: "transform 0.3s ease",
        border:'1px solid #dcdcdc',
        // boxShadow:
        // '0px 0px 10px 0px #8080804a',
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow:
          '0px 0px 10px 0px #8080804a',
        },
      }}
    >
      <Box sx={{padding:'20px'}}>
      <img
                  src='new/feedback1.png'
                  style={{
                    height: "",
                    width:'100%',
                    paddingTop: "10px",
                  }}
                />
      </Box>
     <Box>
      <Typography
        sx={{
          fontSize: "2rem",
          fontFamily: "cursive",
          fontWeight: "500",
        }}
        gutterBottom
      >
        Rating and Review
      </Typography>
      <Typography
        sx={{
          fontSize: "1rem",
          color: "black",
          fontWeight: "500",
        
        }}
        gutterBottom
      >
        How are you feeling?
      </Typography>
      <Typography
        sx={{
          fontSize: ".8rem",
          fontWeight: "400",
          marginTop: "2vh",
        }}
        gutterBottom
      >
        Your input is valuable in helping us better understand your needs and
        tailor our service accordingly.
      </Typography>
      <Box display="flex" justifyContent="flex-start" my={2}>
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
                  backgroundColor: "white", // Set background color to white
                  borderRadius: "15px", // Customize border radius
                  "& fieldset": {
                    borderColor: "gray", // Default border color
                    borderRadius: "15px", // Ensure border radius applies to fieldset as well
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "gray", // Border color on focus
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
                  fontSize: ".8rem", // Increase label size
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
      </Box>
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
