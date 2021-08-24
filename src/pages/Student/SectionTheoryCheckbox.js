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
  },
  subjectName: {
    color: theme.palette.text.secondary,
    fontSize: 13,
  },
  subjectContainer: {
    padding: 8,
  },
}));

const SectionTheoryCheckbox = (props) => {
  const styles = useStyles();
  return (
    <div style={{backgroundColor:props.BG}}>
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
              defaultValue={false}
              name={`answer.${props.ID}.Q1`}
              render={({ onChange, value }) => (
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  onChange={(e) => onChange(e.target.checked)}
                  checked={value}
                />
              )}
            />
          }
          label={
            <Typography variant="body2" display="block" color="textPrimary">
              เรียนไม่ค่อยเข้าใจเหมือนเรียนในห้องเรียนปกติ
            </Typography>
          }
        />
      </div>
      <div className={styles.checkBoxContainer}>
        <FormControlLabel
          control={
            <Controller
              control={props.control}
              defaultValue={false}
              name={`answer.${props.ID}.Q2`}
              render={({ onChange, value }) => (
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  onChange={(e) => onChange(e.target.checked)}
                  checked={value}
                />
              )}
            />
          }
          label={
            <Typography variant="body2" display="block" color="textPrimary">
              มีปัญหาการสื่อสารกับความเข้าใจกับอาจารย์ผู้สอน
            </Typography>
          }
        />
      </div>
      <div className={styles.checkBoxContainer}>
        <FormControlLabel
          control={
            <Controller
              control={props.control}
              defaultValue={false}
              name={`answer.${props.ID}.Q3`}
              render={({ onChange, value }) => (
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  onChange={(e) => onChange(e.target.checked)}
                  checked={value}
                />
              )}
            />
          }
          label={
            <Typography variant="body2" display="block" color="textPrimary">
              มีปัญหาการทำงานและการส่งงาน
            </Typography>
          }
        />
      </div>
      <div className={styles.checkBoxContainer}>
        <FormControlLabel
          control={
            <Controller
              control={props.control}
              defaultValue={false}
              name={`answer.${props.ID}.Q4`}
              render={({ onChange, value }) => (
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  onChange={(e) => onChange(e.target.checked)}
                  checked={value}
                />
              )}
            />
          }
          label={
            <Typography variant="body2" display="block" color="textPrimary">
              มีปัญหาการขาดสมาธิในการเรียน
            </Typography>
          }
        />
      </div>
    </div>
  );
};
export default SectionTheoryCheckbox;
