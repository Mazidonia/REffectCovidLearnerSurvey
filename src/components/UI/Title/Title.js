import * as React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 8,
    backgroundColor: theme.palette.primary.light,
    borderRadius: 4,
    color: theme.palette.black,
    textAlign: "center",
  },
}));

const Title = (props) => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Typography variant="h5" display="block">
        {props.title}
      </Typography>
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
