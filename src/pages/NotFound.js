import React from "react";
import { Helmet } from "react-helmet";
import { Box, Container, Typography, Grid } from "@material-ui/core";
import car from "../assets/images/undraw_page_not_found_su7k.svg";

const NotFound = () => (
  <>
    <Helmet>
      <title>404 | Questionnaire</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: "background.default",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="md">
        <Typography align="center" color="textPrimary" variant="h1">
          404: The page you are looking for isn’t here
        </Typography>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item>
            <img
              alt="Under development"
              src={car}
              style={{
                marginTop: 50,
                display: "inline-block",
                maxWidth: "100%",
                width: 560,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default NotFound;
