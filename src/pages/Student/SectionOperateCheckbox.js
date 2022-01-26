import React from "react";

import { Typography } from "@material-ui/core";
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
  subjectName: {
    color: theme.palette.text.secondary,
    fontSize: 13,
  },
  subjectContainer: {
    padding: 8,
  },
}));

const SectionOperateCheckbox = (props) => {
  const styles = useStyles();
  const { Q5, Q6, Q7 } = props.defaultVal;
  return (
    <div style={{ backgroundColor: props.BG }}>
      <div className={styles.subjectContainer}>
        <Typography
          variant="body1"
          display="block"
          gutterBottom
          color="primary"
        >
          <u>
            {props.subject} {props.teacher}
          </u>
        </Typography>
      </div>
      <div className={styles.checkBoxContainer}>
        <FormControlLabel
          control={
            <Controller
              control={props.control}
              defaultValue={Q5}
              name={`answer.${props.ID}.Q5`}
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
              ขาดความเข้าใจในเรื่องที่ต้องฝึกปฏิบัติการ
            </Typography>
          }
        />
      </div>
      <div className={styles.checkBoxContainer}>
        <FormControlLabel
          control={
            <Controller
              control={props.control}
              defaultValue={Q6}
              name={`answer.${props.ID}.Q6`}
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
              มีปัญหาเกี่ยวกับวัสดุเครื่องมือเครื่องจักรที่ต้องใช้ฝึกปฏิบัติการ
            </Typography>
          }
        />
      </div>
      <div className={styles.checkBoxContainer}>
        <FormControlLabel
          control={
            <Controller
              control={props.control}
              defaultValue={Q7}
              name={`answer.${props.ID}.Q7`}
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
              ไม่ได้ฝึกปฏิบัติฝึกปฏิบัติต้องรอฝึกจริงเมื่อสามารถเรียนตามปกติได้แล้ว
            </Typography>
          }
        />
      </div>
    </div>
  );
};
export default SectionOperateCheckbox;
