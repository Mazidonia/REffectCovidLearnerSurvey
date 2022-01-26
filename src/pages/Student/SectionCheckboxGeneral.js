import React from "react";

import { Typography, TextField } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  checkBoxContainer: {
    marginLeft: 8,
    borderBottom:`1px solid #cccccc`
  },
}));

const SectionCheckboxGeneral = (props) => {
  const styles = useStyles();
  const { A9, A10, A11, A12, A13, A14, A15, A16, A17, A18, ETC_A18 } =
    props.answer;
  return (
    <>
      <div className={styles.checkBoxContainer}>
        <FormControlLabel
          control={
            <Controller
              control={props.control}
              defaultValue={A9}
              name="A9"
              render={({ onChange, value }) => (
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  onChange={(e) => onChange(e.target.checked)}
                  checked={value}
                  disabled={props.SUBMIT_FORM}
                />
              )}
            />
          }
          label={
            <Typography variant="body2" display="block" color="textPrimary">
              1.
              เรียนทฤษฎีหรือฝึกปฏิบัติหรือสังเกตการณ์สอนหรือฝึกสอนหรือฝึกงานหรือรับการนิเทศจาก
              อาจารย์ผู้สอนในรูปแบบปกติ
            </Typography>
          }
        />
      </div>
      <div className={styles.checkBoxContainer}>
        <FormControlLabel
          control={
            <Controller
              control={props.control}
              defaultValue={A10}
              name="A10"
              render={({ onChange, value }) => (
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  onChange={(e) => onChange(e.target.checked)}
                  checked={value}
                  disabled={props.SUBMIT_FORM}
                />
              )}
            />
          }
          label={
            <Typography variant="body2" display="block" color="textPrimary">
              2. ผ่าน Line
            </Typography>
          }
        />
      </div>
      <div className={styles.checkBoxContainer}>
        <FormControlLabel
          control={
            <Controller
              control={props.control}
              defaultValue={A11}
              name="A11"
              render={({ onChange, value }) => (
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  onChange={(e) => onChange(e.target.checked)}
                  checked={value}
                  disabled={props.SUBMIT_FORM}
                />
              )}
            />
          }
          label={
            <Typography variant="body2" display="block" color="textPrimary">
              3. ผ่าน Google Meet
            </Typography>
          }
        />
      </div>
      <div className={styles.checkBoxContainer}>
        <FormControlLabel
          control={
            <Controller
              control={props.control}
              defaultValue={A12}
              name="A12"
              render={({ onChange, value }) => (
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  onChange={(e) => onChange(e.target.checked)}
                  checked={value}
                  disabled={props.SUBMIT_FORM}
                />
              )}
            />
          }
          label={
            <Typography variant="body2" display="block" color="textPrimary">
              4. ผ่านGoogleClassRoom
            </Typography>
          }
        />
      </div>
      <div className={styles.checkBoxContainer}>
        <FormControlLabel
          control={
            <Controller
              control={props.control}
              defaultValue={A13}
              name="A13"
              render={({ onChange, value }) => (
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  onChange={(e) => onChange(e.target.checked)}
                  checked={value}
                  disabled={props.SUBMIT_FORM}
                />
              )}
            />
          }
          label={
            <Typography variant="body2" display="block" color="textPrimary">
              5. ผ่าน Google Form
            </Typography>
          }
        />
      </div>
      <div className={styles.checkBoxContainer}>
        <FormControlLabel
          control={
            <Controller
              control={props.control}
              defaultValue={A14}
              name="A14"
              render={({ onChange, value }) => (
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  onChange={(e) => onChange(e.target.checked)}
                  checked={value}
                  disabled={props.SUBMIT_FORM}
                />
              )}
            />
          }
          label={
            <Typography variant="body2" display="block" color="textPrimary">
              6. ผ่าน Microsoft Team
            </Typography>
          }
        />
      </div>
      <div className={styles.checkBoxContainer}>
        <FormControlLabel
          control={
            <Controller
              control={props.control}
              defaultValue={A15}
              name="A15"
              render={({ onChange, value }) => (
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  onChange={(e) => onChange(e.target.checked)}
                  checked={value}
                  disabled={props.SUBMIT_FORM}
                />
              )}
            />
          }
          label={
            <Typography variant="body2" display="block" color="textPrimary">
              7. ผ่าน Zoom
            </Typography>
          }
        />
      </div>
      <div className={styles.checkBoxContainer}>
        <FormControlLabel
          control={
            <Controller
              control={props.control}
              defaultValue={A16}
              name="A16"
              render={({ onChange, value }) => (
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  onChange={(e) => onChange(e.target.checked)}
                  checked={value}
                  disabled={props.SUBMIT_FORM}
                />
              )}
            />
          }
          label={
            <Typography variant="body2" display="block" color="textPrimary">
              8. ผ่าน Facebook
            </Typography>
          }
        />
      </div>

      <div className={styles.checkBoxContainer}>
        <FormControlLabel
          control={
            <Controller
              control={props.control}
              defaultValue={A17}
              name="A17"
              render={({ onChange, value }) => (
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  onChange={(e) => onChange(e.target.checked)}
                  checked={value}
                  disabled={props.SUBMIT_FORM}
                />
              )}
            />
          }
          label={
            <Typography variant="body2" display="block" color="textPrimary">
              9. ผ่าน Youtube
            </Typography>
          }
        />
      </div>
      <div className={styles.checkBoxContainer}>
        <FormControlLabel
          control={
            <Controller
              control={props.control}
              defaultValue={A18}
              name="A18"
              render={({ onChange, value }) => (
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  onChange={(e) => {
                    onChange(e.target.checked);
                    props.onchange();
                  }}
                  checked={value}
                  disabled={props.SUBMIT_FORM}
                />
              )}
            />
          }
          label={
            <Typography variant="body2" display="block" color="textPrimary">
              10. อื่นๆ(โปรดระบุ)
            </Typography>
          }
        />
        <Controller
          as={
            <TextField
              size={"small"}
              variant="outlined"
              style={{ width: 350 }}
              margin="none"
              autoFocus={true}
              disabled={
                A18 === true &&
                props.watch === undefined &&
                props.SUBMIT_FORM === false
                  ? false
                  : props.watch === true && props.SUBMIT_FORM === false
                  ? false
                  : true
              }
              error={!!props.errors?.ETC_A18}
              helperText={props.errors?.ETC_A18?.message}
            />
          }
          name="ETC_A18"
          control={props.control}
          defaultValue={ETC_A18 === null ? "" : ETC_A18}
        />
      </div>
    </>
  );
};
export default SectionCheckboxGeneral;
