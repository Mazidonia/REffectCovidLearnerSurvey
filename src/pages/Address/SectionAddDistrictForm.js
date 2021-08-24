import React from "react";
import { useMutation } from "react-query";
import {
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import axios from "../../axios/axios-api";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { string, object } from "yup";

const addDistrict = async (data) => {
  const endPoint = `lifelong/province/create-district`;
  const res = await axios.post(endPoint, data);
  return res.data;
};

const SectionAddDistrictForm = (props) => {
  const resAddDistrict = useMutation(addDistrict, {
    onSuccess: () => {
      onCloseFormHandler();
      props.refreshData();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const schema = object().shape({
    DISTRICT_NAME: string().required("กรุณากรอกข้อมูลชื่อตำบล"),
  });

  const { register, handleSubmit, watch, setValue, errors, control, reset } =
    useForm({
      resolver: yupResolver(schema),
    });

  const onSubmitAddDistrict = async (data) => {
    resAddDistrict.mutate({
      ...data,
      ...{ PROVINCE_ID: props.provinceID, AMPHUR_ID: props.amphurID },
    });
  };

  const onCloseFormHandler = () => {
    props.close();
    resAddDistrict.reset();
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"sm"}
      scroll={"paper"}
      height={100}
      open={props.open}
      id="addDocument"
    >
      <DialogTitle>เพิ่มข้อมูลตำบล</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmitAddDistrict)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="ตำบล"
                name="DISTRICT_NAME"
                margin="none"
                size="small"
                inputRef={register}
                error={!!errors.DISTRICT_NAME}
              />
            </Grid>
          </Grid>
          <DialogActions>
            {resAddDistrict.isLoading && (
              <CircularProgress size={24} color="secondary" />
            )}
            {resAddDistrict.isError && (
              <Typography color="secondary" display="block">
                {resAddDistrict.error
                  ? resAddDistrict.error.response
                    ? resAddDistrict.error.response.data
                    : JSON.stringify(resAddDistrict.error.message)
                  : ""}
              </Typography>
            )}

            <Button
              type="submit"
              autoFocus
              variant="contained"
              size="small"
              color="primary"
              startIcon={<SaveIcon />}
            >
              เพิ่ม
            </Button>
            <Button
              onClick={onCloseFormHandler}
              variant="contained"
              size="small"
              color="secondary"
              startIcon={<CancelIcon />}
            >
              ยกเลิก
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SectionAddDistrictForm;
