import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Button, ListItem } from "@material-ui/core";

const NavButtonItem = ({
  handler,
  icon: Icon,
  endIcon: EndIcon,
  title,
  ...rest
}) => {
  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        py: 0,
      }}
      {...rest}
    >
      <Button
        onClick={handler}
        sx={{
          color: "text.secondary",
          fontWeight: "medium",
          justifyContent: "flex-start",
          letterSpacing: 0,
          py: 1.25,
          textTransform: "none",
          width: "100%",
          "& svg": {
            mr: 1,
          },
        }}
      >
        {Icon && <Icon size="20" />}
        <span>{title}</span>
      </Button>
      {EndIcon && (
        <EndIcon
          size="20"
          sx={{
            color: "text.secondary",
            fontWeight: "medium",
            position: "absolute",
            right: 5,
          }}
        />
      )}
    </ListItem>
  );
};

NavButtonItem.propTypes = {
  handler: PropTypes.func,
  icon: PropTypes.elementType,
  title: PropTypes.string,
};

export default NavButtonItem;
