import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const ConfirmDialog = ({ open, setOpen, confirmHandler }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} keepMounted onClose={handleClose}>
      <DialogTitle id="alert-dialog-slide-title">
        Are you sure you want to reset the game?
      </DialogTitle>
      <DialogContent>
        {/* <DialogContentText id="alert-dialog-slide-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          No
        </Button>
        <Button onClick={confirmHandler} color="secondary">
          I'll do a P shot if I'm wrong (yes)
        </Button>
      </DialogActions>
    </Dialog>
  );
};
