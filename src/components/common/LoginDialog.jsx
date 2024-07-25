import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginDialog = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{"Please Log In"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You need to log in to mark this item as favorite.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleLogin} color="primary">
          Log In
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
