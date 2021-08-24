import React, { useMemo } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Loading from "../Loading/Loading";
import { ErrorOutline as ErrorOutlineIcon } from "@material-ui/icons/";

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
const DialogConfirmWithLoading = (props) => {
  const styles = useStyles();
  let processFail = null;
  let loading = null;
  let btnAction = (
    <div className={styles.btnContainer}>
      <Button
        onClick={props.handleConfirm}
        variant="contained"
        color="success"
        autoFocus
        disabled={props.isLoading}
      >
        ตกลง
      </Button>
      <Button onClick={props.handleClose} variant="contained" color="secondary">
        ยกเลิก
      </Button>
    </div>
  );

  if (props.isLoading) {
    loading = <Loading msg={props.msgLoading} />;
  } else {
    if (props.isError) {
      processFail = (
        <Paper className={styles.paper}>
          <ErrorOutlineIcon style={{ fontSize: 36 }} color="secondary" />
          <Typography variant="overline" display="block" gutterBottom>
            {props.msgError}
          </Typography>
        </Paper>
      );
    }
  }

  const content = useMemo(() => {
    return (
      <Dialog
        open={props.open}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            props.handleClose(event, reason);
          }
        }}
        maxWidth="xs"
        fullWidth={true}
      >
        <div className={styles.containerStyle}>
          <DialogTitle id="DialogConfirmWithLoading">{props.title}</DialogTitle>
          <DialogContent>
            <div>
              {props.msg}
              {loading}
              {processFail}
            </div>
          </DialogContent>
        </div>
        <DialogActions>{btnAction}</DialogActions>
      </Dialog>
    );
  }, [props.open, props.isLoading]);

  return content;
};

DialogConfirmWithLoading.propTypes = {
  handleConfirm: PropTypes.func,
  handleClose: PropTypes.func,
  isError: PropTypes.bool,
  isLoading: PropTypes.bool,
  msgLoading: PropTypes.string,
  open: PropTypes.bool,
  msgError: PropTypes.string,
  title: PropTypes.string,
  msg: PropTypes.string,
};

export default DialogConfirmWithLoading;
