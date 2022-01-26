import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  btnContainer: {
    "& > *": {
      margin: "4px !important",
    },
    textAlign: "center",
  },
  containerStyle: {
    borderRadius: 4,
    borderTop: `8px solid ${theme.palette.primary.main}`,
    boxShadow: "0 0 1px rgb(0 0 0 / 13%), 0 1px 3px rgb(0 0 0 / 20%)",
  },
}));

const DialogConfirm = (props) => {
  const styles = useStyles();
  return (
    <Dialog
      open={props.open}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          props.handleClose(event, reason);
        }
      }}
      onClose={props.handleClose}
      maxWidth="xs"
      fullWidth={true}
    >
      <div className={styles.containerStyle}>
        <DialogTitle id="responsive-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.msg}</DialogContentText>
        </DialogContent>
      </div>
      <DialogActions>
        <Button
          onClick={props.handleClose}
          variant="contained"
          color="secondary"
        >
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
  );
};

export default DialogConfirm;
