import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { Helmet } from "react-helmet";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { string, object } from "yup";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import { LogIn as LogInIcon } from "react-feather";
import LockIcon from "@material-ui/icons/Lock";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";

import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Loading from "../components/UI/Loading/Loading";
import * as actions from "../store/actions/index";
import image from "../assets/images/landing-page-bg.jpg";

import { WhiteTextTypography } from "../components/UI/Typography/CustomTypography";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: 16,
  },
  containerStyle: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 4,
    borderTop: "3px solid #8756D2",
    boxShadow: "0 0 1px rgb(0 0 0 / 13%), 0 1px 3px rgb(0 0 0 / 20%)",
  },
}));

const Login = () => {
  const styles = useStyles();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const schema = object().shape({
    username: string().required("กรุณากรอกรหัสอาจารย์"),
    password: string().required("กรุณากรอกรหัสผ่าน"),
  });

  const { register, handleSubmit, watch, setValue, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const endPoint = "questionnaire/auth/login";
    dispatch(actions.auth(endPoint, data)).then(() => {
      console.log("login OK");
    });
  };

  let authFail = null;
  let loading = null;
  if (auth.loading) {
    loading = <Loading />;
  } else {
    if (auth.error) {
      authFail = (
        <div className={styles.paper}>
          <ErrorOutlineIcon style={{ fontSize: 36 }} color="secondary" />
          <Typography variant="body1" display="block" gutterBottom>
            {auth.errorMsg}
          </Typography>
        </div>
      );
    }
  }

  return (
    <>
      <Helmet>
        <title>Login | Teacher</title>
      </Helmet>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container maxWidth="xs">
          <div className={styles.containerStyle}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mb: 3 }}>
                <div className={styles.paper}>
                  <Typography color="textPrimary" variant="h3">
                    เข้าสู่ระบบเพื่อเริ่มเซสชันของคุณ
                  </Typography>
                </div>
              </Box>
              <Box sx={{ mb: 3 }}>
                <div className={styles.paper}>
                  <Typography
                    variant="overline"
                    display="block"
                    gutterBottom
                    color="primary"
                  >
                    username password เดียวกับระบบทะเบียนและวัดผล
                  </Typography>
                </div>
              </Box>
              <TextField
                size="small"
                variant="outlined"
                fullWidth
                margin="normal"
                autoFocus
                label="USERNAME"
                error={!!errors.username}
                name="username"
                inputRef={register}
                helperText={errors.username ? errors.username.message : ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                size="small"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                label="PASSWORD"
                inputRef={register}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
                name="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {loading}
              {authFail}
              <Box sx={{ py: 2 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  startIcon={<LogInIcon />}
                >
                  เข้าสู่ระบบ
                </Button>
              </Box>
            </form>
          </div>
          <Box
            sx={{
              py: 2,
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div className={styles.paper}>
              <WhiteTextTypography gutterBottom variant="body2">
                สำนักส่งเสริมวิชาการและงานทะเบียน มหาวิทยาลัยราชภัฏเพชรบูรณ์
              </WhiteTextTypography>
            </div>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Login;
