import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
