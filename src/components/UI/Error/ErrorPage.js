import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ErrorOutline as ErrorOutlineIcon } from "@material-ui/icons/";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 16,
    textAlign: "center",
    color: 'red',
  },
}));

const ErrorPage = (props) => {
  const styles = useStyles();
  return (
    <div>
      <Grid item xs={12}>
        <div className={styles.paper}>
          <ErrorOutlineIcon style={{ fontSize: 100 }} color="secondary" />
          <Typography variant="h6" component="h2" gutterBottom>
            {props.msgError ? props.msgError : "มีบางอย่างผิดพลาด!"}
          </Typography>
        </div>
      </Grid>
    </div>
  );
};

export default ErrorPage;
