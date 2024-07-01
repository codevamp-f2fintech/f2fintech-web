import { Alert, Snackbar } from "@mui/material";

const Toast = ({ msg, open, handleClose, anchorOrigin }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
      // sx={{
      //   left: "14% !important",
      //   // right: "100px !important",
      // }}
    >
      <Alert
        onClose={handleClose}
        maxWidth={false}
        severity="success"
        sx={{
          width: "100%",
          color: "black",
          borderRadius: "25px",
          lineHeight: "1.25rem",
          fontSize: ".9rem",
          backgroundColor: "lightgreen",
        }}
      >
        {msg}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
