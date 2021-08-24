import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
  },
  progress: {
    margin: 16,
  },
}));

const Loading = (props) => {
  const styles = useStyles();
  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <Grid
        item
        xs={12}
        sm={12}
        style={{ textAlign: "center", padding: "20px" }}
      >
        <CircularProgress className={styles.progress} color="secondary" />
        <div>{typeof props.msg === "undefined" ? "Loading..." : props.msg}</div>
      </Grid>
    </Grid>
  );
};

export default Loading;