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

const addAmphur = async (data) => {
  const endPoint = `lifelong/province/create-amphur`;
  const res = await axios.post(endPoint, data);
  return res.data;
};

const SectionAddAmphurForm = (props) => {
  const resAddAmphur = useMutation(addAmphur, {
    onSuccess: () => {
      onCloseFormHandler();
      props.refreshData();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const schema = object().shape({
    AMPHUR_NAME: string().required("กรุณากรอกข้อมูลชื่ออำเภอ"),
    POSTCODE: string().required("กรุณากรอกรหัสไปรษณีย์"),
  });

  const { register, handleSubmit, watch, setValue, errors, control, reset } =
    useForm({
      resolver: yupResolver(schema),
    });

  const onSubmitAddAmphur = async (data) => {
    resAddAmphur.mutate({ ...data, ...{ PROVINCE_ID: props.provinceID } });
  };

  const onCloseFormHandler = () => {
    props.close();
    resAddAmphur.reset();
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
      <DialogTitle>เพิ่มข้อมูลอำเภอ</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmitAddAmphur)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="อำเภอ"
                name="AMPHUR_NAME"
                margin="none"
                size="small"
                inputRef={register}
                error={!!errors.AMPHUR_NAME}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="รหัสไปรษณีย์"
                name="POSTCODE"
                margin="none"
                size="small"
                inputRef={register}
                error={!!errors.POSTCODE}
              />
            </Grid>
          </Grid>
          <DialogActions>
            {resAddAmphur.isLoading && (
              <CircularProgress size={24} color="secondary" />
            )}
            {resAddAmphur.isError && (
              <Typography color="secondary" display="block">
                {resAddAmphur.error
                  ? resAddAmphur.error.response
                    ? resAddAmphur.error.response.data
                    : JSON.stringify(resAddAmphur.error.message)
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

export default SectionAddAmphurForm;
