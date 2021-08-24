import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const DialogConfirm = (props) => {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="responsive-dialog-title"
        maxWidth="xs"
      >
        <DialogTitle id="responsive-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.msg}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            ยกเลิก
          </Button>
          <Button
            onClick={props.handleConfirm}
            variant="contained"
            color="primary"
            autoFocus
          >
            ตกลง
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogConfirm;
