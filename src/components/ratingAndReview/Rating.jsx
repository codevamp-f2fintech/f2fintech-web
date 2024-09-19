import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom"; 
import {
  Box,
  Typography,
  Button,
  TextField,
  Rating,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Formik, Form } from "formik";
import Toast from "../toast/Toast";
import { Utility } from "../utility";
import { RatingRevAPI } from "../../apis/RatingRevAPI";

const RatingReview = () => {
  const [rating, setRating] = useState(0);
  const [openLoginDialog, setOpenLoginDialog] = useState(false); 
  const toastInfo = useSelector((state) => state.toastInfo);
  const navigate = useNavigate();
  const location = useLocation(); 

  const dispatch = useDispatch();
  const { toastAndNavigate, getLocalStorage } = Utility();
  const customer = getLocalStorage("customerInfo");

  const initialValues = {
    comment: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    if (!customer) {
      setOpenLoginDialog(true); 
      return;
    }

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

  const handleLoginRedirect = () => {
    setOpenLoginDialog(false);
    navigate("/login", { state: { from: location } });
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
                  backgroundColor: "lightgray",
                  borderRadius: "15px",
                  "& fieldset": {
                    borderColor: "lightgray",
                    borderRadius: "15px",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "lightgray",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "black",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "black",
                },
              }}
              InputLabelProps={{
                sx: {
                  fontSize: "1rem",
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
     
      <Dialog
        open={openLoginDialog}
        onClose={() => setOpenLoginDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Login Required"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You must be logged in to submit a review.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLoginDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLoginRedirect} color="primary" autoFocus>
            Log In
          </Button>
        </DialogActions>
      </Dialog>
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
