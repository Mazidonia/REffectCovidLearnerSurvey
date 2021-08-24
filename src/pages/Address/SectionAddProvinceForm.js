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

const addProvince = async (data) => {
  const endPoint = `lifelong/province/create-province`;
  const res = await axios.post(endPoint, data);
  return res.data;
};

const SectionAddProvinceForm = (props) => {
  const resAddProvince = useMutation(addProvince, {
    onSuccess: () => {
      onCloseFormHandler();
      props.refreshData();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const schema = object().shape({
    PROVINCE_NAME: string().required("กรุณากรอกข้อมูลชื่อจังหวัด"),
  });

  const { register, handleSubmit, watch, setValue, errors, control, reset } =
    useForm({
      resolver: yupResolver(schema),
    });

  const onSubmitAddProvince = async (data) => {
    resAddProvince.mutate(data);
  };

  const onCloseFormHandler = () => {
    props.close();
    resAddProvince.reset();
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
      <DialogTitle>เพิ่มข้อมูลจังหวัด</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmitAddProvince)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="จังหวัด"
                name="PROVINCE_NAME"
                margin="none"
                size="small"
                inputRef={register}
                error={!!errors.PROVINCE_NAME}
              />
            </Grid>
          </Grid>
          <DialogActions>
            {resAddProvince.isLoading && (
              <CircularProgress size={24} color="secondary" />
            )}
            {resAddProvince.isError && (
              <Typography color="secondary" display="block">
                {resAddProvince.error
                  ? resAddProvince.error.response
                    ? resAddProvince.error.response.data
                    : JSON.stringify(resAddProvince.error.message)
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

export default SectionAddProvinceForm;
