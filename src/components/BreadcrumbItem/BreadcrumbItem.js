import React from "react";
import { makeStyles } from "@material-ui/styles";
import { NavLink } from "react-router-dom";
import { Breadcrumbs, Typography, Paper } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    flexWrap: "wrap",
  },
  paper: {
    padding: 2,
  },
  homeLabel: { paddingLeft: 12 },
  container: { paddingBottom: 20 },
}));

const BreadcrumbItem = (props) => {
  const classes = useStyles();
  const breadcrumbs = props.links.map((val, index) => {
    if (props.links.length - 1 === index) {
      return (
        <Typography color="textPrimary" key={index}>
          {val.label}
        </Typography>
      );
    }

    return (
      <NavLink to={val.href} key={index} color="inherit">
        {val.label}
      </NavLink>
    );
  });

  return (
    <div className={classes.container}>
      <Paper elevation={0} className={classes.paper}>
        <div className={classes.homeLabel}>
          <Breadcrumbs aria-label="breadcrumb">{breadcrumbs}</Breadcrumbs>
        </div>
      </Paper>
    </div>
  );
};

BreadcrumbItem.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
};

BreadcrumbItem.defaultProps = {
  links: [
    {
      href: "/",
      label: "...",
    },
  ],
};

export default BreadcrumbItem;
