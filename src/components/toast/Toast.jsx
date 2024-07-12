import * as React from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Toast = ({ alerting, message, severity, anchorOrigin }) => {
  const [state, setState] = React.useState({
    open: alerting,
    Transition: Slide,
  });
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({
      ...state,
      open: false,
    });
  };
  // eslint-disable-next-line no-unused-vars
  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
  return (
    <div>
      {alerting && (
        <Snackbar
          anchorOrigin={anchorOrigin}
          open={alerting}
          onClose={handleClose}
          autoHideDuration={2000}
          // TransitionComponent={state.Transition}
          key={state.Transition.name}
        >
          <Alert
            severity={severity}
            sx={{ width: "100%" }}
            onClose={handleClose}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};
Toast.propTypes = {
  alerting: PropTypes.bool,
  message: PropTypes.string,
  severity: PropTypes.string,
};
export default Toast;
